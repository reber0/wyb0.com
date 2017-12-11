+++
date = "2016-07-02T10:47:19+08:00"
description = ""
draft = false
tags = ["python", "module"]
title = "Python的requests模块"
topics = ["Python"]

+++

### 0x00 无参数的get请求
```python
import requests

resp = requests.get('http://www.baidu.com',timeout=1) #设置超时，超时后抛出timeout错误
print resp.text #一般用来输出纯文本，可得到unicode类型字符串
print resp.content #一般用来输出pdf、图片等，可得到原网页设定类型的字符串
```
![requests得到html源码](/img/post/requests_text.png)

### 0x01 有参数的get请求
```python
import requests

url = 'http://10.10.10.10:8080/Lab2.0/Login.action'
header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
}
param = {'aaa':'1111','bbb':'2222'}
resp = requests.get(url,params=param,headers=header)
print resp.url #得到url
print resp.status_code #得到返回的状态码
print resp.headers #得到html头
print resp.cookies #得到cookie
```
![有参数的get请求](/img/post/requests_get_params.png)

### 0x02 POST请求
```python
import requests
url1 = 'http://10.10.10.10:8080/Lab2.0/Login.action'
url2 = 'http://10.10.10.10:8080/Lab2.0/student.action'
data = {
    'userid':'1315935xxx',
    'password':'xxxxxxx',
    'quan':'Student',
}
header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
}
# data为字典时会变成表单形式，为字符串时会直接提交字符串
# 若data为字典且用data=json.dumps(data)则会变成json格式
resp = requests.post(url1,data=data,headers=header)
cookie = resp.cookies #保存cookie
resp = requests.get(url2,cookies=cookie) #要加上cookie
print resp.text
```
![post登陆后带cookie访问页面](/img/post/requests_post.png)

### 0x03 SSL证书
```python
import requests
url = 'https://www.aa.com'
requests.get(url)   #出错，因为是https，验证了证书
requests.get(url,verify=False) #正常，因为忽略了证书验证
```

### 0x04 添加Cookie
```python
import requests
url = 'http://10.10.10.10:8080/Lab2.0/student.action'
cookie = {
    'JSESSIONID': 'jljmir378pumoava0at8e5dbb2'
}
resp = s.get(url=url,cookies=cookie)
print resp.status_code
```

### 0x05 使用Session
```python
import requests
url = 'http://10.10.10.10:8080/Lab2.0/Login.action'
proxy = {
    'http':'http://127.0.0.1:8080'
}
data = {
    'userid':'13159xxxxx',
    'password':'xxxxxxx',
    'quan':'Student',
}
s = requests.Session() #此后请求时不用再声明cookie
resp = s.post(url,data=data,proxies=proxy)
# 此时再次请求就不用使用cookie了
resp = s.get('http://10.10.10.10:8080/Lab2.0/student.action')
print resp.text
```
![post登陆后带cookie访问页面](/img/post/requests_proxies.png)

![post登陆后带cookie访问页面](/img/post/requests_post.png)

### 0x06 上传与下载
```python
#!/usr/bin/env python
#-*- coding:utf-8 -*-

import requests

#会上传本地的aa.png，上传后的名字为bb.png

file = {'myfile':('bb.png',open('/home/reber/aa.png','rb'),'img/jpeg')}
upload_url = "http://123.206.78.220/u.php"
requests.post(upload_url, files=file)
```

```
#!/usr/bin/env python
#-*- coding:utf-8 -*-

import urllib
import requests

#下载不同类型的文件只要更改后缀即可

url = 'http://nginx.org/download/nginx-1.9.9.tar.gz'

resp = requests.get(url)
#resp = requests.get(url,stream=True) #下载视频时要设置stream为True
with open("a.tar.gz","wb") as f:
    f.write(resp.content)

urllib.urlretrieve(url, "b.tar.gz") #只能下载http的
```

### 0x07 重定向
```
>>> import requests
>>> r = requests.get('http://github.com') #默认跳转
>>> r.url
u'https://github.com/' #可以看到跳转到了https
>>> r.status_code #转跳后返回200代码
200
>>> r.history
[<Response [301]>]
>>> r = requests.get('http://github.com',allow_redirects=False) #禁止跳转
>>> r.url
u'http://github.com/' #可以看到没有跳转，还是http
>>> r.status_code #没有转跳返回301代码
301
>>> r.history
[]
```