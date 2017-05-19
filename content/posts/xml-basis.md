+++
date = "2016-05-25T13:59:59+08:00"
description = ""
draft = false
tags = ["xml"]
title = "XML基础"
topics = ["Other"]

+++

## XML简介：
1. xml的设计宗旨是传输数据，而并非显示数据
2. xms是不作为的，它被设计用来结构化、存储以及传输信息
3. xml只是纯文本，独立于软硬件和应用程序
4. xml可供任何软硬设备读取数据
5. xml可以自定义标签
6. xml具有自我描述性
7. xml是对html的补充
8. xml常用于简化数据的存储和共享

例子：John给George的便签
```
<?xml version="1.0" encoding="UTF-8"?>
<note>   //根元素
  <to>George</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Don't forget the meeting!</body>
</note>
```


## XML树结构：
1. 必须有根节点
2. 根节点可以有子节点

格式：
```
<root>
  <child>
    <subchild>.....</subchild>
  </child>
</root>
```
例子：
```
<books>
  <book>
    <name>Python黑帽子</name>
    <date>2015</date>
    <price>37￥</price>
    <description>
      用python写一些程序
    </description>
  </book>
  <book>
	<name>Web安全深度剖析</name>
	<date>2014</date>
	<price>39￥</price>
	<description>
	  讲述web渗透的基础知识
	</description>
  </book>
  <book>
	<name>白帽子讲web安全</name>
	<date>2013</date>
	<price>44￥</price>
	<description>
		道哥力作
	</description>
  </book>
</books>
```

## XML语法规则：
1. 所有元素必有闭合标签
2. 标签对大小写敏感
3. 必须正确的嵌套
4. XML必须有根元素
5. XML的属性值必须加引号(能用子元素的就用子元素代替属性)
6. 实体引用  
`&lt; 	< 	小于`<br />
`&gt; 	> 	大于`<br />
`&amp; 	& 	和号`<br />
`&apos; 	' 	单引号`<br />
`&quot; 	" 	引号`<br />
7. 注释  
`<!--   -->`
8. 空格会被保留
9. XML以LF存储换行


## XML属性：
对于xml要尽量避免使用属性  
下面两种xml文档包含信息相同，但是推荐第二种
```
<note date="08/08/2008">
<to>George</to>
<from>John</from>
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>
</note> 
```
```
<note>
  <date>
    <day>08</day>
    <month>08</month>
    <year>2008</year>
  </date>
<to>George</to>
<from>John</from>
<heading>Reminder</heading>
<body>Don't forget the meeting!</body>
</note>
```

## 针对元数据的XML属性：
下面的ID仅仅是一个标识符，用于标识不同的便签。
```
<messages>
  <note id="501">
    <to>George</to>
    <from>John</from>
    <heading>Reminder</heading>
    <body>Don't forget the meeting!</body>
  </note>
  <note id="502">
    <to>John</to>
    <from>George</from>
    <heading>Re: Reminder</heading>
    <body>I will not</body>
  </note> 
</messages>
```