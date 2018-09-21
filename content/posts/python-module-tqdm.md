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
# code by reber <1070018473@qq.com>

import requests
from tqdm import tqdm

def get_vedio(url,name):
    resp = requests.get(url=url,stream=True)
    content_size = int(resp.headers['Content-Length'])/1024/1024
    with open(name, "wb") as f:
        print "download file {}, total size: {}M".format(name,content_size)
        for data in tqdm(iterable=resp.iter_content(1024*1024),total=content_size,unit='M'):
            f.write(data)

def get_content(filename):
    data = []
    with open(filename) as f:
        lines = f.readlines()
        for line in lines:
            data.append(line.strip())
    return data

if __name__ == '__main__':
    urls = get_content('urls.txt')
    for url in urls:
        name = url.split('/')[-1]
        turl = "http://video.xxxxxxx.com/"+url
        get_vedio(turl,name)
```