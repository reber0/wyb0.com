+++
date = "2015-12-20T20:08:47+08:00"
description = ""
draft = false
tags = ["injection"]
title = "各种参数类型注入"
topics = ["Pentest"]

+++

### 0x00 分类
根据注入时提交的变量参数类型，SQL注入点有不同的分类，不同的注入点，其注入时需要注意的事项也有所不同。按提交参数类型，SQL注入点主要分为下面3种：即数字型注入点、字符型注入点和搜索型注入点

### 0x01 数字型注入点
形如"http://www.xxx.com/a.asp?ID=55" ，这类注入的参数是"数字"，因此称为"数字型注入点"。
此类注入点提交的SQL语句，其原形大致为：select * from 表名 where 字段=55  
当提交"http://www.xxx.com/a.asp?ID=55 And [查询条件]"时，向数据库提交的完整SQL语句为：  
select * from 表名 where 字段=55 and [查询条件]

### 0x02 字符型注入点
形如"http://www.xxx.com/a.asp?Class=0123"这类注入的参数是"字符"，称为"字符型"注入点。  
此类注入点提交的 SQL 语句，其原形大致为：  
select * from 表名 where 字段='日期'  
当提交"http://www.xxx.com/a.asp?Class=日期 And [查询条件]"时，向数据库提交的SQL语句为：  
select * from 表名 where 字段='日期' and [查询条件]

### 0x03 搜索型注入点
这是一类特殊的注入类型。  
这类注入主要是指在进行数据搜索时没过滤搜索参数，一般在链接地址中有"keyword=关键字"，有的不显示的链接地址，而是直接通过搜索框表单提交。  
此类注入点提交的 SQL 语句，其原形大致为：  
select * from 表名 where 字段 like '%关键字%'  
当我们提交注入参数为"keyword='and[查询条件] and '%'=',则向数据库提交的完整SQL语句为：  
select * from 表名 where 字段 like '%' and [查询条件] and '%'='%'