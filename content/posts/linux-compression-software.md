+++
date = "2016-04-19T21:30:07+08:00"
description = ""
draft = false
tags = ["linux"]
title = "Linux之tar"
topics = ["Linux"]

+++

### tar主要参数：

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

### tar示例：
    [wyb@localhost temp]$ ls
    aaa
    [wyb@localhost temp]$ tar -cvf 1.tar aaa/   *打包不压缩*
    aaa/
    aaa/b.txt
    aaa/c.txt
    aaa/test.txt
    aaa/a.txt
    [wyb@localhost temp]$ tar -zcvf 1.tar.gz aaa/   *打包且以gzip压缩*
    aaa/
    aaa/b.txt
    aaa/c.txt
    aaa/test.txt
    aaa/a.txt
    [wyb@localhost temp]$ tar -jcvf 1.tar.bz2 aaa/  *打包且以bzip2压缩*
    aaa/
    aaa/b.txt
    aaa/c.txt
    aaa/test.txt
    aaa/a.txt
    [wyb@localhost temp]tar -zxvf aa.tar.gz /home/aaa --exclude=dir  //排除目录
    [wyb@localhost temp]$ ls -l
    total 24
    -rw-r--r--. 1 wyb root 10240 Apr 19 07:47 1.tar
    -rw-r--r--. 1 wyb root   265 Apr 19 07:48 1.tar.bz2
    -rw-r--r--. 1 wyb root   253 Apr 19 07:48 1.tar.gz
    drwxr-xr-x. 2 wyb root  4096 Apr 19 07:22 aaa
    [wyb@localhost temp]$ file 1.tar.gz     *查看文件类型*
    1.tar.gz: gzip compressed data, from Unix, last modified: Tue Apr 19 07:48:01 2016
    [wyb@localhost temp]$ tar -ztvf 1.tar.gz    *查看压缩包内容*
    drwxr-xr-x wyb/root          0 2016-04-19 07:22 aaa/
    -rw-r--r-- wyb/root          0 2016-04-19 05:05 aaa/b.txt
    -rw-r--r-- wyb/root          0 2016-04-19 05:05 aaa/c.txt
    -rw-r--r-- wyb/root         84 2016-04-19 05:50 aaa/test.txt
    -rw-r--r-- wyb/root          0 2016-04-19 05:05 aaa/a.txt
    [wyb@localhost temp]$ ls
    1.tar  1.tar.bz2  1.tar.gz  aaa
    [wyb@localhost temp]$ rm -rf aaa/
    [wyb@localhost temp]$ ls
    1.tar  1.tar.bz2  1.tar.gz
    [wyb@localhost temp]$ tar -zxvf 1.tar.gz    *解压到当前目录*
    aaa/
    aaa/b.txt
    aaa/c.txt
    aaa/test.txt
    aaa/a.txt
    [wyb@localhost temp]$ ls
    1.tar  1.tar.bz2  1.tar.gz  aaa
    [wyb@localhost temp]$ ls aaa/
    a.txt  b.txt  c.txt  test.txt
    [wyb@localhost temp]$ ls /tmp/
    111.txt  aa
    [wyb@localhost temp]$ tar -zxvf 1.tar.gz -C /tmp/aa *解压到指定路径*
    aaa/
    aaa/b.txt
    aaa/c.txt
    aaa/test.txt
    aaa/a.txt
    [wyb@localhost temp]$ 
    
    
### zip：
    [reber@localhost ~]$ ls aaa/
    a.txt  b.txt  c.txt
    [reber@localhost ~]$ zip -re aaa.zip aaa/   //加密压缩
    Enter password: 
    Verify password: 
      adding: aaa/ (stored 0%)
      adding: aaa/b.txt (stored 0%)
      adding: aaa/c.txt (stored 0%)
      adding: aaa/a.txt (stored 0%)
    [reber@localhost ~]$ rm aaa/*
    [reber@localhost ~]$ ls aaa/
    [reber@localhost ~]$ unzip aaa.zip   //解压缩
    Archive:  aaa.zip
    [aaa.zip] aaa/b.txt password: 
     extracting: aaa/b.txt         
     extracting: aaa/c.txt               
     extracting: aaa/a.txt   