+++
date = "2016-08-03T15:52:26+08:00"
description = ""
draft = false
tags = ["越权"]
title = "Redis未授权访问漏洞"
topics = ["Pentest"]

+++

### 0x00 Redis的未授权访问
> ```
若Redis服务器对公网开放，且未启用认证，则攻击者可以未授权访问服务器。
若Redis以root身份运行，黑客可以给root账户写入SSH公钥文件，通过SSH登录受害服务器。
```

### 0x01 向Redis服务器上传SSH公钥
> {{% fluid_img src="/img/post/redis_unauthorized_access_create_keys.png" alt="本地生成SSH密钥对" %}}
<br /><br />
{{% fluid_img src="/img/post/redis_unauthorized_access_export_pubkey.png" alt="本地生成SSH密钥对" %}}
<br /><br />
{{% fluid_img src="/img/post/redis_unauthorized_access_write_pubkey.png" alt="将本地生成的公钥写到对方服务器上" %}}
<br /><br />
{{% fluid_img src="/img/post/redis_unauthorized_access_use_sshkey_login.png" alt="本地通过私钥登陆对方服务器" %}}

### 0x02 通过计划任务反弹shell
> {{% fluid_img src="/img/post/redis_unauthorized_access_write_cron.png" alt="通过Redis向对方服务器写计划任务反弹shell" %}}
<br /><br />
{{% fluid_img src="/img/post/redis_unauthorized_access_listen_port.png" alt="本地监听服务器反弹的那个端口" %}}