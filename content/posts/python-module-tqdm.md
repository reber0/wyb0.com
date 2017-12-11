+++
date = "2017-04-15T18:49:37+08:00"
description = ""
draft = false
tags = ["python","module"]
title = "下载大文件时显示进度条"
topics = ["Python"]

+++

### 0x00 作用
在下载大文件时以进度条的形式显示下载进度，如下图所示：
![下载进度条](/img/post/tqdm_progress_bar.png)

### 0x01 代码
```
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
from tqdm import tqdm

def get_vedio(url,name):
    resp = requests.get(url=url,stream=True)
    content_size = int(resp.headers['Content-Length'])/1024
    with open(name, "wb") as f:
        print "total: ",content_size,'k'
        for data in tqdm(iterable=resp.iter_content(1024),total=content_size,unit='k'):
            f.write(data)
        print "done "+name


if __name__ == '__main__':
    url = "http://127.0.0.1/Video.mp4"
    name = url.split('/')[-1]
    get_vedio(url,name)
```