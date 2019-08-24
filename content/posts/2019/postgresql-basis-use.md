+++
title = "PostgreSQL 简单使用"
topics = ["Database"]
tags = ["postgresql"]
description = "PostgreSQL 简单使用"
date = "2019-08-23T16:27:12+08:00"
draft = false
+++

<!--
 * @Author: reber
 * @Mail: reber0ask@qq.com
 * @Date: 2019-08-23 16:27:12
 * @LastEditTime: 2019-08-24 11:28:26
 -->
### 0x00 安装
```
➜  brew install postgresql
➜  echo 'export PATH="/usr/local/Cellar/postgresql/11.4/bin:$PATH"' >> ~/.zshrc
➜  source ~/.zshrc
-- 初始化数据库
➜  initdb /usr/local/var/postgres
➜  pg_ctl -D /usr/local/var/postgres -l /usr/local/var/log/postgres/postgres.log start
-- 创建用户名数据库
➜  createdb
```

### 0x01 简单操作
```
reber=# \password #设置当前登录用户的密码
reber=# \password [user_name] #设置其他用户的密码
reber=# \l #列出所有数据库
reber=# \du #列出所有用户
reber=# \c [database_name] #连接数据库
reber=# \d #列出当前数据库的所有表
reber=# \d [table_name] #列出表结构
reber=# \conninfo #列出当前数据库和连接的信息
```

* 连接数据库

```bash
➜  psql #psql连接数据库默认选用的是当前的系统用户
psql (11.4)
Type "help" for help.

reber=# \l #查看当前数据库情况
                              List of databases
   Name    | Owner | Encoding |   Collate   |    Ctype    | Access privileges
-----------+-------+----------+-------------+-------------+-------------------
 postgres  | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 reber     | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 template0 | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber         +
           |       |          |             |             | reber=CTc/reber
 template1 | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber         +
           |       |          |             |             | reber=CTc/reber
(4 rows)

reber=# \du #查看当前用户
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 reber     | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```

* 删除自带的 postgres 数据库

```
reber=# drop database postgres;
DROP DATABASE
reber=# \l
                              List of databases
   Name    | Owner | Encoding |   Collate   |    Ctype    | Access privileges
-----------+-------+----------+-------------+-------------+-------------------
 reber     | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 template0 | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber         +
           |       |          |             |             | reber=CTc/reber
 template1 | reber | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber         +
           |       |          |             |             | reber=CTc/reber
(3 rows)
```

* 创建新用户

```
reber=# create user reber0ask with password '3eRa1kBg95D7';
CREATE ROLE
reber-# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 reber     | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 reber0ask |                                                            | {}
```

* 为新用户创建新数据库

```
reber=# create database mypgsql owner reber0ask;
CREATE DATABASE
reber=# \l
                                List of databases
   Name    |   Owner   | Encoding |   Collate   |    Ctype    | Access privileges
-----------+-----------+----------+-------------+-------------+-------------------
 mypgsql   | reber0ask | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 reber     | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 template0 | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber         +
           |           |          |             |             | reber=CTc/reber
 template1 | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber         +
           |           |          |             |             | reber=CTc/reber
(4 rows)
```

* 将新数据库的所有权限都给用户

```
reber=# grant all privileges on database mypgsql to reber0ask;
GRANT
reber=# \l
                                   List of databases
   Name    |   Owner   | Encoding |   Collate   |    Ctype    |    Access privileges
-----------+-----------+----------+-------------+-------------+-------------------------
 mypgsql   | reber0ask | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =Tc/reber0ask          +
           |           |          |             |             | reber0ask=CTc/reber0ask
 reber     | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 template0 | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber               +
           |           |          |             |             | reber=CTc/reber
 template1 | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber               +
           |           |          |             |             | reber=CTc/reber
(4 rows)
```

* 给用户创建数据库的属性

```
reber=# alter role reber0ask createdb;
ALTER ROLE
reber=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of
-----------+------------------------------------------------------------+-----------
 reber     | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 reber0ask | Create DB                                                  | {}
```

* 以指定用户登陆并创建表

