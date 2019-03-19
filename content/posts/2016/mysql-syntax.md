+++
date = "2016-06-02T11:19:05+08:00"
description = ""
draft = false
tags = ["php", "mysql"]
title = "MySQL语法"
topics = ["Database"]

+++

### 0x00 Select语句的一般语法
```
1.SELECT [ALL|DISTINCT] <目标列表达式> [,<目标列表达式> ]...
2.FROM <表名或视图名> [,<表名或视图名> ]...
3.[ WHERE <行条件表达式> ]
4.[ GROUP BY <列名1> ,[列名2][,...][HAVING组条件表达式] ]
5.[ ORDER BY <列名1> ,[ASC|DESC][,...] ];
```
上面5个句子书写时按顺序，尽量一个句子一行，但在机器内部执行时的顺序是2-3-4-1-5，  
即先确定从哪个数据源查找，  
然后确定过滤条件，  
若有分组则对过滤后的记录进行分组，若分组有限制条件则对分组进一步限制，  
然后将符合条件的列查询出来，  
最后对结果进行排序。
```
select name as '名字',password as '密码' form user;
select * from message where id between 2 and 6;
select * from message where title like '%留言_';  //%匹配任意个字符,_匹配一个字符
select * from message where uid in (2,3,4); //删除2、3、4共3条数据
```

### 0x01 连接查询
`[<表名1>.][<列名1>]  <比较运算符>  [<表名2>.][<列名2>]`  
`[<表名1>.][<列名1>]  BETWEEN  [<表名2>.][<列名2>] AND [<表名2>.][<列名3>]`
```
select * from user,msg where user.id=msg.uid;
select m.id,m.title '标题',m.ip,u.username '名字' from message as m,user as u where m.uid=u.id;
```

### 0x02 子查询
一个SELECT-FROM-WHERE语句成为一个查询块。  
将一个查询块嵌套到另外一个查询块的WHERE子句或HAVING短句条件中的查询成为子查询或嵌套查询，它允许我们根据另一个查询的结果检索数据。  
子查询的方法是由里向外处理，即每个子查询在其上一级查询之前查询，子查询的结果用于建立其副查询的查询条件。
```
select *
from message
where id in (
	select id
    	from users
    	where username='admin'
	);
```

### 0x03 集合查询
集合的并操作：使用UNION运算符经多个SELECT查询结果合并起来，形成一个完整的查询结果，系统合并时会自动去掉重复的元组。  
注意：前后SELECT语句查询的列数要相同。

### 0x04 数据更新
1. 插入数据
    * 插入单个元组：  
    INSERT INTO <表名> [(<属性列1>[,<属性列2>...])]  
    VALUES (<常量1>[,<常量2>]...);  
    * 通过子查询向表中插入多条数据  
    INSERT INTO <表名> [(<属性列1>[,<属性列2>...])]  
    SELECT [(<属性列1>[,<属性列2>...])]  
    FROM <表名>  
    [WHERE 子句]  
    [GROUP BY 子句]  
    [ORDER BY 子句];
    * 通过SELECT INTO语句创建新表并插入多条数据  
    SELECT <列名1>,<列名2>,...<表达式1> as <别名1>,...INTO <表名>  
    FROM <表名1>，<表名2>,...  
    [WHERE 条件表达式]  
    [GROUP BY 子句]  
    [ORDER BY 子句];
2. 修改数据   
	UPDATE <表名>   
	SET <列名1> = <表达式1> [,<列名2> = <表达式2>]...   
    [WHERE <条件>];
3. 删除数据   
    DELETE   
    FROM <表名>   
    [WHERE <条件>]

### 0x05 SQL的数据控制功能
授权语句
```
GRENT <权限1>，[,<权限2>]...  
[ON <对象名>]  
TO <用户1>[,<用户2>],  
[WITH GRANT OPTION];
```
创建用户blog，设密码为666666,并将数据库db_blog的所有权限赋给他  
grant all privileges on db_blog.* to blog@localhost identified by '666666';

### 0x06 order by和limit
```
select * from message order by uid desc;
select * from message order by uid desc limit 5; //默认从0开始，查询5条数据
select * from message order by uid desc limit 2,4;  //从第2条开始查询4条数据
```

### 0x07 统计函数
count()  
sum()  
avg()  
max()  
min()