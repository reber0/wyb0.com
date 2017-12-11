+++
date = "2016-04-19T21:30:07+08:00"
description = ""
draft = false
tags = ["linux"]
title = "Linux之压缩"
topics = ["Linux"]

+++

### 0x00 tar主要参数
```ini
-c	创建一个新的压缩文件
-x	解压
-t	查看压缩文件的内容
-f	指定档案文件的名字
-v	显示过程信息
-r	增加文件到指定的包
-C	指定解压后的路径
-z	使用gzip
-j	使用bzip2
-Z	使用compress
```

### 0x01 tar示例
```bash
$ ls
aaa
$ tar -cvf 1.tar aaa/   #打包不压缩
aaa/
aaa/b.txt
aaa/c.txt
aaa/test.txt
aaa/a.txt
$ tar -zcvf 1.tar.gz aaa/   #打包且以gzip压缩
aaa/
aaa/b.txt
aaa/c.txt
aaa/test.txt
aaa/a.txt
$ tar -jcvf 1.tar.bz2 aaa/  #打包且以bzip2压缩
aaa/
aaa/b.txt
aaa/c.txt
aaa/test.txt
aaa/a.txt
tar -zxvf aa.tar.gz /home/aaa --exclude=dir  #排除目录
$ ls -l
total 24
-rw-r--r--. 1 wyb root 10240 Apr 19 07:47 1.tar
-rw-r--r--. 1 wyb root   265 Apr 19 07:48 1.tar.bz2
-rw-r--r--. 1 wyb root   253 Apr 19 07:48 1.tar.gz
drwxr-xr-x. 2 wyb root  4096 Apr 19 07:22 aaa
$ file 1.tar.gz     #查看文件类型
1.tar.gz: gzip compressed data, from Unix, last modified: Tue Apr 19 07:48:01 2016
$ tar -ztvf 1.tar.gz    #查看压缩包内容
drwxr-xr-x wyb/root          0 2016-04-19 07:22 aaa/
-rw-r--r-- wyb/root          0 2016-04-19 05:05 aaa/b.txt
-rw-r--r-- wyb/root          0 2016-04-19 05:05 aaa/c.txt
-rw-r--r-- wyb/root         84 2016-04-19 05:50 aaa/test.txt
-rw-r--r-- wyb/root          0 2016-04-19 05:05 aaa/a.txt
$ ls
1.tar  1.tar.bz2  1.tar.gz  aaa
$ rm -rf aaa/
$ ls
1.tar  1.tar.bz2  1.tar.gz
$ tar -zxvf 1.tar.gz    #解压到当前目录
aaa/
aaa/b.txt
aaa/c.txt
aaa/test.txt
aaa/a.txt
$ ls
1.tar  1.tar.bz2  1.tar.gz  aaa
$ ls aaa/
a.txt  b.txt  c.txt  test.txt
$ ls /tmp/
111.txt  aa
$ tar -zxvf 1.tar.gz -C /tmp/aa #解压到指定路径
aaa/
aaa/b.txt
aaa/c.txt
aaa/test.txt
aaa/a.txt
$ 
```
    
### 0x02 zip
```bash
[reber@localhost ~]$ ls aaa/
a.txt  b.txt  c.txt
[reber@localhost ~]$ zip -re aaa.zip aaa/   #加密压缩
Enter password: 
Verify password: 
  adding: aaa/ (stored 0%)
  adding: aaa/b.txt (stored 0%)
  adding: aaa/c.txt (stored 0%)
  adding: aaa/a.txt (stored 0%)
[reber@localhost ~]$ rm aaa/*
[reber@localhost ~]$ ls aaa/
[reber@localhost ~]$ unzip aaa.zip   #解压缩
Archive:  aaa.zip
[aaa.zip] aaa/b.txt password: 
 extracting: aaa/b.txt         
 extracting: aaa/c.txt               
 extracting: aaa/a.txt
 ```
