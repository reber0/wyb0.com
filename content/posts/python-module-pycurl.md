+++
date = "2017-03-21T23:18:50+08:00"
description = ""
draft = false
tags = ["module"]
title = "Python的pycurl模块"
topics = ["Python"]

+++

### 0x00 关于cURL
> ```
cURL可以使用URL的语法模拟浏览器来传输数据，它支持FTP、FTPS、HTTP、HTTPS、GOPHER、TELNET、DICT、FILE以及LDAP等多种协议。

利用cURL可以实现：HTTPS认证、HTTP POST方法、HTTP PUT方法、FTP上传、keyberos认证、代理服务器、cookies、用户名/密码认证、下载文件断点续传、上传文件断点续传、http代理服务器管道等等。
```

### 0x01 pycurl常见方法
* 创建curl对象

> ```python
c = pycurl.Curl()    #创建一个curl对象 
```

* 设置请求

> ```python
c.setopt(pycurl.URL,"http://www.baidu.com")      #指定请求的URL
c.setopt(pycurl.CONNECTTIMEOUT, 5)    #连接的等待时间，设置为0则不等待
c.setopt(pycurl.TIMEOUT, 5)           #请求超时时间
c.setopt(pycurl.USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0")    #配置User-Agent

c.setopt(pycurl.NOPROGRESS, 0)        #是否屏蔽下载进度条，非0则屏蔽
c.setopt(pycurl.MAXREDIRS, 5)         #指定HTTP重定向的最大数
c.setopt(pycurl.FORBID_REUSE, 1)      #完成交互后强制断开连接，不重用
c.setopt(pycurl.FRESH_CONNECT,1)      #强制获取新的连接，即替代缓存中的连接
c.setopt(pycurl.DNS_CACHE_TIMEOUT,60) #设置保存DNS信息的时间，默认为120秒

c.setopt(pycurl.HEADERFUNCTION, getheader)   #将返回的HTTP HEADER定向到回调函数getheader
c.setopt(pycurl.WRITEFUNCTION, getbody)      #将返回的内容定向到回调函数getbody
c.setopt(pycurl.WRITEHEADER, fileobj)        #将返回的HTTP HEADER定向到fileobj文件对象
c.setopt(pycurl.WRITEDATA, fileobj)          #将返回的HTML内容定向到fileobj文件对象
```

* 部分返回信息

> ```python
c.getinfo(pycurl.HTTP_CODE)         #返回的HTTP状态码
c.getinfo(pycurl.HEADER_SIZE)       #HTTP头部大小
c.getinfo(pycurl.TOTAL_TIME)        #传输结束所消耗的总时间
c.getinfo(pycurl.NAMELOOKUP_TIME)   #DNS解析所消耗的时间
c.getinfo(pycurl.CONNECT_TIME)      #建立连接所消耗的时间
c.getinfo(pycurl.PRETRANSFER_TIME)  #从建立连接到准备传输所消耗的时间
c.getinfo(pycurl.STARTTRANSFER_TIME)#从建立连接到传输开始消耗的时间
c.getinfo(pycurl.REDIRECT_TIME)     #重定向所消耗的时间
c.getinfo(pycurl.SIZE_UPLOAD)       #上传数据包大小
c.getinfo(pycurl.SIZE_DOWNLOAD)     #下载数据包大小
c.getinfo(pycurl.SPEED_DOWNLOAD)    #平均下载速度
c.getinfo(pycurl.SPEED_UPLOAD)      #平均上传速度
```

### 0x02 简单使用
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pycurl
import StringIO

buf = StringIO.StringIO()
c = pycurl.Curl()
c.setopt(pycurl.URL, "http://127.0.0.1/site/range/sqli/sqli1.php")
c.setopt(pycurl.TIMEOUT, 15)
c.setopt(pycurl.USERAGENT,"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0")
c.setopt(pycurl.WRITEFUNCTION, buf.write) #将返回的内容定向到回调函数write

c.perform()
status_code = c.getinfo(pycurl.HTTP_CODE)       #返回的HTTP状态码
content_size = c.getinfo(pycurl.SIZE_DOWNLOAD)  #返回的数据的大小
content =buf.getvalue()
print status_code
print content_size
print content
```