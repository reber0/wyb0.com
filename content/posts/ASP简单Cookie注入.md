+++
date = "2015-12-04T19:42:19+08:00"
description = ""
draft = false
tags = ["asp", "cookie", "注入"]
title = "ASP简单Cookie注入"
topics = ["Pentest"]

+++

## Cookie注入的使用
* 三大Web提交方式  
    * GET：直接在浏览器上面访问地址  
    * POST：提交表单(会员注册、文件上传等)  
    * COOKIE：访问网站下面自带的身份验证的值

* Cookie注入利用时机  
当用普通注入时，采用and 1=1时出现错误提示(如下图)，普通的注入就没办法了，可以尝试大小写，编码等绕过，若过滤严谨，无法绕过，这时就可以采用cookie注入。
{{% fluid_img src="/img/post/cookie_injection_conditions.png" alt="Cookie注入条件.png" %}}

* 利用方法
    * 可以利用注入中转
    * 可以利用sqlmap

## 用注入中转进行Cookie注入
* 目标：http://localhost:81/2/shownews.asp?id=183  
* 打开注入中转这个工具，填入相应参数，然后点击生成ASP，将生成的asp文件(jmCook.asp)放入你自己搭建的网站内后即可进行注入
{{% fluid_img src="/img/post/cookie_injection_create_asp.png" alt="注入中转生成asp文件.png" %}}
* 提交localhost:81/jmCook.asp?jmdcw=183 order by猜测字段数  
* 提交localhost:81/jmCook.asp?jmdcw=183 UNION SELECT 1,2,3,4 from XXX猜测表名
{{% fluid_img src="/img/post/cookie_injection_get_display_point.png" alt="得到显示位.png" %}}
* 猜测内容
{{% fluid_img src="/img/post/cookie_injection_get_content.png" alt="得到数据.png" %}}

## 用sqlmap进行Cookie注入
* sqlmap验证存在Cookie注入
{{% fluid_img src="/img/post/cookie_injection_sqlmap_test1.png" alt="sqlmap验证存在漏洞1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/cookie_injection_sqlmap_test2.png" alt="sqlmap验证存在漏洞2.png" %}}

* 猜表名
{{% fluid_img src="/img/post/cookie_injection_sqlmap_get_table_name1.png" alt="sqlmap猜表名1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/cookie_injection_sqlmap_get_table_name2.png" alt="sqlmap猜表名2.png" %}}

* 猜列名
{{% fluid_img src="/img/post/cookie_injection_sqlmap_get_column_name1.png" alt="sqlmap猜列名1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/cookie_injection_sqlmap_get_column_name2.png" alt="sqlmap猜列名2.png" %}}

* 猜字段内容
{{% fluid_img src="/img/post/cookie_injection_sqlmap_get_column_value1.png" alt="sqlmap猜字段内容1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/cookie_injection_sqlmap_get_column_value2.png" alt="sqlmap猜字段内容2.png" %}}