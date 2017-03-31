+++
date = "2016-05-07T21:37:07+08:00"
description = ""
draft = false
tags = ["server"]
title = "Ubuntu初接触(包括搭建LAMP)"
topics = ["Linux", "Server"]

+++

我是在虚拟机中安装14.04.4版的ubuntu：
下载地址：http://mirrors.163.com/ubuntu-releases/14.04.4/ubuntu-14.04.4-desktop-amd64.iso<br/>


## 1.配源或选择最快的更新服务器
选择最快的更新服务器:  
    System Settings --> Software & Updates --> Download from:other --> Select Best Server --> Choose Serve --> Close

配源:  
    reber@ubuntu:~$ cp /etc/apt/sources.list /etc/apt/sources.list.bak  
    reber@ubuntu:~$ vim /etc/apt/sources.list
    
    中科大源：
    deb http://debian.ustc.edu.cn/ubuntu/ trusty main restricted universe multiverse
    deb http://debian.ustc.edu.cn/ubuntu/ trusty-security main restricted universe multiverse
    deb http://debian.ustc.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse
    deb http://debian.ustc.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse
    deb http://debian.ustc.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse
    deb-src http://debian.ustc.edu.cn/ubuntu/ trusty main restricted universe multiverse
    deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-security main restricted universe multiverse
    deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse
    deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse
    deb-src http://debian.ustc.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse
    
    阿里源：
    deb http://mirrors.aliyun.com/ubuntu/ trusty main multiverse restricted universe
    deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main multiverse restricted universe
    deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main multiverse restricted universe
    deb http://mirrors.aliyun.com/ubuntu/ trusty-security main multiverse restricted universe
    deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main multiverse restricted universe
    deb-src http://mirrors.aliyun.com/ubuntu/ trusty main multiverse restricted universe
    deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main multiverse restricted universe
    deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main multiverse restricted universe
    deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main multiverse restricted universe
    deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main multiverse restricted universe

reber@ubuntu:~$ sudo apt-get update
    

## 2.简单配置
    $ sudo apt-get install open-vm-tools-desktop fuse
    $ sudo apt-get install vim
    $ sudo apt-get install nautilus-open-terminal  #注销,再次登陆即可任意地方右键打开终端
    $ vim /etc/default/apport   #更改enabled=0可解决开机总是提示有错误
    $ vim ~/.bashrc  #添加alias c='clear'
    
## 3.安装输入法
	apt-get -f install可解决依赖问题
    reber@ubuntu:~$ apt-get install ibus-sunpinyin   #安装后重启系统
    进入设置：system setting->text entry->添加sunpinyin
    
## 4.配置Apache/MySQL/PHP
    sudo apt-get install apache2
    sudo apt-get install mysql-client mysql-server
    sudo apt-get install php5
    sudo apt-get install php5-gd php5-mysql
    sudo apt-get install libapache2-mod-php5
    sudo apt-get install libapache2-mod-auth-mysql 
    sudo chmod 777 /var/www   #为了方便

    
	解决乱码问题：
    apache：sudo vim /etc/apache2/apache2.conf
		最后添加AddDefaultCharset UTF-8
    mysql：编辑数据库配置文件
        在[client]下面添加：
            default-character-set=utf8
        在[mysqld]在下面添加
            character_set_server=utf8
    
    测试数据库连接：
    编辑mysql_test.php代码如下：
    <?php
        $link = mysql_connect("localhost", "root", "password");
        if(!$link)
            die('Could not connect: ' . mysql_error());
        else
            echo "Mysql 配置正确!";
        mysql_close($link);
    ?>

    
## 5.管理开机自启
    ubuntu管理软件自启一般用rcconf：sudo apt-get install rcconf
    ubuntu添加mysql自启可以在/etc/rc.local添加/etc/init.d/mysql start
    
## 6.调时间