```
➜  psql -U reber0ask -d mypgsql -h 127.0.0.1 -p 5432
psql (11.4)
Type "help" for help.

mypgsql=> \l
                                   List of databases
   Name    |   Owner   | Encoding |   Collate   |    Ctype    |    Access privileges
-----------+-----------+----------+-------------+-------------+-------------------------
 mypgsql   | reber0ask | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =Tc/reber0ask          +
           |           |          |             |             | reber0ask=CTc/reber0ask
 reber     | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 |
 template0 | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber               +
           |           |          |             |             | reber=CTc/reber
 template1 | reber     | UTF8     | zh_CN.UTF-8 | zh_CN.UTF-8 | =c/reber               +
           |           |          |             |             | reber=CTc/reber
(4 rows)

mypgsql=> create table msg(
mypgsql(> id serial primary key,
mypgsql(> title character varying(100),
mypgsql(> content character varying(2014)
mypgsql(> );
CREATE TABLE
mypgsql=> \d
             List of relations
 Schema |    Name    |   Type   |   Owner
--------+------------+----------+-----------
 public | msg        | table    | reber0ask
 public | msg_id_seq | sequence | reber0ask
(2 rows)

mypgsql=> \d msg;
                                     Table "public.msg"
 Column  |          Type           | Collation | Nullable |             Default
---------+-------------------------+-----------+----------+---------------------------------
 id      | integer                 |           | not null | nextval('msg_id_seq'::regclass)
 title   | character varying(100)  |           |          |
 content | character varying(2014) |           |          |
Indexes:
    "msg_pkey" PRIMARY KEY, btree (id)

mypgsql=> insert into public.msg(title,content) values('hi','hello world!');
INSERT 0 1
mypgsql=> select * from msg;
 id | title |   content
----+-------+--------------
  1 | hi    | hello world!
(1 row)
```

### 0x02 导入与导出
* 导出

```
➜  pg_dump -U reber0ask mypgsql > mypgsql.sql
➜  ls -al mypgsql.sql
-rw-r--r--  1 reber  staff  1795  8 24 11:11 mypgsql.sql
```

* 导入

```
➜  psql -U reber0ask -d mypgsql -h 127.0.0.1 -p 5432
psql (11.4)
Type "help" for help.

mypgsql=> \c reber
You are now connected to database "reber" as user "reber0ask".
reber=> drop database mypgsql;
DROP DATABASE
reber=> create database mypgsql;
CREATE DATABASE
reber=> \q
➜  psql -U reber0ask -d mypgsql -h 127.0.0.1 -p 5432 -f mypgsql.sql
```

### 0x03 允许远程连接数据库
```
➜  vim  /usr/local/var/postgres/postgresql.conf
listen_addresses = '*'
➜  vim  /usr/local/var/postgres/pg_hba.conf
# TYPE  DATABASE  USER  CIDR-ADDRESS  METHOD
host  all  all 0.0.0.0/0 md5
```

### 0x04 python 简单连接
```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
@Author: reber
@Mail: reber0ask@qq.com
@Date: 2019-08-23 15:45:21
@LastEditTime: 2019-08-23 16:22:02
'''

import psycopg2
import contextlib
from urllib.parse import urlparse

class PgSQLX(object):
    def __init__(self, pgsql_uri):
        super(PgSQLX, self).__init__()
        self.pgsql_uri = pgsql_uri
        self.pgsql_info = self.pgsql_parse_uri()

    def pgsql_parse_uri(self):
        o = urlparse(self.pgsql_uri)
        host = o.hostname
        port = o.port
        user = o.username
        password = o.password
        database = o.path[1:]

        return {
            'host': host,
            'port': port,
            'user': user,
            'password': password,
            'database': database,
        }

    @contextlib.contextmanager
    def init(self):
        dbconn = psycopg2.connect(**self.pgsql_info)
        cursor = dbconn.cursor()
        # dbconn = psycopg2.connect(
        #     host = self.pgsql_info.get('host'),
        #     port = self.pgsql_info.get('port'),
        #     user = self.pgsql_info.get('user'),
        #     password = self.pgsql_info.get('password'),
        #     database = self.pgsql_info.get('database'),
        #     )
        # cursor = dbconn.cursor()

        try:
            yield cursor #这里就是with返回的
        finally:
            dbconn.commit()
            cursor.close()
            dbconn.close()

    def query(self, sql, arg=''):
        try:
            with self.init() as cursor:
                if arg:
                    cursor.execute(sql,arg) #返回受影响行数
                else:
                    cursor.execute(sql)
                result = cursor.fetchall() #返回数据格式是[(),()]
                # result = cursor.fetchone() #返回数据格式是()
                return result
        except Exception as e:
            print(sql,str(e))


if __name__ == '__main__':
    pgsql_uri = "postgresql://reber:3eRa1kBg95D7@59.108.123.123:5432/postgres"
    sqlconn = PgSQLX(pgsql_uri)
    result = sqlconn.query("select * from msg where id=%s",(id,))
    print(result)
```
