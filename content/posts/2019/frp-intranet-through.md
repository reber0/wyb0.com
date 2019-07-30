+++
title = "FRP 内网穿透"
topics = ["Pentest"]
tags = ["intranet"]
description = "渗透测试时的内网穿透工具 frp"
date = "2019-07-30T23:27:54+08:00"
draft = false
+++

<!--
 * @Author: reber
 * @Mail: reber0ask@qq.com
 * @Date: 2019-07-30 23:27:54
 * @LastEditTime: 2019-07-31 02:27:29
 -->

### 0x00 对外提供简单的文件访问服务
* 服务端

```ini
➜  frp cat frps.ini
[common]
; 监听端口
bind_port = 7000

; 那些端口允许客户端用来映射
allow_ports = 22-80,3000,33389
```
```
➜  frp ./frps -c frps.ini
2019/07/31 00:22:31 [I] [service.go:139] frps tcp listen on 0.0.0.0:7000
2019/07/31 00:22:31 [I] [root.go:204] Start frps success
```

* 客户端

```ini
C:\Users\Administrator\Desktop\frp>type frpc.ini
[common]
server_addr = 66.123.35.123
server_port = 7000

[test_static_file]
type = tcp
; 文件服务的端口
remote_port = 3000

; 启用插件
plugin = static_file
; 要对外暴露的文件目录
plugin_local_path = C:\\Users\Administrator\Desktop\frp_file
; 访问 url 中会被去除的前缀，保留的内容即为要访问的文件路径
plugin_strip_prefix = myfile

; 301 认证
plugin_http_user = admin
plugin_http_passwd = 123456
```
```
C:\Users\Administrator\Desktop\frp>frpc.exe -c frpc.ini
2019/07/31 00:36:05 [I] [service.go:221] login to server success, get run id [c8
aef41d5862b79f], server udp port [0]
2019/07/31 00:36:05 [I] [proxy_manager.go:137] [c8aef41d5862b79f] proxy added: [
test_static_file]
2019/07/31 00:36:05 [I] [control.go:144] [test_static_file] start proxy success
```

* 访问  
浏览器直接访问 ```http://66.123.35.123:3000/myfile/``` 即可访问到 frp_file 中的文件

### 0x01 使用 frp 进行内网 3389 端口转发并加密压缩
* 服务端

```ini
➜  frp cat frps.ini
[common]
bind_port = 7000
➜  frp ./frps -c frps.ini
2019/07/30 23:31:31 [I] [service.go:139] frps tcp listen on 0.0.0.0:7000
2019/07/30 23:31:31 [I] [root.go:204] Start frps success
```

* 客户端

```ini
C:\Users\Administrator\Desktop\frp>type frpc.ini
[common]
server_addr = 66.123.35.123
server_port = 7000

[rdp]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 33389

; 加密压缩
use_encryption = true
use_compression = true
```
```
C:\Users\Administrator\Desktop\frp>frpc.exe -c frpc.ini
2019/07/30 23:32:38 [I] [service.go:221] login to server success, get run id [ce
144f7511f63353], server udp port [0]
2019/07/30 23:32:38 [I] [proxy_manager.go:137] [ce144f7511f63353] proxy added: [
rdp]
2019/07/30 23:32:38 [I] [control.go:144] [rdp] start proxy success
```

* 本地

本地直接用软件连接服务端的 33389 端口就连接上内网主机的 3389 了

### 0x02 只让特定的人使用 frp 进行内网 3389 端口转发
* 服务端

```ini
➜  frp cat frps.ini
[common]
bind_port = 7000
```
```
➜  frp ./frps -c frps.ini
2019/07/30 23:31:31 [I] [service.go:139] frps tcp listen on 0.0.0.0:7000
2019/07/30 23:31:31 [I] [root.go:204] Start frps success
```

* 客户端(添加 sk , 不需要指定远程端口)

```
[common]
server_addr = 66.123.35.123
server_port = 7000

[secret_rdp]
; 使用 stcp(secret tcp) 类型的代理
type = stcp
; 只有 sk 一致的主机才能访问
sk = Aa123456.
local_ip = 127.0.0.1
local_port = 3389
```

