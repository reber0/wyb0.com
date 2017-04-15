+++
date = "2016-08-23T10:05:52+08:00"
description = ""
draft = false
tags = ["msf"]
title = "Metasploit的简单使用"
topics = ["Pentest"]

+++


### 0x00 启动
> {{% fluid_img src="/img/post/msf_start.png" alt="启动msf" %}}

### 0x01 Metasploit的工作平台
> 在msf里的工作平台可以保存历史的一些操作信息
{{% fluid_img src="/img/post/msf_workspace_h.png" alt="msf工作平台的帮助信息" %}}
<br /><br />
{{% fluid_img src="/img/post/msf_workspace.png" alt="创建新的工作平台" %}}

### 0x02 使用db_nmap扫描主机
> {{% fluid_img src="/img/post/msf_nmap_lanou3g_ip.png" alt="扫描lanou3g的ip信息" %}}
<br /><br />
#### 扫描后的结果会保留在工作平台中，可以用hosts和services进行查看：
{{% fluid_img src="/img/post/msf_hosts.png" alt="查看主机列表" %}}
<br /><br />
{{% fluid_img src="/img/post/msf_services.png" alt="查看服务" %}}

### 0x03 使用msf的模块进行弱口令爆破
> #### 注：这里针对ftp服务进行弱口令测试
{{% fluid_img src="/img/post/msf_services_p_21.png" alt="查看都有那个主机开启了21端口" %}}
<br /><br />
{{% fluid_img src="/img/post/msf_search_module.png" alt="查找用于ftp爆破的模块" %}}
<br /><br />
{{% fluid_img src="/img/post/msf_use_module_and_set.png" alt="使用模块并设置参数" %}}
<br /><br />
{{% fluid_img src="/img/post/msf_use_show_options.png" alt="查看设置的参数" %}}
<br /><br />
{{% fluid_img src="/img/post/msf_start_attack_ftp.png" alt="开始攻击" %}}
#### 使用vulns可以查看结果：msf auxiliary(ftp_login) > vulns 