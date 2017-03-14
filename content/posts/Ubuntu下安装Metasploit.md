+++
date = "2016-08-18T10:38:41+08:00"
description = ""
draft = false
tags = ["软件", "metasploit"]
title = "Ubuntu下安装Metasploit"
topics = ["Pentest"]

+++

### 0x00 安装Metasploit
* 下载msfinstall脚本
```
$ curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
```

* 修改文件权限
```
$ chmod 755 msfinstall
```

* 安装(时间较久)
```
$ ./msfinstall
```

### 0x01 连接数据库
* 首先启动postgresql数据库
```
$ /etc/init.d/postgresql start #service postgresql start也可以
```

* 初始化MSF数据库(关键步骤)
```
$ msfdb init
```

* 运行msfconsole
```
$ msfconsole
```

* 在msf中查看数据库连接状态
```
msf > db_status
```