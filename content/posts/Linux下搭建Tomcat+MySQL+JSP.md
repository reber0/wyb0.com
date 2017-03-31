+++
date = "2016-06-17T23:08:05+08:00"
description = ""
draft = false
tags = ["server"]
title = "Linux下搭建Tomcat+MySQL+JSP"
topics = ["Server"]

+++

```
安装环境为：CentOS-6.5-x86_64-minimal
```

## 安装mysql  
sudo yum install mysql mysql-server mysql-devel  

{{% fluid_img src="/img/post/install_mysql.png" alt="安装mysql.png" %}}<br />

{{% fluid_img src="/img/post/creat_db_tomcat.png" alt="创建数据库tomcat.png" %}}<br />

{{% fluid_img src="/img/post/grant_db_tomcat.png" alt="将数据库tomcat分配给用户tomcat.png" %}}

## 安装jdk和tomcat
1. 创建安装jdk和tomcat的文件夹
{{% fluid_img src="/img/post/mkdir_java_tomcat.png" alt="创建安装jdk和tomcat的文件夹.png" %}}

2. 下载安装包并解压安装  
jdk包可在http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html 下载  
tomcat包可在http://mirrors.cnnic.cn/apache/tomcat/tomcat-8/v8.0.36/bin/apache-tomcat-8.0.36.tar.gz 下载
{{% fluid_img src="/img/post/download_tomcat.png" alt="下载tomcat安装包.png" %}}  
<br />
{{% fluid_img src="/img/post/cp_jdk_tomcat_to_opt.png" alt="复制解压后的安装包到/opt下对应目录.png" %}}  
<br />
{{% fluid_img src="/img/post/add_java_env.png" alt="为java添加环境变量.png" %}}  
<br />
{{% fluid_img src="/img/post/java_version.png" alt="验证jdk是否设置成功.png" %}}

## 简单配置tomcat
{{% fluid_img src="/img/post/config_tomcat.png" alt="简单配置tomcat1.png" %}}

## 启动tomcat
{{% fluid_img src="/img/post/start_tomcat.png" alt="启动tomcat.png" %}}

{{% fluid_img src="/img/post/see_tomcat_index.png" alt="访问tomcat主页.png" %}}

## 连接数据库
驱动可在http://dev.mysql.com/downloads/connector/j/ 下载
{{% fluid_img src="/img/post/tomcat_copy_mysql_driver.png" alt="复制数据库驱动.png" %}}
[reber@WYB ~]$ vim /opt/tomcat/apache-tomcat-8.0.36/webapps/ROOT/a.jsp
```jsp
<%@page contentType="text/html;charset=utf-8" import="java.sql.*" %>
<%
	String driver = "com.mysql.jdbc.Driver"; 
	String url = "jdbc:mysql://localhost:3306/tomcat"; //数据库web
	String user = "tomcat"; 
	String password = "123456"; 
	try { 
		Class.forName(driver); 
		Connection conn = DriverManager.getConnection(url, user, password);

		if(!conn.isClosed()) 
		    out.println("数据库连接成功！"); 
		conn.close(); 
	} 
	catch(ClassNotFoundException e) { 
	    out.println("找不到驱动程序"); 
	    e.printStackTrace(); 
	} 
	catch(SQLException e) { 
	    e.printStackTrace(); 
	} 
%>

```
{{% fluid_img src="/img/post/tomcat_conn_mysql.png" alt="连接数据库.png" %}}