+++
date = "2016-08-07T21:31:35+08:00"
description = ""
draft = false
tags = ["提权"]
title = "Windows下系统漏洞提权"
topics = ["Pentest"]

+++

提权是在已经getshell但是权限不大的前提下做的
### 0x00 查看基本信息
> {{% fluid_img src="/img/post/privilge_escalation_win_view_msg1.png" alt="Windows系统漏洞提权-查看基本信息1" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_msg2.png" alt="Windows系统漏洞提权-查看基本信息2" %}}

### 0x01 使用cmd执行命令
* 尝试使用cmd执行命令
{{% fluid_img src="/img/post/privilge_escalation_win_try_use_cmd.png" alt="Windows系统漏洞提权-尝试使用cmd执行命令" %}}

* 找可写目录
{{% fluid_img src="/img/post/privilge_escalation_win_find_wirteable_dir.png" alt="Windows系统漏洞提权-找可写目录" %}}

* 尝试上传cmd.exe
{{% fluid_img src="/img/post/privilge_escalation_win_try_upload_cmd.png" alt="Windows系统漏洞提权-尝试上传cmd" %}}

* 写一个aspx马
{{% fluid_img src="/img/post/privilge_escalation_win_write_aspx.png" alt="Windows系统漏洞提权-写一个aspx马" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_aspx.png" alt="Windows系统漏洞提权-查看aspx马" %}}

* 上传cmd.exe
{{% fluid_img src="/img/post/privilge_escalation_win_upload_cmd.png" alt="Windows系统漏洞提权-上传cmd" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_cmd.png" alt="Windows系统漏洞提权-查看上传的cmd" %}}

* 再次尝试使用cmd执行命令
{{% fluid_img src="/img/post/privilge_escalation_win_try_use_cmd_again1.png" alt="Windows系统漏洞提权-再次尝试使用cmd执行命令1" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_try_use_cmd_again2.png" alt="Windows系统漏洞提权-再次尝试使用cmd执行命令2" %}}

### 0x02 权限提升
* 查看未安装补丁
{{% fluid_img src="/img/post/privilge_escalation_win_view_patch.png" alt="Windows系统漏洞提权-查看系统未安装补丁" %}}

* 上传exp提权
{{% fluid_img src="/img/post/privilge_escalation_win_upload_iis6.png" alt="Windows系统漏洞提权-上传iis6" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_run_iis6_1.png" alt="Windows系统漏洞提权-第一次运行iis6" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_run_iis6_2.png" alt="Windows系统漏洞提权-再次运行iis6" %}}

### 0x03 添加用户
* 添加远程连接用户
{{% fluid_img src="/img/post/privilge_escalation_win_use_sys_help_user.png" alt="Windows系统漏洞提权-使用系统自带的帮助用户" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_sys_help_user_add_pwd.png" alt="Windows系统漏洞提权-为系统自带的帮助用户添加密码" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_sys_help_user_add_administrators.png" alt="Windows系统漏洞提权-将系统自带的帮助用户添加到管理员组" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_active_sys_help_user.png" alt="Windows系统漏洞提权-启用系统自带的帮助用户" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_view_sys_help_user.png" alt="Windows系统漏洞提权-查看系统自带的帮助用户现在的权限信息" %}}

### 0x04 使用3389远程连接
> {{% fluid_img src="/img/post/privilge_escalation_win_view_ip.png" alt="Windows系统漏洞提权-查看ip信息" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_remote_connection.png" alt="Windows系统漏洞提权-远程连接" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_remote_connection_input_pwd.png" alt="Windows系统漏洞提权-远程连接输入用户名密码" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_remote_connection_success.png" alt="Windows系统漏洞提权-远程连接成功" %}}