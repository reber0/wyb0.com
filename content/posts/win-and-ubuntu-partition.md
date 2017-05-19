+++
date = "2016-05-31T23:35:06+08:00"
description = ""
draft = false
tags = ["操作系统"]
title = "win/ubuntu双系统分区设置"
topics = ["Windows", "Linux"]

+++

## win10和ubuntu双系统分区设置
1. 硬盘采用uefi格式
2. 硬盘首部留400M空间，是FAT16的格式，用来存放win的引导信息
3. 在硬盘末尾给ubuntu划分50G左右空间
4. ubuntu的/分区，格式为ext4，空间为40G
5. ubuntu的/home分区，格式为ext4，空间为10G
6. ubuntu的/boot分区，格式为ext4,空间为200M
7. ubuntu的/swap分区，格式为swap，空间为200M
8. ubuntu的引导分区为/boot

{{% fluid_img src="/img/post/hard_disk_partition1.png" alt="双系统磁盘分区" %}}
&nbsp;
{{% fluid_img src="/img/post/hard_disk_partition2.png" alt="双系统磁盘分区" %}}