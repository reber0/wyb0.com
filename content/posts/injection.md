+++
date = "2016-06-19T19:40:25+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SQL注入"
topics = ["Pentest"]

+++

### 0x00 含义
sql注入是将代码插入(拼接)到应用(用户)的输入参数中，之后再将这些参数传递给后台的SQL服务器加以解析并执行的攻击，

总结起来就是攻击者将恶意代码拼接到sql语句并加以执行从而得到数据的过程。

### 0x01 成因
SQl语句未对用户参数进行严格过滤

### 0x02 可引发注入的地方
其实只要是客户端可控、参数值代入数据库查询的地方都可能存在注入，常见的如下，按出现频率排序：

* GET
* POST
* X-Forwarded-For
* Cookie
* User-Agent

### 0x03 注入分类
* 根据语法(较权威)
    * UNION query SQL injection(可联合查询注入)  
        只要页面有显示位即可使用，且注入速度很快
    * Error-based SQL injection(报错型注入)  
        没有显示位但用echo "mysql_error()"输出了错误信息，速度很快，但是语句较复杂
    * Boolean-based blind SQL injection(布尔型注入)  
        一次一个字节，速度慢，但只要有注入就能用
    * Time-based blind SQL injection(基于时间延迟注入)  
        超级慢，比布尔型注入慢几倍，但是通用性较强
    * Stacked queries SQL injection(堆叠注入/可多语句查询注入)  
        只有SQL Server可以使用

* 根据类型
    * 整形
    * 字符串型
    * 搜索型

### 0x04 查找注入点
* 在URL中
    * and 1=1/and 1=2(整型)
    * 随即输入(整型)
    * -1/+1 回显上下页面(整型)
    * 单引号(字符型/整型)
    * and sleep(5) (判断页面返回时间)

* 在http头
    * X-Forwarded-For
    * Cookie
    * User-Agent