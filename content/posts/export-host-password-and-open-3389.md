+++
date = "2016-08-08T08:28:27+08:00"
description = ""
draft = false
tags = ["elevate privileges"]
title = "导出主机密码与开启3389"
topics = ["Pentest"]

+++


### 0x00 导出主机密码hash
* 条件
    * administrator以上权限
* 工具
    * wce
    * gethash
    * hashdump
* hash解密网站  
    * http://www.objectif-securite.ch/ophcrack.php
* 上传工具得到hash
{{% fluid_img src="/img/post/privilge_escalation_win_view_whoami.png" alt="查看是否为管理员以上权限" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_upload_wce.png" alt="上传wce" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_get_hash.png" alt="得到hash" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_get_pwd.png" alt="解出密码" %}}


### 0x01 导出主机密码
* 条件
    * administrator以上权限
    * 当前管理员没有注销登陆(可以通过query user命令看出)
* 工具
    * mimikatz
    * getpass
* 上传工具得到密码
{{% fluid_img src="/img/post/privilge_escalation_win_view_whoami.png" alt="查看是否为管理员以上权限" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_query_user.png" alt="查看管理员是否注销登陆" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_upload_getpass.png" alt="上传getpass" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_getpass1.png" alt="得到密码1" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_getpass2.png" alt="得到密码2" %}}

### 0x02 开启3389
* 直接使用注册表
{{% fluid_img src="/img/post/privilge_escalation_win_new_file_3389_reg.png" alt="新建开3389的注册表" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_open_3389.png" alt="开3389端口" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_open_3389_success.png" alt="成功开启3389端口" %}}

* 写一个批处理也行
```
# 3389.bat内容如下：
echo Windows Registry Editor Version 5.00>>3389.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server]>>3389.reg 
echo "fDenyTSConnections"=dword:00000000>>3389.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\Wds\rdpwd\Tds\tcp]>>3389.reg 
echo "PortNumber"=dword:00000d3d>>3389.reg 
echo [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp]>>3389.reg 
echo "PortNumber"=dword:00000d3d>>3389.reg 
regedit /s 3389.reg 
del 3389.reg
del 3389.bat
```
{{% fluid_img src="/img/post/privilge_escalation_win_new_file_3389_bat.png" alt="新建开3389的注册表" %}}