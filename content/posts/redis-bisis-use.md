+++
date = "2016-08-03T11:02:20+08:00"
description = ""
draft = false
tags = ["redis"]
title = "Redis的使用"
topics = ["Database"]

+++

### 0x00 连接Redis
```cs
# 客户端连接
$ redis-cli

# 连接远程redis
$ redis-cli -h host -p port -a password

# 查看所有键值
127.0.0.1:6379> keys *

# 选择数据库
127.0.0.1:6379> select 0 #可以选择0～15

# 获取redis安装目录
127.0.0.1:6379> config get dir
1) "dir"
2) "/var/lib/redis"

# 备份(恢复数据时只需要将备份文件放在redis安装目录即可)
127.0.0.1:6379> save
OK
127.0.0.1:6379> exit
```

### 0x01 数据类型
* String(字符串)
    * string是redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。
    * string类型是二进制安全的。意思是redis的string可以包含任何数据。比如jpg图片或者序列化的对象 。
    * string类型是Redis最基本的数据类型，一个键最大能存储512MB。 
* Hash(哈希)
    * Redis hash 是一个键名对集合。
    * Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。
* List(列表)
    * Redis 列表是简单的字符串列表，按照插入顺序排序。
    * 可以添加一个元素到列表的头部（左边）或者尾部（右边）。
* Set(集合)
    * Redis的Set是string类型的无序集合。
    * 集合内元素是唯一的，后者会覆盖前者。
    * 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。
* zset(有序集合)
    * Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
    * zset每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
    * zset的成员是唯一的,但分数(score)却可以重复。

### 0x02 String
```cs
# 添加键值对
127.0.0.1:6379> set name "xiaoming"
# 获取键值
127.0.0.1:6379> get name
# 删除键值对
127.0.0.1:6379> del name
```

### 0x03 Hash
```cs
# Hash中一个key对应多个值
127.0.0.1:6379> hmset student1 name "xiaohong" age "18"
OK
127.0.0.1:6379> hmset student2 name "xiaoliu" age "23"
OK
127.0.0.1:6379> hgetall student1
1) "name"
2) "xiaohong"
3) "age"
4) "18"
127.0.0.1:6379> hgetall student2
1) "name"
2) "xiaoliu"
3) "age"
4) "23"
```

### 0x04 List
```cs
127.0.0.1:6379> lpush list1 "python"
(integer) 1
127.0.0.1:6379> lpush list1 "php"
(integer) 2
127.0.0.1:6379> lpush list1 "asp"
(integer) 3
127.0.0.1:6379> lpush list1 "jsp"
(integer) 4
127.0.0.1:6379> rpush list2 "aaaa"
(integer) 1
127.0.0.1:6379> rpush list1 "aaaa"
(integer) 5
127.0.0.1:6379> lrange list1 0 10
1) "jsp"
2) "asp"
3) "php"
4) "python"
5) "aaaa"
127.0.0.1:6379> lindex list1 3
"python"
127.0.0.1:6379> llen list1
(integer) 5
127.0.0.1:6379> lpop list1
"jsp"
127.0.0.1:6379> rpop list1
"aaaa"
```

### 0x05 Set
```cs
127.0.0.1:6379> sadd set1 "333"
(integer) 1
127.0.0.1:6379> sadd set1 "222"
(integer) 1
127.0.0.1:6379> sadd set1 "111"
(integer) 1
127.0.0.1:6379> sadd set1 "111"
(integer) 0
127.0.0.1:6379> sadd set1 "000"
(integer) 1
127.0.0.1:6379> smembers set1
1) "000"
2) "222"
3) "333"
4) "111"
```

### 0x06 zset
```cs
127.0.0.1:6379> zadd zset1 2 "222"
(integer) 1
127.0.0.1:6379> zadd zset1 1 "111"
(integer) 1
127.0.0.1:6379> zadd zset1 3 "333"
(integer) 1
127.0.0.1:6379> zadd zset1 3 "333"
(integer) 0
127.0.0.1:6379> zadd zset1 0 "000"
(integer) 1
127.0.0.1:6379> zrange zset1 0 10
1) "000"
2) "111"
3) "222"
4) "333"
127.0.0.1:6379> zadd zset1 0 "555"
(integer) 1
127.0.0.1:6379> zrange zset1 0 10
1) "000"
2) "555"
3) "111"
4) "222"
5) "333"
127.0.0.1:6379> zrange zset1 0 10 withscores
 1) "000"
 2) "0"
 3) "555"
 4) "0"
 5) "111"
 6) "1"
 7) "222"
 8) "2"
 9) "333"
10) "3"
```