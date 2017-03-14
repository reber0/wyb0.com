+++
date = "2015-07-14T14:15:13+08:00"
description = ""
draft = false
tags = ["linux", "dns"]
title = "搭建DNS服务器"
topics = ["Server"]

+++

## 环境
> 虚拟机rhel-server-6.2

## 搭建流程
* 安装DNS服务器
* 配置DNS主配置文件
* 配置DNS正反向解析区域数据文件
* 启动DNS服务器进行测试

## 安装DNS服务
* 挂载光盘  
用mount -o,loop /dev/cdrom /mnt/cdrom命令挂载光盘

* 配置yum源，安装BIND(用命令yum install bind*安装)
{{% fluid_img src="/img/post/dns_yum_configuration_source.png" alt="搭建dns配置yum源.png" %}}
安装结果如下：
{{% fluid_img src="/img/post/dns_install.png" alt="安装bind.png" %}}

* 进行配置  
vim /etc/named.conf,添加必要的信息
{{% fluid_img src="/img/post/dns_vim_named_conf.png" alt="配置dns服务,添加必要的信息.png" %}}
在named.conf的包含文件named.rfc1921.zones中定义区域
{{% fluid_img src="/img/post/dns_define_regions.png" alt="配置dns服务,定义区域.png" %}}

* 配置正反向解析文件  
分别配置wyb.cn.hosts和wyb.cn.rev
{{% fluid_img src="/img/post/dns_analytical_paper_example.png" alt="解析文件样例.png" %}}
{{% fluid_img src="/img/post/dns_forward_mapping_file.png" alt="正向解析文件.png" %}}
{{% fluid_img src="/img/post/dns_reverse_mapping_file.png" alt="反向解析文件.png" %}}

## 验证
> 用service named start命令启动DNS  
用nslookup命令进行验证，先查看当前采用那台DNS解析，测试反向资源记录以及正反向解析
{{% fluid_img src="/img/post/dns_test.png" alt="测试DNS.png" %}}