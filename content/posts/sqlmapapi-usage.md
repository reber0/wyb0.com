+++
date = "2016-06-28T11:19:11+08:00"
description = ""
draft = false
tags = ["sqlmap"]
title = "sqlmapapi的简单使用"
topics = ["Pentest"]

+++

## 关于sqlmapapi.py
当利用sqlmap时一次只能测试一个url，效率很低，而用sqlmapapi就可以实现批量

## 用于交互的方法
在sqlmap/lib/utils/api.py中:
```
# 用户方法
@get("/task/new") Create new task ID. 
@get("/task/<taskid>/delete") Delete own task ID. 

# 管理函数
@get("/admin/<taskid>/list") List task pull. 
@get("/admin/<taskid>/flush") Flush task spool (delete all tasks). 

# 核心交互函数
@get("/option/<taskid>/list") List options for a certain task ID
@post("/option/<taskid>/get") Get the value of an option (command line switch) for a certain task ID
@post("/option/<taskid>/set") Set an option (command line switch) for a certain task ID
@post("/scan/<taskid>/start") Launch a scan
@get("/scan/<taskid>/stop") Kill a scan
@get("/scan/<taskid>/status") Return status of a scan
@get("/scan/<taskid>/data") Retrieve the data of a scan
@get("/scan/<taskid>/log/<start>/<end>") Retrieve a subset of log messages
@get("/scan/<taskid>/log") Retrieve the log messages
@get("/download/<taskid>/<target>/<filename:path>") Download a certain file from the file system
```

## sqlmapapi.py参数如下
{{% fluid_img src="/img/post/sqlmapapi_help.png" alt="sqlmapapi参数.png" %}}
它的-s参数可以启动一个服务(返回一个Admin Id)，只要将url给它就行了：
{{% fluid_img src="/img/post/sqlmapapi_server.png" alt="启动sqlmapapi服务.png" %}}

## 简单使用

### 1. 创建任务
使用@get("/task/new")方法创建一个新的任务
{{% fluid_img src="/img/post/sqlmapapi_new_task.png" alt="sqlmapapi新建任务.png" %}}
### 2. 指定参数
使用@post("/option/\<taskid\>/set")方法设置参数
{{% fluid_img src="/img/post/sqlmapapi_options.png" alt="sqlmapapi指定参数.png" %}}
### 3. 开始扫描
使用@post("/scan/\<taskid\>/start")方法开始扫描
{{% fluid_img src="/img/post/sqlmapapi_scan_start.png" alt="sqlmapapi开始扫描.png" %}}
### 4. 获取探测是否结束
使用@get("/scan/\<taskid\>/status")获取探测是否结束
{{% fluid_img src="/img/post/sqlmapapi_scan_status.png" alt="sqlmapapi得到扫描状态.png" %}}
### 5. 获取探测结果
使用@get("/scan/\<taskid\>/data")获取探测结果，如果不能注入，则获取到的结果为空，如下：
```
{u'data': [], u'success': True, u'error': []}
```
若存在注入则可能如下：
{{% fluid_img src="/img/post/sqlmapapi_scan_result.png" alt="sqlmapapi得到扫描结果.png" %}}
### 6. 删除任务
使用@get("/task/delete")方法删除一个任务.
```
>>>resp = requests.get('http://127.0.0.1:8776/task/96f01550dadabab8/delete')
>>>resp.json()
{u'success': True}
```
{{% fluid_img src="/img/post/sqlmapapi_delete_task.png" alt="sqlmapapi删除任务.png" %}}

## 简单示例
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
import json
import requests

url_list = {}
url_list['url1'] = 'http://192.168.188.134/sqli/Less-1/?id=1'
url_list['url2'] = 'http://192.168.188.134/sqli/Less-2/?id=1'
url_list['url3'] = 'http://192.168.188.134/sqli/Less-3/?id=1'


for key in url_list.keys():
    payload = {}
    resp = requests.get('http://127.0.0.1:8775/task/new') #创建任务
    taskid = resp.json()['taskid']
    payload['url'] = url_list[key]
    headers = {'Content-Type':'application/json'}
    if resp.json()['success']: #指定参数
        print "set options..."
        url = "http://127.0.0.1:8775/option/%s/set" % taskid
        resp = requests.post(url,data=json.dumps(payload),headers=headers)
        if resp.json()['success']: #开始扫描
            print "start scan..."
            url = "http://127.0.0.1:8775/scan/%s/start" % taskid
            resp = requests.post(url,data=json.dumps(payload),headers=headers)
            print "scan runing..."
            if resp.json()['success']:
                while 1:
                    url = "http://127.0.0.1:8775/scan/%s/status" % taskid #查看扫描状态
                    resp = requests.get(url)
                    if resp.json()['status'] != 'terminated':
                        pass
                    else:
                        print "scan end."
                        url = "http://127.0.0.1:8775/scan/%s/data" % taskid #获取扫描结果
                        data = requests.get(url)
                        print data.json()['data']
                        print "delete task"
                        url = "http://127.0.0.1:8775/task/%s/delete" % taskid
                        requests.get(url)
                        break
                    time.sleep(2)
    else:
        print "new task error"
```