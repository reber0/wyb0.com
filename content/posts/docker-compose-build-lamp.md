+++
title = "使用docker-compose构造LAMP环境"
topics = ["Linux"]
tags = ["docker"]
description = "使用docker-compose构造LAMP环境，其中日志、mysql数据、mysql配置文件、网站文件均为持久化存储。"
date = "2018-12-15T22:51:04+08:00"
draft = false
+++

### 0x00 实现功能
使用docker-compose构造LAMP环境，其中日志、mysql数据库、mysql配置文件、网站文件均持久化存储到本机。

apache、php通过Dockerfile构造，Dockerfile拉取ubuntu镜像，然后安装apache2和php。

mysql的话通过docker的links连接mysql:5.5这个镜像当作数据库。

### 0x01 文件构造
```
➜  tree apache
apache
├── Dockerfile
├── conf
│   └── my.cnf
├── docker-compose.yml
├── log
│   ├── apache
│   └── mysql
├── mysql
├── src
│   ├── init.sh
│   └── sources.list
└── www
    └── index.php

7 directories, 6 files
```

### 0x02 docker-compose.yml
```
version: '3'
services:
  apache:
    image: ubuntu:apache #镜像名为ubuntu，tag为apache
    container_name: apache #运行后生成的容器名字为apache
    build: . #使用当前路径下的Dockerfile构造镜像
    ports:
      - "80:80"
    volumes:
      - ./www:/var/www/html
      - ./log/apache:/var/log/apache2
    links:
      - mysql
    mem_limit: 1024m #最大内存使用不超过1024m
    restart: always #容器重启策略：当容器终止退出后，总是重启容器，默认策略。
  mymysql:
    image: mysql:5.5 #拉取mysql:5.5
    container_name: mysql
    ports:
      - "3306:3306"
    volumes:
      - ./conf/my.cnf:/etc/mysql/my.cnf
      - ./mysql:/var/lib/mysql
      - ./log/mysql:/var/log/mysql
    environment: #设置环境变量
      - MYSQL_ROOT_PASSWORD=root #mysql密码为root
    mem_limit: 1024m #最大内存使用不超过1024m
```

### 0x03 Dockerfile
```
FROM ubuntu:14.04.4
MAINTAINER reber <1070018473@qq.com>


ENV AUTO_RUN_DIR /apache_init.d #定义会被容器自动执行的目录
ENV INIT_SHELL init.sh #定义shell文件名

COPY ./src /data
WORKDIR /data
RUN chmod +x init.sh
RUN cp sources.list /etc/apt/sources.list && apt-get update
RUN apt-get install -y apache2
RUN apt-get install -y php5 php5-gd php5-mysql libapache2-mod-php5 libapache2-mod-auth-mysql

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime #设定时区

WORKDIR /var/www/html

CMD ["/data/init.sh"]
#ENTRYPOINT ["tail","-f","/dev/null"]
```

### 0x04 conf/my.cnf
```
[mysqld]
user=mysql
default-storage-engine=INNODB
character-set-server=utf8
init_connect='SET NAMES utf8'

[client]
default-character-set=utf8

[mysql]
default-character-set=utf8
```

### 0x05 src/sources.list
```
deb http://debian.ustc.edu.cn/ubuntu/ trusty main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ trusty-security main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ trusty main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse
```

### 0x06 src/init.sh
```
#!/bin/bash

service apache2 restart
tail -f /dev/null
```

### 0x07 www/index.php
```
<?php
    //因为使用了links，所以在apache这个容器中可以直接用"mymysql"字符连接数据库，使用links后的
    //效果可以理解为(实际上没有)在apache这个容器的hosts文件中添加了"mymysql"字符到mysql容器的ip的映射
    $link = mysql_connect("mymysql", "root", "root");
    if(!$link)
        die('Could not connect: ' . mysql_error());
    else
        echo "Successfully connect to the mysql.";
    mysql_close($link);
?>
```

### 0x08 启动后访问
![80](/img/post/20181215-231620.png)
