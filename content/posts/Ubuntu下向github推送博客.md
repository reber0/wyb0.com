+++
date = "2016-05-09T23:33:12+08:00"
description = ""
draft = false
tags = ["github","ubuntu"]
title = "Ubuntu下向github推送博客"
topics = ["Git"]

+++

### 0x00 环境
> Ubuntu14.4

### 0x01 安装hugo和git

### 0x02 生成密钥，将密钥添加到github
> ```
$ cd ~
$ ssh-keygen -t rsa -b 2048 -C "123456@qq.com"
$ cd ~/.ssh/
$ cat id_rsa.pub # 将公钥添加到 github
```

###  0x03 配置本地用户和邮箱
> ```
git config --global user.name "reber-9"  
git config --global user.email "123456@qq.com"
```

### 0x04 验证密钥是否添加成功
> ssh -T git@github.com

### 0x05 克隆远程工程
> git clone https://github.com/reber-9/reber-9.com.git

### 0x06 添加CNAME
> cd ~/reber-9.com/  
> echo "reber-9.com" >> static/CNAME

### 0x07 更新
> 更新origin remote的master分支：  
> git pull origin master  
> 获取服务端的改动：  
> git fetch

### 0x08 生成html文档，然后创建分支，进行同步
> ```
$ mkdir public
$ cd public/
$ git init  
$ git checkout --orphan gh-pages  
$ git remote add origin git@github.com:reber-9/reber-9.com.git  
$ git pull origin gh-pages
$ cd ../
```

### 0x09 添加文件然后上传
> ```
$ hugo
$ cd pulbic/
$ git add .  
$ git commit -m "add html"  
$ git push origin gh-pages
```