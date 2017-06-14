+++
date = "2016-06-23T15:32:34+08:00"
description = ""
draft = false
tags = ["injection"]
title = "SQL注入之防御"
topics = ["Pentest"]

+++

### 0x00 要做的事
> ```
也就是找到注入点然后修复
```

### 0x01 防御方法
* 使用转义函数  
如：addslashes()和mysql_real_escape_string()  
在php.ini设置auto_prepend_file自动在脚本执行前在首部加载文件  

> ```php
<?php
    //简单过滤
    $filter = array(&$_GET,&$_POST,&$_COOKIE);
    foreach ($filter as $key => $value){
        foreach ($value as $k => $v){
            $filter[$key][$k] = mysql_real_escape_string($v);
        }
    }
?>
```

* 检查数据类型  
使用(int)或settype()等将数字等进行强制转换  
对邮箱、日期等也进行检查

* 使用预编译语句绑定变量(一般为防御SQL注入的最佳方式)
```php
    <?php
        //预编译
        $mysqli = new mysqli("localhost","root","123456","share");
        $mysqli->query("set names utf8");
        $sql = "INSERT INTO test (name,sex,age) VALUE(?,?,?)";
        $s = $mysqli->prepare($sql);
        //绑定参数
        $name = "Tom";
        $sex = "M";
        $age = 23;
        $s->bind_param("ssi",$name,$sex,$age);//ssi的意思是字符、字符、整型
        //执行
        $result = $s->execute();
        var_dump($result);
        $s->close();
    ?>
```

* 其他
```
1.使用存储过程
2.使用安全的函数和为数据库合理分配权限等
3.使用框架
```