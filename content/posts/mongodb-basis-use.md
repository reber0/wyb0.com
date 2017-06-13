+++
date = "2017-05-25T15:33:12+08:00"
description = ""
draft = false
tags = ["mongodb"]
title = "MongoDB的基本使用"
topics = ["Database"]

+++

### 0x00 数据库
> ```
$ mongo

创建数据库，创建数据库后只有插入一条数据才能保存数据库
> use test

查看所有数据库
> show dbs

查看当前数据库
> db

删除数据库
>use test
switched to db test
>db.dropDatabase()
{ "dropped" :  "test", "ok" : 1 }
```

### 0x01 创建用户
> ```
创建管理员用户
> use admin
switched to db admin
> db.createUser({user:"root",pwd:"root123",roles:["userAdminAnyDatabase"]})
Successfully added user: { "user" : "root", "roles" : [ "userAdminAnyDatabase" ] }
> db.auth("root","root123")
1

这个例子创建了一个名为 root 的用户管理员。创建完了这个用户之后，我们应该马上以该用户的身份登录：
db.auth() 方法返回 1 表示登录成功。接下来我们为指定的数据库创建访问所需的账号。

创建数据库用户
> use test
switched to db test
> db.createUser({user:"test",pwd:"test123",roles:["readWrite"]})
Successfully added user: { "user" : "test", "roles" : [ "readWrite" ] }
> db.auth("test”,"test123")
1
```

### 0x02 集合
> ```
创建集合
> use test
> db.createCollection("msg")
{ "ok" : 1 }
> db.createCollection("book")
{ "ok" : 1 }

查看集合
> show collections
msg
book

删除集合
> db.book.drop()
true
> show collections
msg
```

### 0x03 文档
> ```
插入文档,若student这个集合不存在时会自动创建集合student
> db.student.insert({"name":"xiaoming","sex":1})
WriteResult({ "nInserted" : 1 })
> db.student.insert({
... name:'xiaohong',
... sex:0
... })

查询文档
> db.student.find()
{ "_id" : ObjectId("59267f1c7e72bcd757917260"), "name" : "xiaoming", "sex" : 1 }
{ "_id" : ObjectId("59267f397e72bcd757917261"), "name" : "xiaohong", "sex" : 0 }
> db.student.find().pretty()
{
        "_id" : ObjectId("59267f1c7e72bcd757917260"),
        "name" : "xiaoming",
        "sex" : 1
}
{
        "_id" : ObjectId("59267f397e72bcd757917261"),
        "name" : "xiaohong",
        "sex" : 0
}
> db.student.find({sex:0,age:32}).pretty()   相当于sex=0 and age=32

更新文档，相当于set age=23 where name='xiaohong'
> db.student.update({name:'xiaohong'},{$set:{age:23}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

删除文档
> db.student.remove({name:'xiaojuan’})  删除所有名字为xiaojuan的这条数据
WriteResult({ "nRemoved" : 1 })
> db.student.remove({sex:1},1)  只删除一条性别为1的数据
WriteResult({ "nRemoved" : 1 })
```

### 0x04 其他
> ```
排序
> db.student.find()
{ "_id" : ObjectId("592681367e72bcd757917262"), "name" : "xiaohong", "sex" : 0, "age" : 30 }
{ "_id" : ObjectId("5926814d7e72bcd757917264"), "name" : "xiaohua", "sex" : 1, "age" : 24 }
> db.student.find().sort({"age":1})
{ "_id" : ObjectId("5926814d7e72bcd757917264"), "name" : "xiaohua", "sex" : 1, "age" : 24 }
{ "_id" : ObjectId("592681367e72bcd757917262"), "name" : "xiaohong", "sex" : 0, "age" : 30 }

备份与还原
$ mongodump 会备份到当前的dump文件夹中
$ mongorestore 会把dump中的数据导入到mongo
```