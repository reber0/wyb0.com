+++
date = "2016-07-13T09:22:39+08:00"
description = ""
draft = false
tags = ["wireless"]
title = "无线下ettercap做中间人攻击"
topics = ["Pentest"]

+++

## 场景
攻击主机和被攻击主机在一个无线下面

## 开始攻击
#### 1. 打开ettercap
> {{% fluid_img src="/img/post/wireless_start_ettercap.png" alt="无线网络渗透测试打开ettercap.png" %}}

#### 2. 查看host列表
> 在软件的图形化界面点击sniff，选择unified sniffing选择网卡，然后单击hosts选项，选择scan for host，然后选择host list
> {{% fluid_img src="/img/post/wireless_ettercap_see_host_list.png" alt="无线网络渗透测试ettercap查看host列表.png" %}}

#### 3. 选定攻击目标
> 选择192.168.1.116的IP地址，点击Add to Target 1,然后选择网关的IP地址192.168.1.1，点击Add to Target 2
> {{% fluid_img src="/img/post/wireless_ettercap_add_target.png" alt="无线网络渗透测试ettercap添加攻击目标.png" %}}

#### 4. 开始攻击
> ettercap选择"mitm"—"arp poisoning"—"Sniff remote connections"— "确定"，然后再在被攻击端查看arp，可知攻击已经成功
> {{% fluid_img src="/img/post/wireless_ettercap_attack.png" alt="无线网络渗透测试ettercap开始攻击.png" %}}

#### 5. ettercap持续监听目标
> 软件上开始监听，被攻击端用浏览器登录路由器
> {{% fluid_img src="/img/post/wireless_ettercap_get_msg.png" alt="无线网络渗透测试ettercap监听到目标用户的账号和密码.png" %}}

#### 6. 得到Cookie
> 点击主界面的"View" —  "connetcions" 可以查看被攻击主机的一些网络链接
> {{% fluid_img src="/img/post/wireless_ettercap_view_conn_msg.png" alt="无线网络渗透测试ettercap查看目标用户的网络连接信息.png" %}}

> {{% fluid_img src="/img/post/wireless_ettercap_get_cookie.png" alt="无线网络渗透测试ettercap目标用户的Cookie.png" %}}

#### 7. 用cookie登陆被入侵账户
> 打开火狐浏览器，通过firebug插件添加截获到的cookie从而登陆账户
> {{% fluid_img src="/img/post/wireless_firebug_add_cookie.png" alt="无线网络渗透测试用firebug添加目标用户的Cookie.png" %}}

> {{% fluid_img src="/img/post/wireless_firebug_sign_success.png" alt="无线网络渗透测试用目标用户的Cookie成功登陆新浪博客.png" %}}