+++
title = "Oracle数据库"
topics = ["Database"]
tags = ["oracle"]
description = "我的个人博客，主要用于记录自己的一些学习笔记之类的东西，其中有渗透测试、python、php等。"
date = "2018-12-25T23:34:56+08:00"
draft = false
+++

### 0x00 Oracle组成
完整的Oracle数据库通常由两部分组成：Oracle数据库和数据库实例。

* 数据库是一系列物理文件的集合（数据文件，控制文件，联机日志，参数文件等）；
* Oracle数据库实例则是一组Oracle后台进程/线程以及在服务器分配的共享内存区。

### 0x01 关于实例
* 在启动Oracle数据库服务器时，实际上是在服务器的内存中创建一个Oracle实例（即在服务器内存中分配共享内存并创建相关的后台内存）
* 我们访问Oracle都是访问一个实例，通过Oracle数据库实例来访问和控制磁盘中的数据文件
* Oracle实例如果关联了数据库文件，就是可以访问的，如果没有，就会得到实例不可用的错误
* 实例名指的是用于响应某个数据库操作的数据库管理系统的名称，它同时也叫SID，连接数据库时就会用到这个SID，如：jdbc:oracle:thin:@localhost:1521:orcl（orcl就为数据库实例名）

### 0x02 关于表空间(可以理解为mysql中的数据库)
* Oracle数据库是通过表空间来存储物理表的，一个数据库实例可以有N个表空间，一个表空间下可以有N张表。
* 表空间(tablespace)是数据库的逻辑划分，每个数据库至少有一个表空间（称作SYSTEM表空间）
* 一般使用一些附加表空间来划分用户和应用程序。例如：USER表空间供一般用户使用，RBS表空间供回滚段使用。一个表空间只能属于一个数据库。

