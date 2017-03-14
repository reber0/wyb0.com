+++
date = "2016-06-13T09:14:45+08:00"
description = ""
draft = false
tags = ["shadowsocks","ubuntu"]
title = "Ubuntu下使用ShadowSocks"
topics = ["Miscellanea"]

+++

#### 环境：
ubuntu14.4

## 安装shadowsocks-qt5
```sh
sudo add-apt-repository ppa:hzwhuang/ss-qt5（添加源）
sudo apt-get update （更新你的软件库）
sudo apt-get install shadowsocks-qt5 (正式安装)
```

## 配置客户端
{{% fluid_img src="/img/post/ss_open_client.png" alt="打开shadowsocks客户端" %}}

{{% fluid_img src="/img/post/ss_add_config.png" alt="shadowsocks添加配置" %}}

{{% fluid_img src="/img/post/ss_config.png" alt="配置shadowsocks" %}}

{{% fluid_img src="/img/post/ss_connection.png" alt="连接shadowsocks" %}}

## 配置火狐
{{% fluid_img src="/img/post/firfox_config_agent.png" alt="火狐配置代理" %}}

## 访问YouTube
{{% fluid_img src="/img/post/ss_go_youtube.png" alt="访问YouTube" %}}
