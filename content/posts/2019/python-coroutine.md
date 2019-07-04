+++
title = "Python 的协程"
topics = ["Python"]
tags = ["python"]
description = "说一下 python 中的协程，主要有协程、asyncio、async/await、并发这几块。"
date = "2019-07-04T18:09:49+08:00"
draft = false
+++

<!--
 * @Author: reber
 * @Mail: reber0ask@qq.com
 * @Date: 2019-07-04 18:09:49
 * @LastEditTime: 2019-07-04 21:26:16
 -->
### 0x00 协程的优势
协程拥有极高的执行效率，因为子程序切换不是线程切换，而是由程序自身控制，因此没有线程切换的开销。和多线程比，线程数量越多，协程的性能优势就越明显。

不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多

### 0x01 Python中的协程
协程也就是微线程，python 的 generator(生成器) 中的 yield 可以一定程度上实现协程

在 generator 中，我们不但可以通过 for 循环来迭代，还可以不断调用 next() 函数获取由 yield 语句返回的下一个值。

但是 Python 的 yield 不但可以返回一个值，它还可以接收调用者发出的参数。
![80](/img/post/coroutine_case.png)


### 0x02 使用 gevent
python 中可以通过 generator 实现协程，但是不完全，第三方的 gevent 为 Python 提供了比较完善的协程支持，gevent 可以通过 monkey patch 动态的修改 Python 自带的一些标准库

由于 IO 操作(比如访问网络)非常耗时，经常使程序处于等待状态，而 gevent 可以为我们自动切换协程，再在适当的时候切换回来继续执行，这就保证总有 greenlet 在运行，而不是等待 IO

使用 gevent 可以获得极高的并发性能，但 gevent 只能在 Unix/Linux 下运行，在 Windows 下不保证正常安装和运行
下面 3 个网络操作是并发执行的，且结束顺序不同，但只有一个线程
```
from gevent import monkey; monkey.patch_all()
import requests
import gevent

def get_resp_size(url):
    print('GET: %s' % url)
    html = requests.get(url).content
    print('%d bytes received from %s.' % (len(html), url))

def gevent_test(urls):
    job_list = [gevent.spawn(get_resp_size, url) for url in urls]
    gevent.joinall(job_list)

urls = [
    'https://www.python.org/',
    'https://www.yahoo.com/',
    'https://github.com/',
]
gevent_test(urls)
```

### 0x03 asyncio
在 python 3.4 时引入了 asyncio 这个模块，asyncio 专门被用来实现异步IO操作。

通过使用 <f>yield from</f> 和 asyncio 模块中的 <f>@asyncio.coroutine</f> 可以实现协程

对于简单的迭代器，yield from iterable 本质上等于 for item in iterable: yield item 的缩写版

* hello world 示例

```
@asyncio.coroutine
def hello():
    print("Hello world!")
    r = yield from asyncio.sleep(1)
    print("Hello again!")
```

* 请求web网页

```
import asyncio

@asyncio.coroutine
def wget(host):
    print('wget %s...' % host)
    connect = asyncio.open_connection(host, 80)
    reader, writer = yield from connect
    header = 'GET / HTTP/1.0\r\nHost: %s\r\n\r\n' % host
    writer.write(header.encode('utf-8'))
    yield from writer.drain()
    while True:
        line = yield from reader.readline()
        if line == b'\r\n':
            break
        print('%s header > %s' % (host, line.decode('utf-8').rstrip()))
    # Ignore the body, close the socket
    writer.close()

loop = asyncio.get_event_loop()
tasks = [wget(host) for host in ['www.sina.com.cn', 'www.sohu.com', 'www.163.com']]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
```

### 0x04 async/await
在 python 3.5 时引入了 async/await

* 关于asyncio的一些关键字的说明
    * event_loop  
    事件循环：程序开启一个无限循环，把一些函数注册到事件循环上，当满足事件发生的时候，调用相应的协程函数
    * coroutine  
    协程对象，指一个使用async关键字定义的函数，它的调用不会立即执行函数，而是会返回一个协程对象。协程对象需要注册到事件循环，由事件循环调用。
    * task  
    一个协程对象就是一个原生可以挂起的函数，任务则是对协程进一步封装，其中包含了任务的各种状态
    * future  
    代表将来执行或没有执行的任务的结果。它和task没有本质上的区别
    * async/await  
    async定义一个协程，await就像生成器里的yield一样用于挂起阻塞的异步调用接口。

* async和await是针对coroutine的新语法，要使用新的语法，只需要做两步简单的替换：
    * 把@asyncio.coroutine替换为async；
    * 把yield from替换为await。


