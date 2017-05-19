+++
date = "2016-04-17T17:58:07+08:00"
description = ""
draft = false
tags = ["linux"]
title = "Linux之网络配置"
topics = ["Linux"]

+++

## 第一种方法
### 分5步：
```
1. 启动网卡：  
$ ifconfig eth0 up/down
2. 配置ip：  
$ ifconfig eth0 192.168.22.231 netmask 255.255.255.0
3. 配置网关：
$ route add default gw 192.168.22.1
4. 配DNS：  
$ vim /etc/resolv.conf  
$ echo "nameserver 114.114.114.114" > /etc/resolv.cof
5. 重启网络使配置生效：  
6. 用文件配置ip信息
$ /etc/sysconfig/network-scripts/ifcfg-eth0

ps:添加静态路由
route add -net 10.211.55.0 netmask 255.255.255.0 dev eth3
//添加静态路由添加网络10.211.55.0，从eth0出去
```

## 第二种方法
### 分1步：
打开文件/etc/sysconfig/network-scripts/ifcfg-eth0,在里面添加相应信息:

```
DEVICE=ethl
ONBOOT=yes
BOOTPROTO=static
IPADDR=
NETMASK=
GATEWAY=
```

## 打开ip转发
    echo "1" >> /proc/sys/net/ipv4/ip_forward
    或者vim /etc/sysctl.conf