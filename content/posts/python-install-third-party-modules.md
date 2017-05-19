+++
date = "2016-06-15T13:08:00+08:00"
description = ""
draft = false
tags = ["python", "module"]
title = "Python第三方模块的安装"
topics = ["Python"]

+++

## 第三方模块安装方法
* 使用工具easy_install
* 使用工具pip(easy_install的升级版，还不能完全取代)
* 直接在https://pypi.python.org/pypi 下载安装

## 使用easy_install安装
> ```
在https://bootstrap.pypa.ip/ez_setup.py 下载安装脚本
然后执行python ez_setup.py即可安装easy_install

安装：easy_install PackageName
升级：easy_install -U PackageName
```

## 使用pip安装
> ```
在https://bootstrap.pypa.io/get-pip.py 下载安装脚本
然后执行python get-pip.py即可安装pip

安装：pip install PackageName
升级：pip install --upgrade PackageName
删除：pip uninstall PackageName
```

## 网站下载安装包
> 在https://pypi.python.org/pypi 直接下载相应的exe或者py文件安装