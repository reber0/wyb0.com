+++
date = "2016-06-25T08:55:30+08:00"
description = ""
draft = false
tags = ["python", "python模块"]
title = "Python的logging模块"
topics = ["Python"]

+++

## 使用流程
1. 创建一个logger
2. 创建一个handler，用于写入日志文件
3. 定义handler的输出格式
4. 将handler添加到logger
5. 记录日志

## 示例
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging

class MyLog(object):
    """docstring for MyLog"""
    def __init__(self, logfile, loglevel, logger):
        super(MyLog, self).__init__()
        
        # 创建一个logger
        self.logger = logging.getLogger(logger)
        self.logger.setLevel(logging.DEBUG)

        # 创建一个用于写入日志文件的handler
        fh = logging.FileHandler(logfile)
        fh.setLevel(logging.DEBUG) # 只要是写入文件的等级都为DEBUG，也可以设置为loglevel
        formatterf = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        fh.setFormatter(formatterf)

        # 创建一个用于输出到控制台的handler
        ch = logging.StreamHandler()
        ch.setLevel(loglevel)
        formatterc = logging.Formatter('%(asctime)s - %(message)s')
        ch.setFormatter(formatterc)

        # 将handler添加到logger
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)
    
    def debug(self,msg):
        self.logger.debug(msg)

    def info(self,msg):
        self.logger.info(msg)

    def warn(self,msg):
        self.logger.warn(msg)

    def error(self,msg):
        self.logger.error(msg)

    def critical(self,msg):
        self.logger.critical(msg)

# 等级为WARNING则只会输出级别大于WARNING的日志
# NOTSET < DEBUG < INFO < WARNING < ERROR < CRITICAL

logger = MyLog(logfile='log.txt', loglevel='INFO', logger='test')
logger.debug("debug")
logger.info("info")
logger.warn("warn")
logger.error("error")
logger.critical("critical")
print
logger = MyLog(logfile='log.txt', loglevel='ERROR', logger='mylog')
logger.debug("debug")
logger.info("info")
logger.warn("warn")
logger.error("error")
logger.critical("critical")
```

## 结果如下：
> {{% fluid_img src="/img/post/logging_to_file.png" alt="日志输出至文件.png" %}}
<br /><br />
{{% fluid_img src="/img/post/logging_to_cmdline.png" alt="日志输出到命令行.png" %}}
