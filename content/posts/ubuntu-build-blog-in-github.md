+++
date = "2016-05-09T10:12:43+08:00"
description = ""
draft = false
tags = ["git"]
title = "Ubuntu下用github搭建博客"
topics = ["Git"]

+++

#### 环境：
ubuntu14.4

## 安装hugo
1. 在https://github.com/spf13/hugo/releases 下载hugo的deb安装包
2. 安装hugo  
reber@ubuntu:~/Downloads$ sudo dpkg -i hug_015_amd64  *安装hugo*
3. 生成站点  
reber@ubuntu:~/Downloads$ cd /home/reber  
reber@ubuntu:~$ hugo new site reber-9.com  *新建站点*  
reber@ubuntu:~/reber-9.com$ hugo server -w *启动站点,访问localhost:1313测试有没有成功*

## 配置github
1. 安装git  
reber@ubuntu:~$ sudo apt-get install git  
reber@ubuntu:~$ git \-\-version  *查看版本判断是否安装成功*
2. 安装ssh  
reber@ubuntu:~/reber-9.com$ sudo apt-get install ssh
3. 备份并创建本地ssh  
reber@ubuntu:~/reber-9.com$ cd /home/reber/.ssh/  
reber@ubuntu:~/.ssh$ mkdir ras.bak  
reber@ubuntu:~/.ssh$ cp id_ras\* rsa.bak *保存原来的密钥*  
reber@ubuntu:~/.ssh$ cd  
reber@ubuntu:~$ ssh-keygen -t rsa -C "your github email address"  *重新生成密钥*
4. 将ssh配置到github中  
reber@ubuntu:~$ cd ~/.ssh  
reber@ubuntu:~/.ssh$ vim id_ras.pub  *复制文件中的字符，将其添加到github*
{{% fluid_img src="/img/post/add_ssh.png" alt="在github上添加ssh密钥" %}}
5. reber@ubuntu:~/.ssh$ ssh -T git@github.com   *验证密钥添加成功*  
{{% fluid_img src="/img/post/test_ssh.png" alt="验证密钥添加成功" %}}
6. 配置本地用户和邮箱  
用来上传本地仓库到GitHub中, 在GitHub中显示代码上传者  
reber@ubuntu:~/.ssh$ git config \-\-global user.name "usernam"  
reber@ubuntu:~/.ssh$ git config \-\-global user.email "email"

## 向github上push代码
1. github上新建一个工程github.com  
2. 本地初始git目录  
reber@ubuntu:~/.ssh$ cd /home/reber/reber-9.com/  
reber@ubuntu:~/reber-9.com$ git init
3. 添加文件到缓存(git rm是删除)  
reber@ubuntu:~/reber-9.com$ git add .
4. 关联本地仓库和远程仓库  
reber@ubuntu:~/reber-9.com$ git remote add origin git@github.com:reber-9/reber-9.com.git
5. 将本地缓存提交到github  
reber@ubuntu:~/reber-9.com$ git commit -m "first commit"  
reber@ubuntu:~/reber-9.com$ git push origin master

## MD编辑器的安装
1. 首先在http://pad.haroopress.com/user.html 下载deb安装包
2. 安装MD编辑器haroopad  
reber@ubuntu:~/Downloads$ sudo dpkg -i haroopad-v0.13.1-x64.deb
3. 打开软件  
reber@ubuntu:~/Downloads$ haroopad  
reber@ubuntu:~/Downloads$ haroopad aaa.md
