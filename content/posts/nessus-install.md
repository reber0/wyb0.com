+++
date = "2016-05-11T17:09:10+08:00"
description = ""
draft = false
tags = ["nessus"]
title = "Nessus的安装"
topics = ["Linux", "Pentest"]

+++

## 下载Nessus的deb安装包:
去【[这里](http://www.tenable.com/products/nessus/select-your-operating-system)】，选择家庭版，然后下载对应的安装包
{{% fluid_img src="/img/post/Nessus_Home.png" alt="选择家庭版的nessus" %}}

{{% fluid_img src="/img/post/select_nessus_deb.png" alt="选择适合kali的deb安装包" %}}

## 本地安装nessus:
{{% fluid_img src="/img/post/install_nessus.png" alt="通过本地deb包安装nessus" %}}

## 执行后续安装步骤:
1. 启动nessus
{{% fluid_img src="/img/post/start_nessus.png" alt="启动nessus" %}}

2. web访问nessus服务
{{% fluid_img src="/img/post/web_nessus.png" alt="通过web访问https://localhost:8834" %}}

3. 设置账户和密码
{{% fluid_img src="/img/post/setaccount.png" alt="设置nessus登陆帐号和密码" %}}
{{% fluid_img src="/img/post/code.png" alt="被要求输入code" %}}

4. 申请code，可以在【[这里](http://www.tenable.com/products/nessus-home)】申请
{{% fluid_img src="/img/post/register_code.png" alt="申请一个code" %}}

5. 去邮箱查找code
{{% fluid_img src="/img/post/get_code.png" alt="去邮箱查看code" %}}

6. 将code填入，然后等待插件的下载
{{% fluid_img src="/img/post/input_code.png" alt="输入code" %}}
{{% fluid_img src="/img/post/wait_download.png" alt="等插件的下载安装" %}}

## 登陆Nessus:
{{% fluid_img src="/img/post/sign_in_nessus1.png" alt="登陆nessus1" %}}
{{% fluid_img src="/img/post/sign_in_nessus2.png" alt="登陆nessus2" %}}