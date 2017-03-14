+++
date = "2016-08-19T19:42:14+08:00"
description = ""
draft = false
tags = ["python", "termcolor", "pyfiglet", "python模块"]
title = "Python的一些小模块"
topics = ["Python"]

+++

### 0x00 colorama
> 这个模块可以输出带有颜色的字符
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import colorama

colorama.init()

print "{f_color}{content}{g_color}".format(f_color=colorama.Fore.CYAN,content='debug',g_color=colorama.Fore.RESET)
print "{f_color}{content}{g_color}".format(f_color=colorama.Fore.YELLOW,content='warning',g_color=colorama.Fore.RESET)
print "{f_color}{content}{g_color}".format(f_color=colorama.Fore.RED,content='error',g_color=colorama.Fore.RESET)
```
{{% fluid_img src="/img/post/python_moudle_colorama.png" alt="python的colorama模块" %}}

### 0x01 pyfiglet
> 可以输出字体的图片效果
```python
from pyfiglet import figlet_format

print figlet_format("reber", font="xtty") #font可以控制输出的类型
```
{{% fluid_img src="/img/post/python_moudle_pyfiglet.png" alt="python的pyfiglet模块" %}}

### 0x02 chardet
> 这个模块可以用来判断你的字符串(除了Unicode类型)是什么类型的编码
```python
#!/usr/bin/env python
#-*- coding:utf-8 -*-

import chardet
import requests

resp = requests.get("https://tower.im/users/sign_in")
html = resp.content

if not isinstance(html,unicode):
    code = chardet.detect(html)
    print code #输出当前的编码方式
	
	#解码为unicode，然后编码为gbk
    str1 = html.decode(code['encoding']).encode('gbk')
    print chardet.detect(str1)

    start = str1.find('<title>')
    stop = str1.find('</title')
    print str1[start+7:stop]
else:
    print u"编码是unicode."
```
{{% fluid_img src="/img/post/python_moudle_chardet.png" alt="python的chardet模块" %}}

### 0x03 tqdm
> 进度条
```python
from tqdm import tqdm
import time

num = 233
for x in tqdm(xrange(1,num+1)):
    time.sleep(0.001)
```
{{% fluid_img src="/img/post/python_moudle_tqdm.png" alt="python的tqdm模块" %}}

### 0x04 xpinyin
> 可以将汉字转化为拼音
```
>>> from xpinyin import Pinyin
>>> p = Pinyin()
>>> p.get_pinyin(u'上海')
u'shang-hai'
>>> p.get_pinyin(u'上海','')
u'shanghai'
>>> p.get_pinyin(u'上海',':::')
u'shang:::hai'
>>> p.get_initials(u'上海','')
u'SH'
>>>
```