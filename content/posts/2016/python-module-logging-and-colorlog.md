+++
date = "2016-06-27T08:55:30+08:00"
description = ""
draft = false
tags = ["python", "module"]
title = "Python 中通过 logging 和 colorlog 模块记录日志"
topics = ["Python"]

+++
<!--
 * @Author: reber
 * @Mail: reber0ask@qq.com
 * @Date: 2019-04-10 10:45:01
 * @LastEditTime: 2019-07-25 10:31:58
 -->

### 0x00 使用流程
* 创建一个 logger
* 创建相关 handler，同时定义 handler 的输出格式
* 将 handler 添加到 logger
* 使用 logger 记录日志

### 0x01 示例
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
@Author: reber
@Mail: reber0ask@qq.com
@Date: 2019-07-16 22:31:00
@LastEditTime: 2019-07-24 09:52:15
'''

import logging
import colorlog

class MyLog(object):
    def __init__(self, logfile, loglevel, logger):
        # 创建一个 logger
        self.logger = colorlog.getLogger(logger)
        # self.logger.setLevel(logging.INFO)
        self.logger.setLevel(logging.DEBUG)

        # 创建相关 hander
        fh = self.__file_hander(logfile)
        sh = self.__stream_hander(loglevel)

        # 将 handler 添加到 logger
        self.logger.addHandler(fh)
        self.logger.addHandler(sh)

    def __file_hander(self, logfile):
        # 创建一个用于写入日志文件的 handler
        fh = logging.FileHandler(logfile)
        fh.setLevel(logging.DEBUG) # 只要是写入文件的等级都为DEBUG，也可以设置为loglevel
        formatterf = logging.Formatter('%(asctime)s [%(levelname)s] [%(name)s] %(message)s')
        fh.setFormatter(formatterf)
        return fh

    def __stream_hander(self, loglevel):
        # 创建一个用于输出到控制台的 handler
        sh = colorlog.StreamHandler()
        sh.setLevel(loglevel)
        formatter = colorlog.ColoredFormatter(
            '%(log_color)s[%(asctime)s] [%(levelname)s] %(message)s %(reset)s',
            datefmt="%H:%M:%S",
            reset=True,
            log_colors={
                'CRITICAL': 'white,bg_red',
                'ERROR': 'red',
                'WARNING': 'yellow',
                'INFO': 'green',
                'DEBUG': 'blue',
            },
            secondary_log_colors={},
            style='%'
        )
        sh.setFormatter(formatter)
        return sh

    def critical(self,msg):
        self.logger.critical(msg)

    def error(self,msg):
        self.logger.error(msg)

    def warning(self,msg):
        self.logger.warning(msg)

    def info(self,msg):
        self.logger.info(msg)

    def debug(self,msg):
        self.logger.debug(msg)


if __name__ == '__main__':
    # 等级为 INFO 则只会输出级别大于等于 INFO 的日志
    # NOTSET < DEBUG < INFO < WARNING < ERROR < CRITICAL

    logger = MyLog(logfile='log.txt', loglevel='INFO', logger='test')
    logger.critical('critical')
    logger.error('error')
    logger.warning('warning')
    logger.info('info')
    logger.debug('debug')
    print
    logger = MyLog(logfile='log.txt', loglevel='ERROR', logger='mylog')
    logger.critical('critical')
    logger.error('error')
    logger.warning('warning')
    logger.info('info')
    logger.debug('debug')
```

### 0x02 结果如下：
![90](/img/post/Xnip2019-07-25_10-26-01.png)
