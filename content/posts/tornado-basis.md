+++
date = "2017-01-03T18:43:27+08:00"
description = ""
draft = false
tags = ["python", "tornado"]
title = "初识Tornado"
topics = ["Python"]

+++

> {{% fluid_img src="/img/anime/anime003.jpg" alt="命运石之门" %}}

### 0x00 简介
> ```
Tornado是一个用Python写的相对简单的、不设障碍的Web服务器架构,用以处理上万的同时的
连接口,让实时的Web服务通畅起来。虽然跟现在的一些用Python写的Web架构相似,比如Django,
但Tornado更注重速度,能够处理海量的同时发生的流量。 
```

### 0x01 示例
> main.py代码如下：
> ```
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.ioloop
import tornado.web

class IndexHandler(tornado.web.RequestHandler):
    def get(self):   #访问根时触发这个函数
        name = self.get_argument('name','wyb')
        self.write('Hello,' + name)
        self.write('<br /><a href="/login">login</a>')

class MyLoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('login.html')  
#若用户请求/login页面则将login.html发送给客户端，客户会看的一个登陆表单

    def post(self):   #当用户点击提交按钮是触发这个函数
        name = self.get_argument('name')   #接收表单的name
        password = self.get_argument('password')   #接收表单的password
        self.write("you name is:%s\nyou password is:%s" % (name,password))


def get_app():
    handlers = [
        (r"/",IndexHandler),    #代表请求/的都让IndexHandler处理
        (r"/login",MyLoginHandler),    #表示请求/login页面的让MyLoginHandler处理
    ]
    app = tornado.web.Application(handlers=handlers)
    return app

if __name__ == '__main__':
    app = get_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
```

> login.html代码如下：
> ```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>form</title>
</head>
<body>
    <form action="/login" method="post">
        Name: <input type="text" name="name"><br />
        Password: <input type="password" name="password"><br />
        <input type="submit" name="submit" value="login">
    </form>
</body>
</html>
```

### 0x03 结果如下
> {{% fluid_img src="/img/post/tornado_test1.png" alt="初识tornado1" %}}
<br /><br />
{{% fluid_img src="/img/post/tornado_test2.png" alt="初识tornado2" %}}
<br /><br />
{{% fluid_img src="/img/post/tornado_test3.png" alt="初识tornado3" %}}