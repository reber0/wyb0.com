+++
date = "2016-05-12T15:27:14+08:00"
description = ""
draft = false
tags = ["爆破"]
title = "theHarvester+Hydra爆邮箱弱口令"
topics = ["Pentest"]

+++

## 下载theHarvester:
可在这里[[theHarvester](https://github.com/laramies/theHarvester)]下载

## 设置Shadowsocks为全局模式:
{{% fluid_img src="/img/post/SS.png" alt="设置SS为全局代理" %}}

## 运行theHarvester:
这一步得到邮箱然后做成字典user
{{% fluid_img src="/img/post/theHarvester_help.png" alt="查看theHarvester的帮助信息" %}}

{{% fluid_img src="/img/post/theHarvester_getemail1.png" alt="得到邮箱1" %}}

{{% fluid_img src="/img/post/theHarvester_getemail2.png" alt="得到邮箱2" %}}

## kail上用dnsenum得到邮箱域名:
{{% fluid_img src="/img/post/dnsenum.png" alt="dnsenum得到邮箱服务器域名" %}}

## nmap确认端口开启:
{{% fluid_img src="/img/post/nmap_-p.png" alt="nmap确认邮箱服务器在运行" %}}

## Hydra爆密码:
{{% fluid_img src="/img/post/hydra1.png" alt="hydra猜解密码" %}}

{{% fluid_img src="/img/post/hydra2.png" alt="hydra猜解到密码" %}}

## 尝试登陆:
{{% fluid_img src="/img/post/sign_in.png" alt="尝试登陆" %}}