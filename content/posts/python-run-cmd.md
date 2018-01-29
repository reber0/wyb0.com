+++
date = "2018-01-29T16:45:34+08:00"
description = ""
draft = false
tags = ["python","module"]
title = "Python中执行系统命令"
topics = ["Python"]

+++

### 0x00 使用模块
在python执行系统命令一般可以通过3个模块来实现，这三个模块是：os、commands、subprocess

### 0x01 os模块执行系统命令
一般用os模块的system函数来执行一些简单的命令
```python
>>> import os
>>> os.system("pwd")
/Users/reber
0
```

### 0x02 commands模块执行系统命令
commands这个模块在python3中被移除了
```python
>>> import commands
>>> commands.getoutput("pwd")
'/Users/reber'
>>> commands.getstatusoutput("pwd")
(0, '/Users/reber') #返回状态码以及结果
```

### 0x03 subprocess模块
* call函数  
函数原型：subprocess.call(args, *, stdin=None, stdout=None, stderr=None, shell=False)

```python
>>> from subprocess import call
>>> call(["ls","-l"]) #传入一个list
total 16
-rw-r--r--   1 reber  staff    80  8 16 16:19 README.md
drwxr-xr-x@  3 reber  staff   102  3 14  2017 archetypes
-rwxr-xr-x@  1 reber  staff  1403 12 13 17:43 config.toml
drwxr-xr-x@  4 reber  staff   136 12  9 23:02 content
drwxr-xr-x@  7 reber  staff   238  4 26  2017 layouts
drwxr-xr-x@ 19 reber  staff   646 10 11 12:33 public
drwxr-xr-x@  7 reber  staff   238 10 11 12:33 static
0
>>> call("ls -l",shell=True) #shell设置为True时可以传入一个字符串
total 16
-rw-r--r--   1 reber  staff    80  8 16 16:19 README.md
drwxr-xr-x@  3 reber  staff   102  3 14  2017 archetypes
-rwxr-xr-x@  1 reber  staff  1403 12 13 17:43 config.toml
drwxr-xr-x@  4 reber  staff   136 12  9 23:02 content
drwxr-xr-x@  7 reber  staff   238  4 26  2017 layouts
drwxr-xr-x@ 19 reber  staff   646 10 11 12:33 public
drwxr-xr-x@  7 reber  staff   238 10 11 12:33 static
0
```

* Popen函数

```python
>>> from subprocess import Popen,PIPE
>>> cmd = "python /Users/reber/Desktop/a.py"
>>> h = Popen(cmd, stdout=PIPE, stderr=PIPE, shell=True)
>>> h.stdout.read()
'3\n'
>>> h.stderr.read()
''
>>> f = open('a.txt','a+')
>>> h = Popen("ls -l", stdout=f, stderr=PIPE, shell=True) #写入文件
>>> h = Popen("ifconfig", shell=True, stdout=f, stderr=PIPE)
>>> f.close()
```

* 在python3中subprocess实现了commands的getstatusoutput方法

```
$ py3
(py3env) [16:28 reber@wyb in ~/wyb0.com git:(master) ✗]
$ python
Python 3.6.3 (default, Oct  4 2017, 06:09:15)
[GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.37)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from subprocess import getstatusoutput
>>> cmd = "python /Users/reber/Desktop/a.py"
>>> getstatusoutput(cmd)
(0, '3')
```