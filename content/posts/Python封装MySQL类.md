+++
date = "2016-09-12T22:54:28+08:00"
description = ""
draft = false
tags = ["python", "mysql"]
title = "Python封装MySQL类"
topics = ["Python", "MySQL"]

+++

### 0x00 安装
> 下载[MySQL-python-1.2.3.win-amd64-py2.7.exe](http://www.codegood.com/archives/129)然后安装

### 0x01 简单表设计如下
> ```
insert into mysql.user(Host,User,Password) values('%','python','123456');

drop database if exists python;
create database python;
use python;

create table msg(
id int not null auto_increment primary key,
ip varchar(40) not null,
domain varchar(100) not null
);

grant all privileges on python.* to 'python'@'%' identified by '123456';
flush privileges;
```

### 0x02 代码
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import MySQLdb

class mysql(object):
    """docstring for mysql"""
    def __init__(self, dbconfig):
        self.host = dbconfig['host']
        self.port = dbconfig['port']
        self.user = dbconfig['user']
        self.passwd = dbconfig['passwd']
        self.dbname = dbconfig['dbname']
        self.charset = dbconfig['charset']
        self._conn = None
        self._connect()
        self._cursor = self._conn.cursor()

    def _connect(self):
        try:
            self._conn = MySQLdb.connect(host=self.host,
                port = self.port,
                user=self.user,
                passwd=self.passwd,
                db=self.dbname,
                charset=self.charset)
        except MySQLdb.Error,e:
            print e
            
    def query(self, sql):
        try:
            result = self._cursor.execute(sql)
        except MySQLdb.Error, e:
            print e
            result = False
        return result

    def select(self, table, column='*', condition=''):
        condition = ' where ' + condition if condition else None
        if condition:
            sql = "select %s from %s %s" % (column,table,condition)
        else:
            sql = "select %s from %s" % (column,table)
        self.query(sql)
        return self._cursor.fetchall()

    def insert(self, table, tdict):
        column = ''
        value = ''
        for key in tdict:
            column += ',' + key
            value += "','" + tdict[key]
        column = column[1:]
        value = value[2:] + "'"
        sql = "insert into %s(%s) values(%s)" % (table,column,value)
        try:
            self._cursor.execute(sql)
            self._conn.commit()
        except:
            self.rollback()
        return self._cursor.lastrowid #返回最后的id

    def update(self, table, tdict, condition=''):
        if not condition:
            print "must have id"
            exit()
        else:
            condition = 'where ' + condition
        value = ''
        for key in tdict:
            value += ",%s='%s'" % (key,tdict[key])
        value = value[1:]
        sql = "update %s set %s %s" % (table,value,condition)
        try:
            self._cursor.execute(sql)
        except:
            self.rollback()
        return self.affected_num() #返回受影响行数

    def delete(self, table, condition=''):
        condition = 'where ' + condition if condition else None
        sql = "delete from %s %s" % (table,condition)
        try:
            self._cursor.execute(sql)
            self._conn.commit()
        except:
            self.rollback()
        return self.affected_num() #返回受影响行数

    def rollback(self):
        self._conn.rollback()

    def affected_num(self):
        return self._cursor.rowcount

    def __del__(self):
        try:
            self._cursor.close()
            self._conn.close()
        except:
            pass

    def close(self):
        self.__del__()

if __name__ == '__main__':
    dbconfig = {
        'host':'192.168.188.134',
        'port':3306,
        'user':'python',
        'passwd':'123456',
        'dbname':'python',
        'charset':'utf8'
    }
    db = mysql(dbconfig)

    # print db.select('msg','id,ip,domain')
    # print db.select('msg','id,ip,domain','id>2')
    # print db.affected_num()

    # tdict = {
    #     'ip':'111.13.100.91',
    #     'domain':'baidu.com'
    # }
    # print db.insert('msg', tdict)
    
    # tdict = {
    #     'ip':'111.13.100.91',
    #     'domain':'aaaaa.com'
    # }
    # print db.update('msg', tdict, 'id=5')

    # print db.delete('msg', 'id>3')

    db.close()
```