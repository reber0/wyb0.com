+++
date = "2016-08-10T11:46:13+08:00"
description = ""
draft = false
tags = ["ssh"]
title = "Linux下SSH连接"
topics = ["Linux"]

+++

### 0x00 SSH相关选项
> ```
-V 显示版本
-f 输入密码后进入后台模式
-N 不执行远程命令，用于端口转发
-D socket5代理
-L tcp转发
-C 使用数据压缩，网速快时会影响速度
```

### 0x01 SSH免密码登陆
> A主机免密码登陆B主机：
```
A主机运行：
    ssh-keygen -t rsa
    会生成两个文件~/.ssh/id_rsa和~/.ssh/id_rsa.pub
    将id_rsa.pub中的内容复制到B主机的~/.ssh/authorized_keys中
注：
    要确保B主机~/.ssh/authorized_keys权限为600
    要确保B主机~/.ssh/文件夹权限为700
    要确保上述两个文件属主是当前用户
```
{{% fluid_img src="/img/post/ssh_no_pwd_login_create_keys.png" alt="A主机生成密钥对.png" %}}
<br /><br />
{{% fluid_img src="/img/post/ssh_no_pwd_login_write_pub_key_to_b.png" alt="将A主机产生的公钥写入B主机.png" %}}
<br /><br />
{{% fluid_img src="/img/post/ssh_no_pwd_login_check_authorized_keys_permissions.png" alt="检查B主机authorized_keys权限.png" %}}
<br /><br />
{{% fluid_img src="/img/post/ssh_no_pwd_login_a_login_b.png" alt="A主机免密码登陆主机B.png" %}}

### 0x02 SSH反向连接
> 主机A要通过SSH连接主机B：
````
B上先运行：
ssh -NfR 8888:localhost:22 reber@A-IP
输入主机A的用户reber的密码后即可在A主机监听一个8888端口，它与主机B的22端口绑定
````
{{% fluid_img src="/img/post/ssh_reverse_conn_b_run_command.png" alt="主机B反向连接主机A.png" %}}
````
A主机运行：
ssh root@127.0.0.1 -p 8888
输入本机的root的密码即可登入主机B的root用户
````
{{% fluid_img src="/img/post/ssh_reverse_conn_a_run_command.png" alt="主机A连接主机B.png" %}}

### 0x03 SSH Socks5代理
> {{% fluid_img src="/img/post/ssh_socks5_proxy_set.png" alt="设置ssh socks5.png" %}}
<br /><br />
{{% fluid_img src="/img/post/ssh_socks5_proxy_set_firefox.png" alt="设置ssh socks5.png" %}}
<br /><br />
{{% fluid_img src="/img/post/ssh_socks5_proxy_firefox_internet.png" alt="火狐通过代理可以上网.png" %}}