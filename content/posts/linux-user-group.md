+++
date = "2016-04-17T20:48:07+08:00"
description = ""
draft = false
tags = ["linux"]
title = "Linux之用户组"
topics = ["Linux"]

+++
    
    初始组只有一个就是/etc/passwd里gid显示的，有效组可以有多个
<br/>

    useradd xm   用户xm会默认加到xm组
    useradd -g fans xm  将xm的所属组改为fans
    useradd -G fans xm  初始组为xm，有效组为fans
<br/>

    useradd xiaoming
    usermod -g fans xiaoming  只有一个初始组，被修改为fans
    useradd xm
    usermod -G fans xm    xm用户会有两个组，初始组为xm，又添加一个有效组fans
    usermod -G fans1 xm    xm用户两个组，初始组为xm，有效组更改为fans1
<br/>

    用户创建的文件拥有者是初始组