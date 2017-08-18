+++
date = "2017-08-18T18:05:43+08:00"
description = "Dockerfile中写的是一条条指令，你可以通过Dockerfile更简单的构造自己的环境"
draft = false
tags = ["docker"]
title = "Dockerfile"
topics = ["Linux"]

+++

操作系统：Ubuntu14.04.1

### 0x00 Dockerfile
> ```
Dockerfile里面其实是一条条的指令，Docker会把Dockerfile的指令翻译为linux命令，
让你可以对下载好的镜像进行一些操作(比如安装软件、向镜像复制文件等)，从而构造定制化的镜像。
```

### 0x01 Dockerfile基本指令
> ```
FROM <image name>：指定新的镜像基于什么创建
MAINTAINER <author name>：设置该镜像的作者
COPY <source> <dest>：复制文件，dest要以 / 结尾
WORKDIR /path/to/workdir：相当于切换目录，对RUN、CMD、和ENTRYPOINT生效
RUN <command>：在shell执行命令
EXPOSE port1 port2：容器运行时监听的端口
CMD：容器默认的执行命令，Dockerfile只允许使用一次CMD命令(使用数组)
ENTRYPOINT：类似于CMD，Dockerfile只允许使用一次(使用数组)
ENV <key> <value>：设置环境变量
USER <uid>：镜像正在运行时设置一个uid，即设定启动容器的用户，默认为root
VOLUME ['/data']：授权访问从容器内到主机的目录
```

### 0x02 实例
> ![文件结构](/img/post/dockerfile.png)

* Dockerfile

>```bash
reber@wyb:~/range$ cat Dockerfile
FROM ubuntu:14.04.4
MAINTAINER reber

ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

COPY src/sources.list /etc/apt/sources.list
RUN apt-get update && apt-get upgrade -y

COPY src/range.zip /tmp/
COPY src/privileges.sql /tmp/

RUN apt-get install -y apache2 mysql-server mysql-client php5 php5-gd php5-mysql libapache2-mod-php5 libapache2-mod-auth-mysql unzip && apt-get clean

WORKDIR /var/www/html
RUN set -x \
    && unzip -x /tmp/range.zip -d ./ \
    && chmod 777 ./range/upload/uploads \
    && chmod 777 ./range/xss_platform/upload

EXPOSE 80

COPY src/start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]
CMD ["default"]
```

* src/privileges.sql

> ```sql
reber@wyb:~/range$ cat src/privileges.sql
use mysql;
UPDATE user SET password=PASSWORD('root') where USER='root';
FLUSH PRIVILEGES;
```

* src/sources.list

> ```bash
reber@wyb:~/range$ cat src/sources.list
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

* src/start.sh

> ```bash
reber@wyb:~/range$ cat src/start.sh
#!/bin/bash
set -x

echo 'start mysql'
/etc/init.d/mysql start
sleep 3

echo 'import rtest.sql'
mysql < /var/www/html/range/rtest.sql
sleep 3

echo 'set password'
mysql < /tmp/privileges.sql

/etc/init.d/mysql restart
/etc/init.d/apache2 restart

echo 'set success'

/usr/bin/tail -f /dev/null
```

### 0x03 构建镜像
> ```bash
reber@wyb:~/range$ ls
Dockerfile  src
reber@wyb:~/range$ ls src
range.zip  sources.list  start.sh

#构建镜像
reber@wyb:~/range$ docker build -t range:1.0 .

#运行容器，并将容器的80端口转到宿主机的8888端口
reber@wyb:~/range$ docker run -d -p 8888:80 range:v1.0
```