+++
title = "SQL Server注入"
topics = ["Pentest"]
tags = ["injection"]
description = "SQL Server注入常见的一些注入手法"
date = "2018-09-04T10:09:17+08:00"
draft = false
+++

### 0x00 基础信息探测
```
@@version
@@SERVERNAME
@@SERVICENAME
ORIGINAL_LOGIN()
SYSTEM_USER
SUSER_NAME()
HOST_NAME()
HOST_ID()
SESSION_USER
CURRENT_USER
USER
USER_NAME()
USER_ID()
USER_SID()
```
