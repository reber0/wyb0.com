+++
date = "2016-06-19T20:18:48+08:00"
description = ""
draft = false
tags = ["mysql"]
title = "MySQL的information_schema库"
topics = ["Database"]

+++

### 0x00 information\_schema
```
information_schema这这个数据库中保存了MySQL服务器所有数据库的信息。
如数据库名，数据库的表，表栏的数据类型与访问权限等。
再简单点，这台MySQL服务器上，到底有哪些数据库、各个数据库有哪些表，
每张表的字段类型是什么，各个数据库要什么权限才能访问，等等信息都保存在information_schema里面。

information_schema的表schemata中的列schema_name记录了所有数据库的名字
information_schema的表tables中的列table_schema记录了所有数据库的名字
information_schema的表tables中的列table_name记录了所有数据库的表的名字
information_schema的表columns中的列table_schema记录了所有数据库的名字
information_schema的表columns中的列table_name记录了所有数据库的表的名字
information_schema的表columns中的列column_name记录了所有数据库的表的列的名字
```
![information_schema的所有表](/img/post/information_schema_alltables.png)

### 0x01 information_schema的SCHEMATA表
![information_schema的SCHEMATA表](/img/post/information_schema_SCHEMATA.png)

### 0x02 information_schema的TABLES表
![information_schema的TABLES表](/img/post/information_schema_TABLES.png)
![information_schema的TABLES表的部分列](/img/post/information_schema.tables.png)

### 0x03 information_schema的COLUMNS表
![information_schema的COLUMNS表](/img/post/information_schema_COLUMNS.png)
![information_schema的COLUMNS表的部分列](/img/post/information_schema.columns.png)
