+++
date = "2016-08-03T00:00:48+08:00"
description = ""
draft = false
tags = ["软件", "redis"]
title = "Redis的安装"
topics = ["Server"]

+++

### 0x00 关于Redis
> ```
Redis和MySQL这种关系型数据库不一样，它是非关系型数据库，是日志型、Key-Value数据库，
实现了master-slave(主从)同步,数据都是缓存在内存中的,所以可高速读写,但存储成本较高,
不适合做海量数据存储。
```

### 0x01 安装
> 可在http://download.redis.io/releases/ 下载
```
$ cd /opt
$ wget http://download.redis.io/releases/redis-3.2.3.tar.gz
$ tar -zxvf redis-3.2.3.tar.gz
$ cd redis-3.2.3
$ make
$ make install
```

### 0x02 产生的可执行文件
> ```
redis-server：redis服务器启动程序
redis-cli：redis命令行工具，也可为客户端
redis-stat：redis状态检测工具
redis-benchmark：redis性能检测工具(读写)
```

### 0x03 配置文件
> ```
$ vim /opt/redis-3.2.3/redis.conf
  daemonize yes  # 当值为yes时可以后台运行
  bind 127.0.0.1  # 绑定ip，配置后只接受来自该ip的请求
  port 6379  # 监听端口
  timeout 300 # 客户端连接超时时间，单位为秒
  loglevel notice  # 日志等级分为4级，debug、verbose、notice、warning
  logfile "/var/log/redis.log"  # 日志文件位置
  databases 16  # 数据库数量
  sava 900 1  # 设置数据库镜像的频率
  dbfilename dump.rdb  # 镜像备份文件的名字
  dir ./ 数据库镜像备份保存路径
  # slaveof <masterip> <masterport>  # 设置这个redis为从服务器
  # masterauth <master-password>  # 主服务器连接需要的密码验证
  # requirepass 123456  # 登陆时的密码
  maxclients 10000  # 最大连接的客户数量
  # mexmemory <bytes>  # redis能够使用的最大内存
  appendonly no  # 可以设置是否只能追加
```

### 0x04 启动测试
> ```
本地启动：
$ redis-server /opt/redis-3.2.3/redis.conf  # 启动服务
$ ps -aux | grep redis
```
在另外一个机器上用redis-cli连接刚搭建的服务器：
{{% fluid_img src="/img/post/redis_install_conn_and_write_file.png" alt="连接redis并创建文件" %}}
<br /><br />
{{% fluid_img src="/img/post/redis_install_visit_file.png" alt="访问redis创建的文件" %}}

### 0x05 Windows下安装Redis
> 下载：<a href="https://github.com/MSOpenTech/redis/releases" target="_blank">点此下载</a>

> 安装后添加环境变量

> ```
添加为系统服务：
redis-server.exe --service-install redis.windows.conf --loglevel verbose

启动服务：
redis-server.exe --service-start

关闭服务：
redis-server.exe --service-stop

为Redis添加密码：
打开安装目录下的文件redis.windows-service.conf，
找到requirepass，配置为requirepass mypassword，然后重启redis
此时仍然可以连接上，但是执行命令时会提示没权限

带密码连接Redis：
redis-cli.exe -h 127.0.0.1 -p 6379 -a mypassword
```