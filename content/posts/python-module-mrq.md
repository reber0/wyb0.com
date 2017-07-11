+++
date = "2017-07-10T16:30:43+08:00"
description = "MRQ是基于Redis、Mongo和gevent的分布式任务队列"
draft = false
tags = ["python","module"]
title = "MRQ的使用"
topics = ["Python"]

+++

### 0x00 MRQ
* MRQ是Python基于Redis、Mongo和gevent的分布式任务队列。
* MRQ一方面旨在像RQ一样简单，另一方面有接近Celery的性能。
* MRQ最初的功能设计是为了满足任务队列的各种任务需求(IO密集&CPU密集，很多小任务&几个大任务)。


### 0x01 设置mongo和redis
> bscan使用的是mrq来调度任务的，mrq依赖于redis和mongo

* 安装redis

> ```bash
$ sudo apt-get install redis-server
$ netstat -nlt|grep 6379
$ sudo /etc/init.d/redis-server status
```
> ```bash
$ sudo /etc/init.d/redis-server stop
$ sudo vim /etc/redis/redis.conf
    #bind 127.0.0.1
    requirepass reber_redis
$ sudo redis-server /etc/redis/redis.conf &
$ redis-cli
> auth reber_redis
```

* 安装mongo

> 可以参考：https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/
> ```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
$ echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ ps -aux|grep mongodb
$ netstat -nlt|grep 27017
```
> ```bash
$ mongo
> use admin
switched to db admin
> db.createUser({user:'root',pwd:'root',roles:[{role:'root',db:'admin'}]})
Successfully added user: {
        "user" : "root",
        "roles" : [
                {
                        "role" : "root",
                        "db" : "admin"
                }
        ]
}
> db.auth('root','root')
1
> use mrq
switched to db mrq
> db.createUser({user:'reber_mrq_u',pwd:'reber_mrq_p',roles:[{role:'dbOwner',db:'mrq'}]})
Successfully added user: {
        "user" : "reber_mrq_u",
        "roles" : [
                {
                        "role" : "dbOwner",
                        "db" : "mrq"
                }
        ]
}
> db.auth('reber_mrq_u','reber_mrq_p')
> db.shutdownServer()
```
> ```bash
$ sudo vim /etc/mongod.conf
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
net:
  port: 27017
  #bindIp: 127.0.0.1
security:
  authorization: enabled
$ sudo mongod --config /etc/mongod.conf &
$ mongo
MongoDB shell version v3.4.6
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.6
> use mrq
switched to db mrq
> db.auth('reber_mrq_u','reber_mrq_p')
1
```

### 0x02 案例代码
> ```
$ mkdir mrqtest && cd mrqtest
$ touch __init__.py
$ touch scheduler.py
$ touch tasks_push.py
$ touch dotask.py
$ touch worker.sh && chmod 777 worker.sh
```

* scheduler.py

> ```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""定期推送执行任务"""

import time
import random

class Scheduler(object):
    """docstring for Scheduler"""
    def __init__(self, interval, mongodb_uri, redis_uri):
        super(Scheduler, self).__init__()
        self.interval = interval
        self.mongodb_uri = mongodb_uri
        self.redis_uri = redis_uri

    def exec_push_work(self):
        import subprocess

        for task in ['task1', 'task2']:
            data = random.randint(1000, 9999)
            command = "mrq-run --queue {task} tasks_push.{task} '{data}' \
                    --default_job_max_retries=3 --mongodb={mongodb_uri} \
                    --redis={redis_uri}".format(task=task, data=data, 
                    mongodb_uri=self.mongodb_uri, redis_uri=self.redis_uri)

            subprocess.Popen(command, shell=True,stdout=subprocess.PIPE, 
                            stderr=subprocess.STDOUT)

    def run(self):
        while True:
            self.exec_push_work()
            # 每隔20秒推送一次任务
            time.sleep(self.interval)


if __name__ == '__main__':
    interval = 20
    mongodb_uri = 'mongodb://reber_mrq_u:reber_mrq_p@127.0.0.1:27017/mrq'
    redis_uri = 'redis://reber_redis@127.0.0.1:6379/0'

    scheduler = Scheduler(interval,mongodb_uri,redis_uri)
    scheduler.run()
```

* tasks_push.py

> ```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""执行任务时调用的就是这个文件中类中的run函数"""

from mrq.task import Task
from dotask import do_task1,do_task2

class task1(Task):

    def run(self, params):
        result = do_task1(params)
        return result

class task2(Task):

    def run(self, params):
        result = do_task2(params)
        return result
```

* dotask.py

> ```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""执行任务的具体函数"""

def do_task1(params):
    return "task1:{}".format(params)

def do_task2(params):
    return "task2:{}".format(params)
```

* worker.sh

> ```
#!/bin/bash

mrq-worker task1 --greenlets 5 --mongodb mongodb://reber_mrq_u:reber_mrq_p@127.0.0.1:27017/mrq --redis redis://reber_redis@127.0.0.1:6379/0 &

mrq-worker task2 --greenlets 5 --mongodb mongodb://reber_mrq_u:reber_mrq_p@127.0.0.1:27017/mrq --redis redis://reber_redis@127.0.0.1:6379/0 &
```

### 0x03 执行
* 清空数据库

> ![清空数据库](/img/post/mrq_clear_db.png)

* 启动mrq-dashboard

> ```bash
$ mrq-dashboard --mongodb mongodb://reber_mrq_u:reber_mrq_p@127.0.0.1:27017/mrq --redis redis://reber_redis@127.0.0.1:6379/0

#--mongodb和--redis均以uri格式指定连接数据库的信息
#执行完访问 http://127.0.0.1:5555 即可
```
![启动mrq-dashboard](/img/post/mrq_dashboard.png)

* 执行workers.sh

> ```
$ cd mrqtest
$ ./worker.sh
#这里会创建两个worker，名字为task1和task2
```
![启动mrq-dashboard后查看dashboad](/img/post/mrq_run_workers_dashboad.png)
<br>
![未添加任务时jobs为空](/img/post/mrq_dashboard_jobs1.png)

* 执行scheduler.py从而推送任务

> ```
$ cd mrqtest
$ python scheduler.py
```
![添加任务](/img/post/mrq_push_task.png)
<br>
![添加任务后查看jobs](/img/post/mrq_dashboard_jobs2.png)




