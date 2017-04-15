+++
date = "2016-08-13T23:53:39+08:00"
description = ""
draft = false
tags = ["burpsuite"]
title = "BurpSuite抓手机包"
topics = ["Pentest"]

+++

### 0x00 环境设置
> Windows Phone手机和电脑处于同一无线环境下：
{{% fluid_img src="/img/post/burpsuite_pc_ip.png" alt="PC机的ip" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_ip_set.png" alt="IP设置" %}}

### 0x01 BurpSuite设置
> {{% fluid_img src="/img/post/burpsuite_set_phone_proxy1.png" alt="设置burpsuite抓8888端口的包1" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_set_phone_proxy2.png" alt="设置burpsuite抓8888端口的包2" %}}

### 0x02 抓HTTP包
> {{% fluid_img src="/img/post/burpsuite_phone_visit_internet.png" alt="手机访问网络" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_get_phone_packet.png" alt="burpsuite抓手机包" %}}

### 0x03 抓HTTPS包
* 挂burpsuite的代理下载证书
{{% fluid_img src="/img/post/burpsuite_down_ca1.png" alt="下载证书1" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_down_ca2.png" alt="下载证书2" %}}
<br /><br />
* 把证书上传到你自己的服务器上(也可以本地搭建网站)，然后手机访问证书  
安卓手机修改证书后缀为crt，证书可以放在网站上，也可以直接拖到手机上，然后安装
{{% fluid_img src="/img/post/burpsuite_phone_install_ca.png" alt="手机安装证书" %}}
* 抓https数据包
{{% fluid_img src="/img/post/burpsuite_get_https_packet1.png" alt="手机访问https链接" %}}
<br /><br />
{{% fluid_img src="/img/post/burpsuite_get_https_packet2.png" alt="burpsuite抓https包" %}}