+++
date = "2017-08-18T14:36:39+08:00"
description = "Docker中镜像以及容器的添加、删除等操作"
draft = false
tags = ["docker"]
title = "Docker之镜像与容器"
topics = ["Linux"]

+++

操作系统：Ubuntu14.04.1  
Docker版本：Docker version 17.06.0-ce, build 02c1d87

### 0x00 镜像操作
* 下载镜像

> ```bash
#一般容器的id和name可以互换

$ docker search ubuntu #从公共registry搜索镜像

$ docker pull ubuntu #从公共registry下载镜像
$ docker pull ubuntu:14.04
```

* 查看当前系统镜像

> ```bash
$ docker images
REPOSITORY    TAG       IMAGE ID        CREATED        SIZE
ubuntu        latest    14f60031763d    2 weeks ago    120MB
ubuntu        14.04     54333f1de4ed    2 weeks ago    188MB
```

* 打包镜像

> ```bash
$ docker save 54333f1de4ed > /home/reber/ubuntu.tar
```

* 加载镜像

> ```bash
$ docker load < ./ubuntu.tar
1b0c71361973: Loading layer  196.9MB/196.9MB
150e95c79e16: Loading layer  209.9kB/209.9kB
1ae9c3d1e0b7: Loading layer  7.168kB/7.168kB
4622ee8f36ae: Loading layer  4.608kB/4.608kB
4455b4d81934: Loading layer  3.072kB/3.072kB
Loaded image ID: sha256:54333f1de4ed2730bea18e49605b2ea8f8a2689db213ece94db6ccbc8cf279a6
$ docker images
REPOSITORY    TAG       IMAGE ID        CREATED        SIZE
centos        7         328edcd84f1b    7 days ago     193MB
<none>        <none>    54333f1de4ed    3 weeks ago    188MB
```

* 给镜像打标签

> ```bash
$ docker tag 54333f1de4ed ubuntu:14.04
$ docker images
REPOSITORY    TAG      IMAGE ID        CREATED        SIZE
centos        7        328edcd84f1b    7 days ago     193MB
ubuntu        14.04    54333f1de4ed    3 weeks ago    188MB
```

* 查看镜像层组成

> ```bash
$ docker history ubuntu:desktop
```

* 删除镜像(删除镜像前要先删除上面的容器)

> ```bash
$ docker rmi ubuntu:latest #docker rmi 14f60031763d
```

### 0x01 容器操作
* 运行容器(exit后容器就停止了)

> ```bash
$ docker run --rm -itd ubuntu:14.04 /bin/bash
root@172c8d8b0671:/# ls
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
root@172c8d8b0671:/# exit
exit

解释：
--rm：告诉Docker一旦运行的进程退出就删除容器
-ti：告诉Docker分配一个为终端并进入交互模式(这将进入容器内)
ubuntu：这是容器立足的镜像
/bin/bash：shell
```

* 后台运行容器

> ```bash
$ docker run -idd ubuntu:14.04 ping 8.8.8.8
1f665a3ccf4bab2e1a901727e3eef9140e713f3a4699c55c0e67f8666cca5d11
#$ sudo docker run -itd ubuntu:14.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
```

* 查看当前运行的容器

> ```bash
$ docker ps
CONTAINER ID   IMAGE          COMMAND          CREATED          STATUS          PORTS    NAMES
1f665a3ccf4b   ubuntu:14.04   "ping 8.8.8.8"   5 seconds ago    Up 4 seconds             goofy_dubinsky
```

* 查看所有容器

> ```bash
$ docker ps -a
CONTAINER ID   IMAGE          COMMAND          CREATED          STATUS          PORTS    NAMES
1f665a3ccf4b   ubuntu:14.04   "ping 8.8.8.8"   13 minutes ago   Up 13 minutes            goofy_dubinsky
82113ae171f1   ubuntu         "ping 8.8.8.8"   28 minutes ago   Created                  mystifying_keller
```

* 查看容器日志

> ```bash
$ docker logs 1f665a3ccf4b
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=127 time=183 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=127 time=184 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=127 time=185 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=127 time=183 ms
64 bytes from 8.8.8.8: icmp_seq=5 ttl=127 time=182 ms
64 bytes from 8.8.8.8: icmp_seq=6 ttl=127 time=184 ms
```

* 查看容器的端口映射

> ```bash
$ docker port 1f665a3ccf4b
```

* 查看容器的进程信息

> ```bash
$ docker top 1f665a3ccf4b
```

* 查看容器的文件变化

> ```bash
$ docker diff 1f665a3ccf4b
C /root
A /root/.bash_history
A /root/a.txt
```

* 从宿主机向容器复制数据

> ```bash
$ docker cp a.txt 1f665a3ccf4b:/root/
$ docker cp test 1f665a3ccf4b:/root/
```

* 从容器向宿主机复制数据

> ```bash
$ docker cp 1f665a3ccf4b:/root/libxml29_compat.patch ~/
$ docker cp 1f665a3ccf4b:/root/test ~/
```

* 导出/导入容器(导出的其实是镜像)

> ```bash
$ docker export df2a7e881c8a > ./ubuntu_container.tar
$ docker import ./ubuntu_container.tar
$ docker images
REPOSITORY    TAG       IMAGE ID        CREATED               SIZE
<none>        <none>    499df17f51e7    About a minute ago    175MB
$ docker tag 499df17f51e7 ubuntu:container
```

* 进入容器

> ```bash
$ docker exec -ti goofy_dubinsky /bin/bash
root@1f665a3ccf4b:/# ps -aux|grep ping
root         1  0.0  0.0   6524   712 ?        Ss   09:38   0:00 ping 8.8.8.8
```

* 停止/启动容器

> ```bash
$ docker stop 1f665a3ccf4b
1f665a3ccf4b
#docker kill 1f665a3ccf4b，stop会在10s后停止，kill则直接停止
$ docker start 1f665a3ccf4b
1f665a3ccf4b
```

* 删除容器(容器需要先停止才能删除)

> ```bash
$ docker rm 1f665a3ccf4b
Error response from daemon: You cannot remove a running container 1f665a3ccf4bab2e1a901727e3eef9140e713f3a4699c55c0e67f8666cca5d11. Stop the container before attempting removal or force remove
$ docker kill 1f665a3ccf4b
1f665a3ccf4b
$ docker rm 1f665a3ccf4b
1f665a3ccf4b
```

* 删除所有容器(只能删除停止运行的)

> ```bash
$ docker rm $(docker ps -a -q)
be5877380ca5
3e4b3a11d49f
2e51c9c2c6d1
dc6cadfc08f7
```

### 0x02 查看镜像或容器的底层信息(IP、端口绑定、配置信息等)
> ```bash
$ docker inspect 65987aa8f0cb
```

### 0x03 例子
> ```bash
$ exec_ping=$(docker run -itd ubuntu:14.04 ping 8.8.8.8)
$ docker logs $exec_ping
$ docker restart $exec_ping
$ docker commit $exec_ping ubuntu:ping #保存容器为镜像
sha256:c496c5d6e3cd4ac9f54d200c5b374ded94cea11f4b2b6eef1fde25a703fcc06c
$ docker images
REPOSITORY    TAG      IMAGE ID        CREATED          SIZE
ubuntu        ping     c496c5d6e3cd    2 seconds ago    188MB
centos        7        328edcd84f1b    7 days ago       193MB
ubuntu        14.04    54333f1de4ed    3 weeks ago      188MB
```