+++
date = "2016-07-05T09:56:35+08:00"
description = ""
draft = false
tags = ["linux"]
title = "iptables简单配置DMZ"
topics = ["Linux"]

+++

## 要求
1. 内网可以访问外网
2. 内网可以访问DMZ区
3. 外网不能访问内网
4. 外网能访问DMZ区的服务
5. DMZ区不能访问内网
6. DMZ区不能主动访问外网

## 拓扑
> {{% fluid_img src="/img/post/iptables_dmz_topology.png" alt="iptables简单配置DMZ的拓扑.png" %}}

## 个主机IP信息
> 内网网段为：192.168.1.0/24  
> DMZ区网段为：172.16.1.0/24
{{% fluid_img src="/img/post/iptables_dmz_ip_info.png" alt="iptables简单配置DMZ的ip信息.png" %}}

## iptables的策略
> 新建iptables.sh,内容如下：  
> ```
#!/bin/bash

iptables –F #清空此表中的规则
iptables –X #清空此表中的自定义规则
iptables –Z #清空此表中的计数器为0
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

iptables -F -t nat
iptables -X -t nat
iptables -Z -t nat
iptables -t nat -P PREROUTING ACCEPT
iptables -t nat -P POSTROUTING ACCEPT
iptables -t nat -P OUTPUT ACCEPT

#添加必要的模块
modprobe ip_nat_ftp
modprobe iptable_nat
modprobe ip_conntrack
modprobe ip_conntrack_ftp
#开启转发功能
echo "1" > /proc/sys/net/ipv4/ip_forward
#********************************************************************
#PREROUTING：
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 172.16.1.1
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 21 -j DNAT --to-destination 172.16.1.1
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 10000:10100 -j DNAT --to-destination 172.16.1.1
iptables -t nat -A PREROUTING -i eth2 -p tcp -d 172.16.1.1 --dport 80 -j DNAT --to-destination 172.16.1.1
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 80 -j DNAT --to-destination 192.168.2.144
#********************************************************************
#FORWARD：
iptables -A FORWARD -m state --state INVALID -j DROP
iptables -A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i eth0 -o eth1 -m state --state NEW -j ACCEPT
iptables -A FORWARD -i eth2 -o eth0 -m state --state NEW -j ACCEPT
iptables -A FORWARD -i eth2 -o eth1 -m state --state NEW -j ACCEPT
#********************************************************************
#INPUT：
iptables -A INPUT -m state --state INVALID -j DROP
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -i eth0 -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -i eth0 -p tcp –m multiport --dports 20,21 -j ACCEPT
iptables -A INPUT -i eth2 -s 192.168.1.0/24 -j ACCEPT
#********************************************************************
#OUTPUT：
iptables -A OUTPUT -m state --state INVALID -j DROP
iptables -A OUTPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth1 -p tcp --dport 80 -m state --state NEW -j ACCEPT
iptables -A OUTPUT -o eth1 -p tcp --dport 20 -m state --state NEW -j ACCEPT
iptables -A OUTPUT -o eth1 -p tcp --dport 21 -m state --state NEW -j ACCEPT
iptables -A OUTPUT -o eth1 -p tcp --dport 10000:10100 -m state --state NEW -j ACCEPT
#********************************************************************
#POSTROUTING：
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j SNAT --to-source 192.168.2.144
iptables -t nat -A POSTROUTING -o eth0 -s 172.16.1.0/24 -j SNAT --to-source 192.168.2.144
#********************************************************************
service iptables save
service iptables restart
```

## 测试
1. 内网可以访问外网
{{% fluid_img src="/img/post/iptables_dmz_lan_to_internet.png" alt="内网可以访问外网.png" %}}

2. 内网可以访问DMZ
{{% fluid_img src="/img/post/iptables_dmz_lan_to_dmz_www.png" alt="内网可以访问DMZ的www.png" %}}
{{% fluid_img src="/img/post/iptables_dmz_lan_to_dmz_ftp.png" alt="内网可以访问DMZ的ftp.png" %}}

3. 外网不能访问内网
{{% fluid_img src="/img/post/iptables_dmz_internet_not_to_lan.png" alt="外网不能访问内网.png" %}}

4. 外网可以访问DMZ
{{% fluid_img src="/img/post/iptables_dmz_internet_to_dmz_www.png" alt="外网可以访问DMZ的www.png" %}}
{{% fluid_img src="/img/post/iptables_dmz_internet_to_dmz_ftp.png" alt="外网可以访问DMZ的ftp.png" %}}

5. DMZ不能访问内网
{{% fluid_img src="/img/post/iptables_dmz_dmz_not_to_lan.png" alt="DMZ不能访问内网.png" %}}

6. DMZ不能访问外网
{{% fluid_img src="/img/post/iptables_dmz_dmz_not_to_internet.png" alt="DMZ不能访问外网.png" %}}