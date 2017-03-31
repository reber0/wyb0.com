+++
date = "2016-07-07T10:39:50+08:00"
description = ""
draft = false
tags = ["server"]
title = "Windows2003下搭建VPN"
topics = ["Windows", "Server"]

+++

## 环境及要求
Windows2003下搭建基于PPTP(点对点隧道协议)的VPN服务器

## 安装服务
{{% fluid_img src="/img/post/build_vpn_install_service1.png" alt="安装vpn服务1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_install_service2.png" alt="安装vpn服务2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_close_firewall.png" alt="关闭防火墙.png" %}}

## 配置并启用路由和远程访问
{{% fluid_img src="/img/post/build_vpn_config_and_start_routing_remote_access1.png" alt="配置并启用路由和远程访问1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_config_and_start_routing_remote_access2.png" alt="配置并启用路由和远程访问2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_config_and_start_routing_remote_access3.png" alt="配置并启用路由和远程访问3.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_config_and_start_routing_remote_access4.png" alt="配置并启用路由和远程访问4.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_config_and_start_routing_remote_access5.png" alt="配置并启用路由和远程访问5.png" %}}

## 新增路由协议
{{% fluid_img src="/img/post/build_vpn_add_routing_protocol1.png" alt="新增路由协议1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_add_routing_protocol2.png" alt="新增路由协议2.png" %}}

## 新增接口
{{% fluid_img src="/img/post/build_vpn_add_interface1.png" alt="新增接口1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_add_interface2.png" alt="新增接口2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_add_interface3.png" alt="新增接口3.png" %}}

## 新增VPN用户
{{% fluid_img src="/img/post/build_vpn_add_vpn_users1.png" alt="新增VPN用户1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_add_vpn_users2.png" alt="新增VPN用户2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_add_vpn_users3.png" alt="新增VPN用户3.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_add_vpn_users4.png" alt="新增VPN用户4.png" %}}

## 尝试连接VPN
{{% fluid_img src="/img/post/build_vpn_try_connect_vpn1.png" alt="尝试连接VPN1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_try_connect_vpn2.png" alt="尝试连接VPN2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/build_vpn_try_connect_vpn3.png" alt="尝试连接VPN3.png" %}}