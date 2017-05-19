+++
date = "2016-07-14T15:24:11+08:00"
description = ""
draft = false
tags = ["python", "module"]
title = "Python的paramiko模块"
topics = ["Python"]

+++

## 安装
直接pip install paramiko安装  
或者去http://www.paramiko.org/ 下载

## 执行一条远程命令
```python
#!/usr/bin/env python
#-*- coding:utf-8 -*-

import paramiko

#远程执行命令
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("192.168.188.134",22,"reber","123456")
ssh_session = ssh.get_transport().open_session()

stdin,stdout,stderr = ssh.exec_command("ls -l")
print stdin
print stdout.readlines()   #返回执行结果
print stderr.readlines()   #有错误信息就返回错误信息，没有就返回空

ssh.close()
```
{{% fluid_img src="/img/post/paramiko_ssh_one_command.png" alt="paramiko远程ssh后执行一条命令.png" %}}

## 上传与下载文件
```python
#!/usr/bin/env python
#-*- coding:utf-8 -*-

import paramiko
ftp = paramiko.Transport(("192.168.188.134",22))
ftp.connect(username="reber",password="123456")
sftp = paramiko.SFTPClient.from_transport(ftp)

#将本地的文件上传到服务端的/tmp/a.txt
remotepath='/tmp/a.txt'
localpath='C:\\Users\\WYB_9\\Desktop\\a.txt'
sftp.put(localpath, remotepath)

#将服务端的文件下载到C:\\Users\\WYB_9\\Desktop\\system.log
remotepath='/tmp/a.txt'
localpath='C:\\Users\\WYB_9\\Desktop\\system.log'
sftp.get(remotepath, localpath)

ftp.close()
```
{{% fluid_img src="/img/post/paramiko_put_file.png" alt="paramiko上传文件.png" %}}