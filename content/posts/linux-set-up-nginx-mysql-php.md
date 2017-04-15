+++
date = "2016-06-17T22:41:50+08:00"
description = ""
draft = false
tags = ["server"]
title = "Linux下搭建Nginx+MySQL+PHP"
topics = ["Server"]

+++

```
安装环境为：CentOS-6.5-x86_64-minimal
```

## 一、准备工作
	首先执行：
    	sudo yum groupinstall "Development tools"
    安装make：
        yum -y install gcc automake autoconf libtool make
    安装g++：
        yum install gcc gcc-c++

## 二、安装mysql和php
```sh
sudo yum install mysql mysql-server mysql-devel
sudo yum install php php-devel
sudo yum install php-gd php-mysql php-fpm
```

## 三、安装依赖
1. 安装pcre、pcre-devel  
sudo yum install pcre pcre-devel

2. 安装zlib、zlib-devel  
sudo yum install zlib zlib-devel

3. 安装ssl  
sudo yum install openssl openssl-devel

## 四、安装Nginx
可在http://nginx.org/download/nginx-1.9.9.tar.gz 下载
{{% fluid_img src="/img/post/download_nginx.png" alt="下载nginx安装包" %}}
```sh
[reber@WYB nginx-1.9.9]$ ./configure
[reber@WYB nginx-1.9.9]$ make
[reber@WYB nginx-1.9.9]$ sudo make install
```

## 五、启动与关闭nginx
```sh
# 开启服务：
[reber@WYB nginx-1.9.9]$ sudo /usr/local/nginx/sbin/nginx
# 关闭服务：
[reber@WYB nginx-1.9.9]$ killall nginx
```
{{% fluid_img src="/img/post/visit_nginx.png" alt="访问nginx.png" %}}

## 六、配置nginx支持php
[reber@WYB nginx-1.9.9]$ killall nginx  
[reber@WYB nginx-1.9.9]$ vim /usr/local/nginx/conf/nginx.conf

```
location / {
    root   html;
    index  index.html index.htm index.php;
}

location ~ \.php$ {
	root           html;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
}
```

```sh
[reber@WYB nginx-1.9.9]$ sudo service php-fpm start
[reber@WYB nginx-1.9.9]$ sudo /usr/local/nginx/sbin/nginx
```

{{% fluid_img src="/img/post/visit_nginx_phpinfo.png" alt="访问nginx的phpinfo.php.png" %}}