+++
date = "2016-06-29T15:14:11+08:00"
description = ""
draft = false
tags = ["python"]
title = "Python的编码问题"
topics = ["Python"]

+++

### 0x00 几个编码函数
* chr(x)
    可以将0-255之间的数字转化为ASCII表中的字符
* ord(x)
    可以ASCII表中的字符转化为0-255之间的数字
* hex(x)
    将整数转化为十六进制字符串
* oct(x)
    将整数转化为八进制字符串

### 0x01 在py文件开头
> 使用：
```python
#!/usr/bin/env python
#-*- coding: UTF-8 -*-
或：
#coding=utf8
```

### 0x02 永久编码(推荐)
> ![python编码出错.png](/img/post/unicode_encode_error.png)
可以在python安装路径下的Lib\site-packages下新建文件sitecustomize.py文件，内容如下：
```python
#coding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
# 此方法修改了python环境，设置系统默认编码，永久有效
```

### 0x03 编码转换
> python默认unicode为中间编码，所以无论是何种编码，解码时默认都解码为unicode
```
# coding: UTF-8

"""从gbk编码的文件中读出数据，重新编码为utf8然后存储"""

f = open('test.txt')  # gbk编码
s = f.read()

u = s.decode('gbk') # 将gbk解码为unicode
# 通常要判断其编码方式是否为unicode
# isinstance(s, unicode)可以用来判断是否为unicode 
# 这里已知是GBK编码，解码成unicode
s = u.encode('utf8')  # 将unicode编码为utf8

f.write(s)
f.close()
```

### 0x04 网页的编码
> ```python
#!/usr/bin/env python
#-*- coding:utf-8 -*-

import requests

resp = requests.get('http://soft.nyist.edu.cn/')
print resp.apparent_encoding #UTF-8-SIG
resp.encoding = resp.apparent_encoding #获取原网页的编码格式，并赋给resp.encoding
html = resp.text #以resp.encoding的格式解码为unicode
# print html.encode('gb18030') #转码为gbk不能正常输出html源码
print type(html) #<type 'unicode'>
title = html.lower().split('<title>')[1].split('</title')[0]
print title #南阳理工学院
```