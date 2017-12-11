+++
date = "2016-05-11T17:09:10+08:00"
description = ""
draft = false
tags = ["nessus"]
title = "Nessus的安装"
topics = ["Linux", "Pentest"]

+++

### 0x00 下载Nessus的deb安装包:
去【[这里](http://www.tenable.com/products/nessus/select-your-operating-system)】，选择家庭版，然后下载对应的安装包
![选择家庭版的nessus](/img/post/Nessus_Home.png)
![选择适合kali的deb安装包](/img/post/select_nessus_deb.png)

### 0x01 本地安装nessus:
![通过本地deb包安装nessus](/img/post/install_nessus.png)

### 0x02 执行后续安装步骤:
1. 启动nessus
![启动nessus](/img/post/start_nessus.png)

2. web访问nessus服务
![通过web访问https://localhost:8834](/img/post/web_nessus.png)

3. 设置账户和密码
![设置nessus登陆帐号和密码](/img/post/setaccount.png)
![被要求输入code](/img/post/code.png)

4. 申请code，可以在【[这里](http://www.tenable.com/products/nessus-home)】申请
![申请一个code](/img/post/register_code.png)

5. 去邮箱查找code
![去邮箱查看code](/img/post/get_code.png)

6. 将code填入，然后等待插件的下载
![输入code](/img/post/input_code.png)
![等插件的下载安装](/img/post/wait_download.png)

### 0x03 登陆Nessus:
![登陆nessus1](/img/post/sign_in_nessus1.png)
![登陆nessus2](/img/post/sign_in_nessus2.png)
