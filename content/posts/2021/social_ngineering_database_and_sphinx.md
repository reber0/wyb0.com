---
title: 通过 Sphinx 快速查询数据
date: 2021-06-10 16:44:23
description: 搭建社工库，通过 Sphinx 快速查询数据
categories:
  - Pentest
tags:
  - tools
  - 社工
---

### 0x00 Sphinx
Sphinx 是一款基于 SQL 的高性能全文检索引擎，Sphinx 的性能在众多全文检索引擎中也是数一数二的，利用 Sphinx我们可以完成比数据库本身更专业的搜索功能，而且可以有很多针对性的性能优化。

* 快速创建索引：3 分钟左右即可创建近 100 万条记录的索引，并且采用了增量索引的方式，重建索引非常迅速。
* 闪电般的检索速度：尽管是 1 千万条的大数据量，查询数据的速度也在毫秒级以上，2-4G 的文本量中平均查询速度不到 0.1 秒。
* 为很多脚本语言设计了检索 API，如 PHP,Python,Perl,Ruby 等，因此你可以在大部分编程应用中很方便地调用 Sphinx 的相关接口。
* 为 MySQL 设计了一个存储引擎插件，因此如果你在 MySQL 上使用 Sphinx，那简直就方便到家了。
* 支持分布式搜索，可以横向扩展系统性能。

### 0x01 使用 Sphinx 查询的流程
* 通过 Sphinx 的 indexer 生成索引（需要先配置文件 sphinx.conf）

部分索引：indexer.exe -c sphinx.conf index_3pk_com_member

全部索引：C:\Apps\sphinx\bin\indexer.exe -c C:\Apps\sphinx\etc\sphinx.conf -\-all

若此时searchd守护进程已经启动，那么需要加上 -\-rotate参数：
C:\Apps\sphinx\bin\indexer.exe -c C:\Apps\sphinx\etc\sphinx.conf -\-all -\-rotate

* Sphinx 启动一个 searchd 进行监听（调接口）

C:\Apps\sphinx\bin\searchd.exe -c c:\Apps\sphinx\etc\sphinx.conf

* 查询时把关键字给 Sphinx 的接口，searchd 返回 id

searchd 返回的 id 是该关键字在数据库中对应的 id

* 在数据库中根据 id 查数据

### 0x02 Sphinx 配置文件编写


下面索引了两个库中的两个表

一个是 37wan_com 库的 cdb_members、cdb_uc_members 表，索引的 username,email 这两列

一个是 3pk_com 库的 member 表，索引的 uname,email 这两列

```
source s_37wan_com_cdb_members
{
    type = mysql

    sql_host = 127.0.0.1
    sql_user = root
    sql_pass = root
    sql_db   = 37wan_com # 需要建索引的数据库名字
    sql_port = 3306

    sql_query_pre = SET NAMES utf8 # 定义查询时的编码
    # 设置要做索引的字段，包含至少一个唯一主键，这里 sphinx 会索引 username,email 这两个字段
    sql_query = select id,username,email from cdb_members
}
index index_37wan_com_cdb_members
{
    source = s_37wan_com_cdb_members # 这里与上面的source对应
    path = C:/Users/reber/Desktop/sgk/sphinx_data/index/index_37wan_com_cdb_members # 索引文件存放路径及索引的文件名
    min_word_len = 1 # 最小索引词长度,小于这个长度的词不会被索引
    min_prefix_len = 3 # 最小前缀(3)，搜索 abc* 得到 abc123、abcdiek、abc999
    min_infix_len = 3 # 最小中缀(3)，搜索 *aaa* 得到 cdaaa、384aaa938、aaa373
    ngram_len = 1 # 对于非字母型数据的长度切割，如果要搜索中文则指定为1，搜 丰 得到 张丰、邓丰至、丰年
    ngram_chars = U+3000..U+2FA1F # 需要分词的字符,如果要搜索中文,打开这行
    html_strip = 0 # html标记清理,是否从输出全文数据中去除HTML标记
}

source s_37wan_com_cdb_uc_members
{
    type = mysql

    sql_host = 127.0.0.1
    sql_user = root
    sql_pass = root
    sql_db   = 37wan_com
    sql_port = 3306

    sql_query_pre = SET NAMES utf8
    sql_query = select id,username,email from cdb_uc_members
}
index index_37wan_com_cdb_uc_members
{
    source = s_37wan_com_cdb_uc_members
    path = C:/Users/reber/Desktop/sgk/sphinx_data/index/index_37wan_com_cdb_uc_members
    min_word_len = 1
    min_prefix_len = 3
    min_infix_len = 3
    ngram_len = 1
    ngram_chars = U+3000..U+2FA1F
    html_strip = 0
}

source s_3pk_com_member
{
    type = mysql

    sql_host = 127.0.0.1
    sql_user = root
    sql_pass = root
    sql_db   = 3pk_com
    sql_port = 3306

    sql_query_pre = SET NAMES utf8
    sql_query = select id,email,uname as username from member
}
index index_3pk_com_member
{
    source = s_3pk_com_member
    path = C:/Users/reber/Desktop/sgk/sphinx_data/index/index_3pk_com_member
    min_word_len = 1
    min_prefix_len = 3
    min_infix_len = 3
    ngram_len = 1
    ngram_chars = U+3000..U+2FA1F
    html_strip = 0
}


indexer
{
    mem_limit = 512M # 用来构建索引的索引器运行所占用的内存
}
searchd
{
    listen = 23333 # 查询服务监听的端口 netstat -anop|grep 23333
    listen = 3333:mysql41 # mysql -h localhost -P 3333; show tables 会显示生成的索引
    log = C:/Users/reber/Desktop/sgk/sphinx_data/log/search_sphinx.log # 相关日志的存放位置
    query_log = C:/Users/reber/Desktop/sgk/sphinx_data/log/query_sphinx.log
    pid_file = C:/Users/reber/Desktop/sgk/sphinx_data/searchd_sphinx.pid

    read_timeout = 5 # 请求超时(5)
    max_children = 30 # 并行执行搜索的数目
    max_matches= 1000 # 查询结果的最大返回数
    seamless_rotate = 1 # 是否支持无缝切换，做增量索引时通常需要，比如 searched 已经开启，需要新增一个数据库的索引
    preopen_indexes = 1 # 索引预开启，在启动运行时是否提前加载所有索引文件
    unlink_old = 1 # 索引轮换成功之后是否释放旧的索引文件
    workers = threads # for RT to work 多处理模式（MPM）。 可选项；可用值为none、fork、prefork，以及threads。 默认在Unix类系统为form，Windows系统为threads。
}
```

