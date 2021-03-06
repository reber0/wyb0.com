+++
date = "2016-05-29T22:50:52+08:00"
description = ""
draft = false
tags = ["mysql"]
title = "MySQL的增删改查"
topics = ["Database"]

+++

### 0x00 连接数据库
![连接数据库](/img/post/con_mysql.png)

### 0x01 查看数据库
![查看数据库](/img/post/show_databases.png)

### 0x02 创建数据库
一般将sql语句保存在文本中，然后复制运行
```sql
create database test;
use test;

drop table if exists users;
create table users(
id int not null auto_increment primary key,
username varchar(20) not null default 'xiaoming' comment '用户名',
password varchar(32) not null default '123456' comment '密码'
);

drop table if exists msg;
create table msg(
id int not null auto_increment primary key,
uid int not null default '0' comment '用户id',
title varchar(30) not null default 'title' comment '信息标题',
content varchar(1024) not null default 'content' comment '信息内容',
ip varchar(15) not null default '127.0.0.1' comment 'IP地址',
date int(15) not null default '20010101' comment '日期'
);
```
![创建数据库](/img/post/create_database_table.png)

### 0x03 插入数据
![插入数据](/img/post/mysql_insert.png)

### 0x04 查看数据
![查看数据](/img/post/mysql_select.png)

### 0x05 删除数据
![删除数据](/img/post/mysql_delete.png)

### 0x06 更新数据
![更新数据](/img/post/mysql_update.png)

### 0x07 更改数据库结构
![添加一列](/img/post/mysql_alter.png)
![删除一个表](/img/post/mysql_drop.png)
