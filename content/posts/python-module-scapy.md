+++
date = "2016-08-11T23:26:39+08:00"
description = ""
draft = false
tags = ["python", "module"]
title = "Python的scapy模块简单使用"
topics = ["Python"]

+++

### 0x00 简单尝试
> {{% fluid_img src="/img/post/scapy_establish_the_packet.png" alt="尝试构造数据包" %}}

### 0x01 生成一组数据包
> {{% fluid_img src="/img/post/scapy_create_a_set_of_packet.png" alt="生成一组数据包" %}}

### 0x02 发送数据包
* send发送数据包
{{% fluid_img src="/img/post/scapy_send_send_packet.png" alt="用send发送数据包" %}}
* sr1发送数据包
{{% fluid_img src="/img/post/scapy_sr1_send_packet.png" alt="用sr1发送数据包" %}}
* sr发送数据包
{{% fluid_img src="/img/post/scapy_sr_send_packet.png" alt="用sr1发送数据包" %}}

### 0x03 发送SYN数据包
> {{% fluid_img src="/img/post/scapy_sr1_send_syn_packet.png" alt="用sr1发送syn数据包" %}}
<br /><br />
{{% fluid_img src="/img/post/scapy_sr_send_syn_packet.png" alt="用sr发送syn数据包" %}}

### 0x04 得到TCP内容
> {{% fluid_img src="/img/post/scapy_get_tcp_content.png" alt="得到tcp内容" %}}

### 0x05 SYN Scans
> {{% fluid_img src="/img/post/scapy_syn_scan.png" alt="syn扫描" %}}