* 本机(sk 要和客户端的 sk 一致)

    * 启动 frc client

    > ```ini
    [23:47 reber@wyb at /opt/frp]
    ➜  cat frpc.ini
    [common]
    server_addr = 66.123.35.123
    server_port = 7000

    [secret_rdp_visitor]
    type = stcp
    role = visitor
    server_name = secret_rdp
    sk = Aa123456.
    bind_addr = 127.0.0.1
    bind_port = 3333
    ```
    <br>
    > ```
    [23:47 reber@wyb at /opt/frp]
    ➜  ./frpc -c frpc.ini
    2019/07/30 23:48:01 [I] [service.go:221] login to server success, get run id [53c2545a4f53d070], server udp port [0]
    2019/07/30 23:48:01 [I] [visitor_manager.go:69] [secret_rdp_visitor] start visitor success
    2019/07/30 23:48:01 [I] [visitor_manager.go:112] visitor added: [secret_rdp_visitor]
    ```

    * 连接内网主机的 3389 端口  
    使用软件连接本地的 3333 端口就连接上内网主机的 3389 了

### 0x03 点对点内网穿透
frp 提供了一种新的代理类型 xtcp 用于应对在希望传输大量数据且流量不经过服务器的场景。

使用方式同 stcp 类似，需要在两边都部署上 frpc 用于建立直接的连接。

目前处于开发的初级阶段，穿透成功率较低，并能穿透所有类型的 NAT 设备，当穿透失败时可以尝试 stcp 的方式。

* 服务端

```
➜  frp cat frps.ini
[common]
bind_port = 7000
bind_udp_port = 7001
```
```
➜  frp ./frps -c frps.ini
2019/07/31 00:08:16 [I] [service.go:139] frps tcp listen on 0.0.0.0:7000
2019/07/31 00:08:16 [I] [service.go:221] nat hole udp service listen on 0.0.0.0:7001
2019/07/31 00:08:16 [I] [root.go:204] Start frps success
```

* 客户端

```ini
C:\Users\Administrator\Desktop\frp>type frpc.ini
[common]
server_addr = 66.123.35.123
server_port = 7000

[p2p_secret_rdp]
type = xtcp
; 只有 sk 一致的用户才能访问到此服务
sk = Aa123456.
local_ip = 127.0.0.1
local_port = 3389
```
```
C:\Users\Administrator\Desktop\frp>frpc.exe -c frpc.ini
2019/07/31 00:09:40 [I] [service.go:221] login to server success, get run id [5f
5ae596bca6c952], server udp port [7001]
2019/07/31 00:09:40 [I] [proxy_manager.go:137] [5f5ae596bca6c952] proxy added: [
p2p_secret_rdp]
2019/07/31 00:09:40 [I] [control.go:144] [p2p_secret_rdp] start proxy success
```

* 本机(sk 要和客户端的 sk 一致)

    * 启动 frc client

    > ```ini
    [0:11 reber@wyb at /opt/frp]
    ➜  cat frpc.ini
    [common]
    server_addr = 66.123.35.123
    server_port = 7000

    [p2p_secret_rdp_visitor]
    type = xtcp
    role = visitor
    server_name = p2p_secret_rdp
    sk = Aa123456.
    bind_addr = 127.0.0.1
    bind_port = 3333
    [0:11 reber@wyb at /opt/frp]
    ```
    <br>
    > ```
    ➜  ./frpc -c frpc.ini
    2019/07/31 00:11:26 [I] [service.go:221] login to server success, get run id [10ab791e3194ccac], server udp port [7001]
    2019/07/31 00:11:26 [I] [visitor_manager.go:69] [p2p_secret_rdp_visitor] start visitor success
    2019/07/31 00:11:26 [I] [visitor_manager.go:112] visitor added: [p2p_secret_rdp_visitor]
    ```

    * 连接内网主机的 3389 端口  
    使用软件连接本地的 3333 端口就连接上内网主机的 3389 了

