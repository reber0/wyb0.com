+++
date = "2016-06-21T22:30:18+08:00"
description = ""
draft = false
tags = ["注入"]
title = "SQL注入之联合查询"
topics = ["Pentest"]

+++

### 0x00 前提
> ```
要用联合查询进行注入则：页面必须有显示位
```

### 0x01 联合查询
> ```
union可合并两个或多个select语句的结果集，
前提是两个select必有相同列、且各列的数据类型也相同
```

### 0x02 注入步骤
* 找注入点且得到闭合字符
* 判断数据库类型
* 猜解列数，得到显示位
* 得到基本信息(如：数据库名、数据库版本、当前数据库名等)
* 得到数据库名
* 得到表名
* 得到列名
* 得到列值

#### 1. 找到注入点得到闭合字符
> {{% fluid_img src="/img/post/sqli1_get_closed_character.png" alt="找到注入点得到闭合字符" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli1_check_closed_character.png" alt="确认闭合字符" %}}

#### 2. 判断数据库类型
> {{% fluid_img src="/img/post/sqli1_get_type_of_db.png" alt="判断数据库类型" %}}

#### 3. 猜解列数，得到显示位
> {{% fluid_img src="/img/post/sqli1_order_by.png" alt="猜解列数" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli1_get_display_point.png" alt="得到显示位" %}}

#### 4. 得到基本信息(数据库名、版本、数据库版本等)
> {{% fluid_img src="/img/post/sqli1_get_base_msg.png" alt="得到基础信息" %}}

#### 5. 得到数据库
> {{% fluid_img src="/img/post/sqli1_get_db_num.png" alt="得到数据库个数" %}}
<br /><br />
{{% fluid_img src="/img/post/sqli1_get_db_name.png" alt="得到数据库名" %}}

#### 6. 得到security数据库的表名
> {{% fluid_img src="/img/post/sqli1_get_table_name.png" alt="得到security数据库的表名" %}}

#### 7. 猜解列名
> {{% fluid_img src="/img/post/sqli1_get_column_name.png" alt="得到表列名" %}}

#### 8. 猜解数据
> {{% fluid_img src="/img/post/sqli1_get_column_value.png" alt="同时得到用户名和密码" %}}