### 0x03 安装
使用docker拉取Oracle数据库并且运行
```
[23:36 reber@wyb in ~]
➜  docker pull alexeiled/docker-oracle-xe-11g
[23:36 reber@wyb in ~]
➜  docker run --rm -tid --shm-size=2g -p 1521:1521 -p 8080:8080 alexeiled/docker-oracle-xe-11g
```
然后在[www.oracle.com](https://www.oracle.com/technetwork/database/database-technologies/instant-client/downloads/index.html?_blank)下载链接Oracle的客户端：instantclient-basic-macos、instantclient-sqlplus-macos
```
[15:41 reber@wyb in ~/Downloads]
➜  unzip instantclient-basic-macos.x64-12.2.0.1.0-2.zip
Archive:  instantclient-basic-macos.x64-12.2.0.1.0-2.zip
  inflating: instantclient_12_2/BASIC_README
  inflating: instantclient_12_2/adrci
  inflating: instantclient_12_2/genezi
    linking: instantclient_12_2/libclntsh.dylib  -> libclntsh.dylib.12.1
  inflating: instantclient_12_2/libclntsh.dylib.12.1
  inflating: instantclient_12_2/libclntshcore.dylib.12.1
  inflating: instantclient_12_2/libnnz12.dylib
    linking: instantclient_12_2/libocci.dylib  -> libocci.dylib.12.1
  inflating: instantclient_12_2/libocci.dylib.12.1
  inflating: instantclient_12_2/libociei.dylib
  inflating: instantclient_12_2/libocijdbc12.dylib
  inflating: instantclient_12_2/libons.dylib
  inflating: instantclient_12_2/liboramysql12.dylib
  inflating: instantclient_12_2/ojdbc8.jar
  inflating: instantclient_12_2/uidrvci
  inflating: instantclient_12_2/xstreams.jar
finishing deferred symbolic links:
  instantclient_12_2/libclntsh.dylib -> libclntsh.dylib.12.1
  instantclient_12_2/libocci.dylib -> libocci.dylib.12.1
[15:41 reber@wyb in ~/Downloads]
➜  unzip instantclient-sqlplus-macos.x64-12.2.0.1.0-2.zip
Archive:  instantclient-sqlplus-macos.x64-12.2.0.1.0-2.zip
  inflating: instantclient_12_2/SQLPLUS_README
  inflating: instantclient_12_2/glogin.sql
  inflating: instantclient_12_2/libsqlplus.dylib
  inflating: instantclient_12_2/libsqlplusic.dylib
  inflating: instantclient_12_2/sqlplus
[15:42 reber@wyb in ~/Downloads]
➜  sudo mv instantclient_12_2 /opt/
Password:
[15:42 reber@wyb in ~/Downloads]
➜  ls /opt
RAR                  instantclient_12_2
chromedriver         metasploit-framework
➜  tail -n 5 ~/.zshrc
# oracle sqlplus
export PATH="$PATH:/opt/instantclient_12_2"
```
连接数据库
```
[16:03 reber@wyb in ~/Downloads]
➜  sqlplus system/oracle@127.0.0.1/xe

SQL*Plus: Release 12.2.0.1.0 Production on Tue Dec 25 16:03:25 2018

Copyright (c) 1982, 2017, Oracle.  All rights reserved.

Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production

SQL>
```

### 0x04 表空间操作
* 查看表空间
    ```sql
    --下面的表空间每个用户都有，类似mysql的information_schema和mysql数据库
    SQL> select tablespace_name,status from dba_tablespaces;

    TABLESPACE_NAME                STATUS
    ------------------------------ ---------
    SYSTEM                         ONLINE
    SYSAUX                         ONLINE
    UNDOTBS1                       ONLINE
    TEMP                           ONLINE
    USERS                          ONLINE
    ```
* 创建表空间
    ```sql
    --创建数据表空间
    SQL> create tablespace db_test_data --创建一个新的表空间，名字是db_test_data
      2  datafile '/tmp/db_test_data.dbf' --表空间数据文件路径
      3  size 64m --表空间初始大小
      4  autoextend on
      5  next 64m maxsize 2048m
      6  extent management local;

    Tablespace created.

    --创建临时表空间
    SQL> create temporary tablespace db_test_temp
      2  tempfile '/tmp/db_test_temp.dbf'
      3  size 64m
      4  autoextend on
      5  next 64m maxsize 2048m
      6  extent management local;

    Tablespace created.

    -- 再次查看表空间
    SQL> select tablespace_name,status from dba_tablespaces;

    TABLESPACE_NAME        STATUS
    ---------------------- ---------
    SYSTEM                 ONLINE
    SYSAUX                 ONLINE
    UNDOTBS1               ONLINE
    TEMP                   ONLINE
    USERS                  ONLINE
    DB_TEST_DATA           ONLINE
    DB_TEST_TEMP           ONLINE

    7 rows selected.
    ```
<br>
    ```sql
    --删除空的表空间，但是不包含物理文件
    drop tablespace tablespace_name;
    --删除空的表空间，包含物理文件
    drop tablespace tablespace_name including datafiles;

    --删除非空表空间，但是不包含物理文件
    drop tablespace tablespace_name including contents;
    --删除非空表空间，包含物理文件
    drop tablespace tablespace_name including contents and datafiles;
    ```
* 创建用户并把刚创建的表空间指定给它
    ```sql
    SQL> create user utest identified by ptest
      2  default tablespace db_test_data --默认用户表空间
      3  temporary tablespace db_test_temp; --默认临时表空间

    --查看用户表
    SQL> select username,password,default_tablespace,temporary_tablespace from dba_users;

    USERNAME             PASSWORD     DEFAULT_TABLESPACE   TEMPORARY_TABLESPACE
    -------------------- ------------ -------------------- --------------------
    UTEST                             DB_TEST_DATA         DB_TEST_TEMP
    SYS                               SYSTEM               TEMP
    ANONYMOUS                         SYSAUX               TEMP
    SYSTEM                            SYSTEM               TEMP
    APEX_PUBLIC_USER                  SYSTEM               TEMP
    APEX_040000                       SYSAUX               TEMP
    XS$NULL                           SYSTEM               TEMP
    OUTLN                             SYSTEM               TEMP
    FLOWS_FILES                       SYSAUX               TEMP
    MDSYS                             SYSAUX               TEMP
    CTXSYS                            SYSAUX               TEMP
    XDB                               SYSAUX               TEMP
    HR                                USERS                TEMP

    13 rows selected.
    ```
给用户授予权限(也可以创建有相应权限的角色然后授予角色)
    ```sql
    SQL> grant connect,resource to utest; --赋予用户角色，Oracle有dba、connect、resource这3个角色
    SQL> select * from session_privs; --查看当前用户的权限

    PRIVILEGE
    ----------------------------------------
    CREATE SESSION
    UNLIMITED TABLESPACE
    CREATE TABLE
    CREATE CLUSTER
    CREATE SEQUENCE
    CREATE PROCEDURE
    CREATE TRIGGER
    CREATE TYPE
    CREATE OPERATOR
    CREATE INDEXTYPE

    10 rows selected.

    --在db_test_data这个表空间下创建表tuser，不加tablespace db_test_data的话默认创建在SYSTEM这个表空间下
    SQL> create table tuser(
      2  id int not null primary key,
      3  username varchar(10) not null,
      4  password varchar(32) not null
      5  ) tablespace db_test_data; 

    Table created.
    ```
<br>
    ```sql
    --移除用户角色
    revoke connect,resource from utest;

    --赋予用户系统权限
    grant create session,unlimited tablespace,create table,create view,create any index,create sequence,create type to utest;
    --撤回用户系统权限
    revoke create session,unlimited tablespace,create table,create view,create any index,create sequence,create type from utest;

    --赋予用户对象权限
    grant select,insert,update,index,preferences on msg to utest;
    ```

* 删除用户
    ```sql
    drop user utest cascade;
    ```

### 0x05 数据表操作
* 重新连接表空间，然后查看当前用户的表空间
    ```sql
    [22:32 reber@wyb in ~/Downloads]
    ➜  sqlplus utest/ptest@127.0.0.1/xe

    SQL*Plus: Release 12.2.0.1.0 Production on Tue Dec 25 22:33:05 2018

    Copyright (c) 1982, 2017, Oracle.  All rights reserved.


    Connected to:
    Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production

    SQL> select tablespace_name from user_tablespaces;

    TABLESPACE_NAME
    ------------------------------
    SYSTEM
    SYSAUX
    UNDOTBS1
    TEMP
    USERS
    DB_TEST_DATA
    DB_TEST_TEMP

    7 rows selected.

    SQL> select username,default_tablespace,temporary_tablespace from user_users;

    USERNAME      DEFAULT_TABLESPACE     TEMPORARY_TABLESPACE
    ------------- ---------------------- ------------------------
    UTEST         DB_TEST_DATA           DB_TEST_TEMP

    SQL>
    ```
* 创建表、查看当前用户的表
    ```sql
    SQL> create table tuser1(
      2  id int not null primary key,
      3  username varchar(10) not null,
      4  password varchar(32) not null
      5  );

    Table created.

    SQL> select table_name,tablespace_name from user_tables;

    TABLE_NAME             TABLESPACE_NAME
    ---------------------- ----------------------
    TUSER                  DB_TEST_DATA
    TUSER1                 DB_TEST_DATA

    SQL> insert into tuser(id,username,password) values(1,'aaa','123456');

    1 row created.

    SQL> select * from tuser;

            ID USERNAME   PASSWORD
    ---------- ---------- --------------------------------
             1 aaa        123456

    SQL>
    ```