* hello world 示例

```
@asyncio.coroutine
def hello():
    print("Hello world!")
    r = yield from asyncio.sleep(1)
    print("Hello again!")

# 改为如下代码：

async def hello():
    print("Hello world!")
    r = await asyncio.sleep(1)
    print("Hello again!")
```

* 使用asyncio创建任务运行，并给task指定callback得到执行结果

```
import asyncio

async def do_some_work(x):
    print("waiting:", x)
    return "Done after {}s".format(x)

def callback(future):
    result = future.result()
    print('callback:',result)

def run1():
    loop = asyncio.get_event_loop() # 定义一个事件loop
    coroutine = do_some_work(2) # 定义协程对象，它不能直接运行
    # 将协程加入到事件循环 loop：其实 run_until_complete 内部将协程包装成了一个任务(task)对象了
    # task 对象是 Future 类的子类，保存了协程运行后的状态，用于未来获取协程的结果
    result = loop.run_until_complete(coroutine)
    print(result)
    loop.close()

def run2():
    loop = asyncio.get_event_loop() # 定义一个事件loop
    coroutine = do_some_work(1) # 定义协程对象，它不能直接运行
    task = loop.create_task(coroutine) # 创建 task
    # task = asyncio.ensure_future(coroutine) # 也可以使用asyncio.ensure_future创建 task
    task.add_done_callback(callback) # 回调函数，获取task的返回值
    loop.run_until_complete(task) # 将task加入到事件循环 loop
    loop.close()
```

* 使用 asyncio 并发执行协程

异步和并发与并行并没有关系，异步用于表示并发或并行任务的印象

```
import asyncio

async def do_some_work(x):
    print("waiting:", x)
    await asyncio.sleep(x)
    return "Done after {}s".format(x)

def callback(future):
    print('callback',future.result())

def run1():
    # 4s 后结果同时返回
    tasks = [asyncio.ensure_future(do_some_work(x)) for x in [2, 1, 4]]
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(tasks))
    for task in tasks:
        result = task.result()
        print(result)
    loop.close()

def run2():
    # 1s、2s、4s 分别返回结果
    tasks = [asyncio.ensure_future(do_some_work(x)) for x in [2,1,4]]
    for task in tasks:
        task.add_done_callback(callback)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
```

* 停止协程

```
import asyncio

async def do_some_work(x):
    print("waiting:", x)
    await asyncio.sleep(x)
    return "Done after {}s".format(x)

def callback(future):
    print('callback',future.result())

def run():
    # 1s、2s、4s 分别返回结果
    tasks = [asyncio.ensure_future(do_some_work(x)) for x in [2,1,4]]
    for task in tasks:
        task.add_done_callback(callback)

    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(asyncio.wait(tasks))
    except KeyboardInterrupt as e:
        for task in asyncio.Task.all_tasks():
            print(task.cancel())
        loop.stop()
        # loop stop 之后还需要再次开启事件循环，最后再 close，不然还会抛出异常
        loop.run_forever()
    finally:
        loop.close()
```

### 0x05 协程与线程配合使用
```
import asyncio
import threading

async def do_some_work(x):
    print("waiting:", x)
    await asyncio.sleep(x)
    return "Done after {}s".format(x)

def callback(future):
    print('callback',future.result())

def start_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

def run():
    # 在子线程中运行协程loop
    sub_loop = asyncio.new_event_loop()
    thread = threading.Thread(target=start_loop, args=(sub_loop,))
    thread.start()

    # 在主线程给子线程的 loop 添加协程任务
    futures = [asyncio.run_coroutine_threadsafe(do_some_work(x), sub_loop) for x in [2,1,4]]
    for future in futures:
        future.add_done_callback(callback)

    print('test...')
    
    try:
        while True:pass
    except KeyboardInterrupt as e:
        import sys;sys.exit('user aborted!')
    finally:
        sub_loop.call_soon_threadsafe(sub_loop.stop)

run()
```
```
➜  python3 tmp.py
waiting: 2
test...
waiting: 1
waiting: 4
callback Done after 1s
callback Done after 2s
callback Done after 4s
^Cuser aborted!
```



<br>
#### Reference(侵删)：
* [https://www.cnblogs.com/zhaof/p/8490045.html](https://www.cnblogs.com/zhaof/p/8490045.html?_blank)
* [https://www.liaoxuefeng.com/wiki/1016959663602400/1017970488768640](https://www.liaoxuefeng.com/wiki/1016959663602400/1017970488768640?_blank)