### 0x03 Sphinx 索引
* 生成索引

```
C:\Users\reber\Desktop\sgk\sgk_web> C:\Users\reber\Desktop\sgk\sphinx\bin\indexer.exe -c C:\Users\reber\Desktop\sgk\sphinx\etc\sphinx.conf --all
Sphinx 3.3.1 (commit b72d67bc)
Copyright (c) 2001-2020, Andrew Aksyonoff
Copyright (c) 2008-2016, Sphinx Technologies Inc (http://sphinxsearch.com)

using config file 'C:\Users\reber\Desktop\sgk\sphinx\etc\sphinx.conf'...
indexing index 'index_37wan_com_cdb_members'...
collected 34219 docs, 0.8 MB
sorted 0.1 Mhits, 100.0% done
total 34219 docs, 835.3 Kb
total 0.4 sec, 1.915 Mb/sec, 78452 docs/sec
indexing index 'index_37wan_com_cdb_uc_members'...
collected 34219 docs, 0.8 MB
sorted 0.1 Mhits, 100.0% done
total 34219 docs, 835.2 Kb
total 0.4 sec, 2.048 Mb/sec, 83899 docs/sec
indexing index 'index_3pk_com_member'...
collected 10007 docs, 0.3 MB
sorted 0.0 Mhits, 100.0% done
total 10007 docs, 258.6 Kb
total 0.2 sec, 1.707 Mb/sec, 66041 docs/sec
```

* 启动 searchd 守护进程

```
C:\Users\reber\Desktop\sgk\sgk_web>C:\Users\reber\Desktop\sgk\sphinx\bin\searchd.exe -c C:\Users\reber\Desktop\sgk\sphinx\etc\sphinx.conf
Sphinx 3.3.1 (commit b72d67bc)
Copyright (c) 2001-2020, Andrew Aksyonoff
Copyright (c) 2008-2016, Sphinx Technologies Inc (http://sphinxsearch.com)

using config file 'C:\Users\reber\Desktop\sgk\sphinx\etc\sphinx.conf'...
listening on all interfaces, port=23333
listening on all interfaces, port=3333
precaching index 'index_37wan_com_cdb_members'
precaching index 'index_37wan_com_cdb_uc_members'
precaching index 'index_3pk_com_member'
precached 3 indexes using 3 threads in 0.0 sec
accepting connections
```

### 0x04 Sphinx 使用
```py
import pymysql
from sphinxapi import *

limit = 200
sphinx = SphinxClient()
sphinx.SetServer("localhost", 23333) # 设置连接 sphinx 的 searched
sphinx.SetConnectTimeout(5.0)
sphinx.SetLimits(0, limit, max(limit,1000))

sgk_conf = [
    {
        "index": "index_37wan_com_cdb_members",
        "db_name": "37wan_com",
        "table_name": "cdb_members",
        "columns": "id,username,password,email"
    },
    {
        "index": "index_37wan_com_cdb_uc_members",
        "db_name": "37wan_com",
        "table_name": "cdb_uc_members",
        "columns": "id,username,password,email,salt"
    },
    {
        "index": "index_3pk_com_member",
        "db_name": "3pk_com",
        "table_name": "member",
        "columns": "id,email,uname as username,password"
    }
]

for index_dict in sgk_conf:
    index = index_dict.get("index")
    db_name = index_dict.get("db_name")
    table_name = index_dict.get("table_name")
    columns = index_dict.get("columns")

    res = sphinx.Query("abcde", index) # 从 sphinx 得到匹配到的结果
    if res and res["total_found"]:
        ids = [str(x["id"]) for x in res["matches"]]
        ids = ",".join(ids)

        sql = "select {} from {} where id in({})".format(columns, table_name, ids)
        sqlconn = pymysql.connect("localhost","testuser","test123","TESTDB")
        cursor = sqlconn.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()
        sqlconn.close()
```
