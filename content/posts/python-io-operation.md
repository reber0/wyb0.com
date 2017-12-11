+++
date = "2016-01-31T12:27:06+08:00"
description = ""
draft = false
tags = ["python"]
title = "Python的IO操作"
topics = ["Python"]

+++

### 0x00 文件的操作
* 文件读写

r读取；rb可以读取二进制文件(如图片、视频)；w可覆盖写入；a+可追加写入
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    f = open("test.txt","r")
    data = f.read()
    print "File name: ",f.name
    print "File open moudle: ",f.mode
    print "File is close ?",f.closed
    print "File content: ",data
finally:
    f.close()

with open("test.txt","a+") as f: #自动调用close()
    data = "\nYes,I know."
    f.write(data)
    print u"写入内容：%s" % data

with open("test.txt","r") as f:
    #readlines()一次读取一行，返回一个列表，也可以用read(size)读取指定大小
    line = f.readlines()
    print line
```
![python文件读写](/img/post/python_file_read_write.png)

* 指针移动

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    f = open("test.txt","r")
    data = f.read(6) #读取6个字节，所以指针位置为6
    print u"指针当前位置：",f.tell()
    f.seek(4,0) #0表示从开头位置，向后移动4
    print u"指针当前位置：",f.tell()
    f.seek(-3,1) #1表示从当前位置，向前移动3
    print u"指针当前位置：",f.tell()
    f.seek(-10,2) #2表示从末尾位置，向前移动10
    print u"指针当前位置：",f.tell()
finally:
    f.close()
```
![python操作指针读文件](/img/post/python_file_read_point.png)

* 文件操作

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import time

if not os.path.exists("test.txt"):
    f = open("test.txt","w") #新建文件
    f.close()
    print u"新建文件test.txt"
else:
    os.rename("test.txt","temp.txt") #重命名
    print u"文件test.txt重命名为temp.txt"

if os.path.exists("temp.txt"):
    time.sleep(2)
    os.remove("temp.txt") #删除文件
    print u"删除文件temp.txt"
```
![python文件操作](/img/post/python_file_operation.png)

### 0x01 目录的操作
* 目录操作

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import time

if not os.path.exists("test"):
    os.mkdir("test") #创建目录
    print u"创建目录test"
if not os.path.exists("aa/bb/cc"):
    os.makedirs("aa/bb/cc") #创建多级目录
    print u"创建多级目录aa/bb/cc"
else:
    print u"多级目录已经存在"
if os.path.exists("test"):
    time.sleep(2)
    os.rmdir("test") #删除空的目录，目录内不能有东西
    print u"删除空目录test"

print u"当前工作路径：",os.getcwd() #得到当前工作路径
os.chdir("d:\Clone") #切换工作路径
print u"切换工作路径到d:\Clone"
print u"当前工作路径：",os.getcwd()
```
![python创建和删除文件夹](/img/post/python_create_and_del_dir.png)

* 删除非空文件夹

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

def deldir(dirname):
    if os.path.exists(dirname):
        dlist = os.listdir(dirname)
        if dlist:
            # print dlist
            for x in dlist:
                subFile = os.path.join(dirname,x)
                # print subFile
                if os.path.isfile(subFile):
                    print "remove file %s" % subFile
                    os.remove(subFile)
                if os.path.isdir(subFile):
                    deldir(subFile)
        print "remove dir %s" % dirname
        os.rmdir(dirname)
    else:
        print "the dir is not exists"

dirname = raw_input("Please input you want to delete the folder name: ")
deldir(dirname)
```
![python删除非空文件夹](/img/post/python_del_not_null_dir.png)

* 常用方法

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

print os.name #输出字符串指示正在使用的平台
print os.linesep #给出当前平台使用的行终止符,windows为"\r\n"
os.system("whoami") #执行系统命令
print os.getcwd() #函数得到当前工作目录
print os.path.abspath('D:\Clone') #获得绝对路径
print os.listdir('C:\\Users\\WYB_9\\Desktop\\a') #返回目录下所有文件和目录名
print "#########################"
print os.path.isfile('python.py')
print os.path.isdir('D:\Clone') #检验给出的路径是一个文件还是目录。
print os.path.exists('D:\Clone') #检验给出的路径(文件和文件夹均可)是否真的存在
print os.path.normpath('c:/windows\\system32\\') #规范path字符串格式
print "#########################"
print os.path.getsize('python.py') #获得文件大小，如果name是目录返回0L
print os.path.join('C:\windows', '1.txt') #连接目录与文件名或目录
print os.path.split('C:\windows\c.txt') #返回一个路径的目录名和文件名
print os.path.dirname('C:\windows\c.txt') #返回目录名
print os.path.basename('C:\windows\c.txt') #返回文件名
print os.path.splitext('1.txt') #分离文件名与拓展名
```
![python文件操作常用方法](/img/post/python_file_common_fun.png)
