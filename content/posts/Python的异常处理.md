+++
date = "2016-08-26T10:40:44+08:00"
description = ""
draft = false
tags = ["python", "异常处理"]
title = "Python的异常处理"
topics = ["Python"]

+++

## Python异常处理
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    try: # 可嵌套
        str("aaaaa")
        # int("aaaaa")
        # print a
        # print 1/0
    except (TypeError, IndexError, ValueError): #捕获多种异常
        print "TypeErrorZero or DivisionError or ValueError"
    except ZeroDivisionError as aa: #捕获除零错误
        print aa #输出详细错误信息
    except:
        print u"发生其他异常则执行这里"
    else:
        print u"上面没有出错才输出这里"
        a = [1,2,3]
        print a[4] #这里出错，会向上抛出错误，最终输出this is error
    finally:
        print u"不管是否出错都输出这里，一般用于释放资源，如关闭文件"
except Exception as e: #可捕获所有异常类型
    print "this is error"
    print e
```
{{% fluid_img src="/img/post/python_exception_handling.png" alt="python的异常处理.png" %}}

