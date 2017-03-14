+++
date = "2016-07-20T08:30:53+08:00"
description = ""
draft = false
tags = ["虚拟机","vm-tools"]
title = "虚拟机下安装vm-tools"
topics = ["Miscellanea"]

+++

vm-tools安装后可以在客户机和虚拟机间双向复制文件
## 安装
> {{% fluid_img src="/img/post/vm_tools_mount_cd.png" alt="vm-tools挂载光盘.png" %}}
<br /><br />
> {{% fluid_img src="/img/post/vm_tools_copy_and_unzip.png" alt="vm-tools拷贝并解压安装包.png" %}}
<br /><br />
> {{% fluid_img src="/img/post/vm_tools_install.png" alt="vm-tools安装.png" %}}
<br /><br />
> {{% fluid_img src="/img/post/vm_tools_install_complete.png" alt="vm-tools安装完成.png" %}}

## Kali2.0
> 一般安装的话按照上面的步骤即可安装成功，但是Kali2.0不行，可以用如下方法安装：
> {{% fluid_img src="/img/post/vm_tools_kali2.0_install1.png" alt="vm-tools在Kali2.0下的安装1.png" %}}
<br /><br />
> {{% fluid_img src="/img/post/vm_tools_kali2.0_install2.png" alt="vm-tools在Kali2.0下的安装1.png" %}}
```
安装后可以终端输入：dpkg-reconfigure locales，在弹出的界面选择zh_CN.UTF-8设置语言为中文
可以用vim /root/.config/user-dirs.dirs将"桌面"修改为"Desktop"
```