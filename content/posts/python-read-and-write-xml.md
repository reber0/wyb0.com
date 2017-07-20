+++
date = "2017-07-20T14:20:26+08:00"
description = ""
draft = false
tags = ["python","xml"]
title = "使用Python读写xml文件"
topics = ["Other"]

+++

### 0x00 文件内容
> ```
<?xml version='1.0' encoding='UTF-8'?>
<books>
  <book>
    <name>Python黑帽子</name>
    <date>2015</date>
    <price>37￥</price>
    <description>用python写一些程序</description>
  </book>
  <book>
    <name>Web安全深度剖析</name>
    <date>2014</date>
    <price>39￥</price>
    <description>讲述web渗透的基础知识</description>
  </book>
  <book>
    <name>白帽子讲web安全</name>
    <date>2013</date>
    <price>44￥</price>
    <description>道哥力作</description>
  </book>
</books>
```

### 0x01 读取xml节点
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from xml.etree import ElementTree as ET

tree = ET.parse('test.xml')
root = tree.getroot()
# root = ET.fromstring(country_data_as_string) #通过字符串导入,直接获取根
childs = root.getchildren()

books = []
for child0 in childs:
    book = {}
    for child00 in child0.getchildren():
        # print child00.tag #标签名，即name、date、price、description
        # print child00.text
        book[child00.tag] = child00.text
    books.append(book)

print books
"""
books = [
    {'name': 'Python黑帽子','date': '2015','price': '37￥','description': '用python写一些程序'},
    {'name': 'Web安全深度剖析','date': '2014','price': '39￥','description': '讲述web渗透的基础知识'},
    {'name': '白帽子讲web安全','date': '2013','price': '44￥','description': '道哥力作'}        
]
"""
```

### 0x02 写入xml文件
> ```
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from xml.etree.ElementTree import Element,ElementTree

books = [
    {
        'name': u'Python黑帽子',
        'date': '2015',
        'price': u'37￥',
        'description': u'用python写一些程序'
    },
    {
        'name': u'Web安全深度剖析',
        'date': '2014',
        'price': u'39￥',
        'description': u'讲述web渗透的基础知识'
    },
    {
        'name': u'白帽子讲web安全',
        'date': '2013',
        'price': u'44￥',
        'description': u'道哥力作'
    }        
]

def indent(elem, level=0):
    """美化写入文件的内容"""
    i = "\n" + level*"  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for elem in elem:
            indent(elem, level+1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i


root = Element('books')
tree = ElementTree(root)

for book in books:
    child0 = Element('book')
    root.append(child0)

    for k,v in book.items():
        child00 = Element(k)
        child00.text = v
        child0.append(child00)

indent(root,0)
tree.write('aa.xml', 'UTF-8')
```