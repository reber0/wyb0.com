+++
date = "2016-10-25T00:53:13+08:00"
description = ""
draft = false
tags = ["ajax"]
title = "AJAX初识"
topics = ["AJAX"]

+++

### 0x00 什么是AJAX
> AJAX全称是Asynchronous JavaScript and XML，即异步的JavaScript和XML  
AJAX不是新的编程语言，而是一种使用现有标准的新方法。  
AJAX可在不重新加载整个页面的情况下与服务器交换数据从而更新部分网页  

### 0x01 示例
> ```
<!DOCTYPE html>
<html>
<head>
    <script>
    function loadXMLDoc() {
        var xmlhttp;

        if (window.XMLHttpRequest) {// code for IE7+,Firefox,Chrome,Opera,Safari
            xmlhttp=new XMLHttpRequest();
        } else {// code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange=function(){
          if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
          }
        }
        xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
        xmlhttp.send();
    }
    </script>
</head>
<body>
    <div id="myDiv"><h2>使用 AJAX 修改该文本内容</h2></div>
    <button type="button" onclick="loadXMLDoc()">修改内容</button>
</body>
</html>
```
当点击"修改内容"后，文本就会改变，但html页面源码没变，只向服务器请求了文本

### 0x02 关于XHR
> XMLHttpRequest是AJAX的基础，就是它与后台就行交互的  
现在大部分浏览器都支持XMLHttpRequest对象(IE5和IE6使用ActiveXObject)
```
//创建对象示例
var xmlhttp;
if (window.XMLHttpRequest) {// code for IE7+,Firefox,Chrome,Opera,Safari
  xmlhttp=new XMLHttpRequest();
} else {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```