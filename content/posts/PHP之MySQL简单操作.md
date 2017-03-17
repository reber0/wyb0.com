+++
date = "2016-05-29T22:50:52+08:00"
description = ""
draft = false
tags = ["php", "mysql"]
title = "PHP之MySQL简单操作"
topics = ["PHP", "MySQL"]

+++

## 连接数据库
{{% fluid_img src="/img/post/con_mysql.png" alt="连接数据库.png" %}}

## 查看数据库
{{% fluid_img src="/img/post/show_databases.png" alt="查看数据库" %}}

## 创建数据库
一般将sql语句保存在文本中，然后复制运行
```sql
create database test;
use test;

create table users(
id int not null auto_increment primary key,
username varchar(20) not null,
password varchar(32) not null
);

create table msg(
id int not null auto_increment primary key,
uid int not null,
title varchar(30) not null,
content varchar(1024) not null,
ip varchar(15) not null,
date int(15) not null
);
```
{{% fluid_img src="/img/post/create_database_table.png" alt="创建数据库" %}}

## 插入数据
{{% fluid_img src="/img/post/mysql_insert.png" alt="插入数据" %}}

## 查看数据
{{% fluid_img src="/img/post/mysql_select.png" alt="查看数据" %}}

## 删除数据
{{% fluid_img src="/img/post/mysql_delete.png" alt="删除数据" %}}

## 更新数据
{{% fluid_img src="/img/post/mysql_update.png" alt="更新数据" %}}

## 更改数据库结构
{{% fluid_img src="/img/post/mysql_alter.png" alt="添加一列" %}}
<br />&nbsp;
{{% fluid_img src="/img/post/mysql_drop.png" alt="删除一个表" %}}