+++
date = "2016-07-15T10:30:54+08:00"
description = ""
draft = false
tags = ["xss"]
title = "XSS初识"
topics = ["Pentest"]

+++

### 0x00 简介
> &nbsp;&nbsp;&nbsp;&nbsp;XSS(跨站脚本攻击)是指攻击者在网页中嵌入客户端脚本，通常是Javascript编写的恶意代码，当用户使用浏览器浏览被嵌入恶意代码的网页时，恶意代码将在用户的浏览器上被解析执行。重点在"脚本"这两个字上，脚本主要有两个：JavaScript和ActionScript。  
<font color="FF0000">&nbsp;&nbsp;&nbsp;&nbsp;要想深入研究XSS，必须要精通JavaScript，JavaScript能做到什么效果，XSS的威力就有多强大。</font>

### 0x01 危害
> &nbsp;&nbsp;&nbsp;&nbsp;JavaScript可以用来获取用户Cookie、改变页面内容、URL转跳，那么存在XSS漏洞的网站，就可以盗取用户Cookie、黑掉页面、导航到恶意网站，而攻击者仅仅需要向页面中注入JavaScript代码。
```
• 盗取管理员Cookie
• XSS Worm
• 挂马(水坑攻击)
• 键盘记录(有局限性)
• 利用网站重定向
• 修改网页内容
• 等等
```

### 0x02 攻击场景
> &nbsp;&nbsp;&nbsp;&nbsp;在各类SNS、邮件系统、开源流行的Web应用、BBS、微博等社交场景中，前端攻击被广泛实施与关注。主要是一些大型网站才有价值。
```
• 支持html解析和javascript解析的客户端,如：html文档、flsh、pdf等
• url的参数，回显到网页上
• form表单提交的内容出现在网页上，如：昵称、邮箱、简介、留言
• 等等
```

### 0x03 分类
> 主要分为三类：反射型、存储型、DOM型(还有flash XSS、mXSS)。   
#### 1. 反射型XSS  
&nbsp;&nbsp;&nbsp;&nbsp;反射型XSS也被称为非持久性XSS，是现在最容易出现的一种XSS漏洞。发出请求时，XSS代码出现在URL中，最后输入提交到服务器，服务器解析后在响应内容中出现这段XSS代码，最后浏览器解析执行。
```
简单流程：
    用户访问带有XSS代码的URL请求
    服务器端接收数据后处理，然后返回带有XSS代码的数据发送给浏览器
    浏览器解析带有XSS代码的数据后，最终造成XSS漏洞
可能攻击流程：
    • 用户aaa在网站www.xxx.com浏览网页
    • 攻击者hacker发现www.xxx.com/xss.php存在反射型XSS漏洞，然后精心构造JavaScript代码，
      构造的代码的功能为盗取用户Cookie并发送到指定站点www.xxser.com
    • hacker将带有反射型XSS漏洞的URL通过站内信发给aaa，站内信为一些诱惑信息，目的是使用户aaa点击
    • 假设用户aaa点击了带有XSS漏洞的URL，则aaa的Cookie将被发送到www.xxser.com
    • hacker获取aaa的Cookie后可以以aaa的身份登陆www.xxx.com，从而得到aaa的敏感信息
```
#### 2. 存储型XSS  
&nbsp;&nbsp;&nbsp;&nbsp;存储型XSS又被称为持久性XSS，它是最危险的一种跨站脚本，相比反射型XSS和DOM型XSS具有更高的隐蔽性，所以危害更大，因为它不需要用户手动触发。 允许用户存储数据的web程序都可能存在存储型XSS漏洞，当攻击者提交一段XSS代码后，被服务器端接收并存储，当所有浏览者访问某个页面时都会被XSS，其中最典型的例子就是留言板。
```
测试技巧：
    • 首先确定输入点和输出点，比如留言，若留言输出(显示)的地方是标签内，则XSS代码会被执行，但若输出在属性内，则不会执行，
    如：<input type="text" name="content" value="<script>alert(/xss/)</script>" />
    • 确定输出点后根据相应的标签构造HTML代码来闭合，如：" /><script>alert(1)</script><"，最终在html中为：
    <input type="text" name="content" value="" /><script>alert(1)</script><"" />
测试步骤：
    • 添加正常留言，用firebug快速查找显示标签，若显示区域不在html属性内则可以直接使用XSS代码注入
    • 若不能得知内容输出的位置，可以使用模糊测试方案，XSS代码如下：
        a. <script>alert(document.cookie)</script>  //普通注入
        b. " /><script>alert(document.cookie)</script>   //闭合标签注入
        c. </textarea>'"><script>alert(document.cookie)</script>   //闭合标签注入
```
#### 3. DOM XSS
&nbsp;&nbsp;&nbsp;&nbsp;DOM即文本对象模型，DOM通常代表在html、xhtml和xml中的对象，使用DOM可以允许程序和脚本动态的访问和更新文档的内容、结构和样式。它不需要服务器解析响应的直接参与，触发XSS靠的是浏览器端的DOM解析，可以认为完全是客户端的事情。
```
DOM的规定如下：
    • 整个文档是一个文档节点
    • 每个HTML标签是一个元素节点
    • 包含在HTML元素中的文本是文本节点
    • 每个HTML属性是一个属性节点
    • 节点与节点之间都有等级关系
```
HTML的标签都是一个个节点，这些节点组成了DOM的整体结构：节点树，如下图：
{{% fluid_img src="/img/post/xss_dom_tree.png" alt="xss中DOM树.png" %}}
#### 4. flash XSS
&nbsp;&nbsp;&nbsp;&nbsp;利用网页上flash文件的缺陷来执行js脚本，一般是反射型XSS