+++
date = "2016-07-24T21:33:59+08:00"
description = ""
draft = false
tags = ["代理", "proxifier"]
title = "Windows下用Proxifier实现全局代理"
topics = ["Miscellanea"]

+++

### 0x00 环境
> 在windows下用Shadowsocks和Proxifier实现全局代理：
```
System：Windows10 Pro x64
Shadowsocks：Shadowsocks v2.5.2.0 
Proxifier：Proxifier Portable Edition v3.29
```

### 0x01 配置Shadowsocks
> {{% fluid_img src="/img/post/global_agent_set_shadowsocks.png" alt="Windows下实现全局代理-设置shadowsocks.png" %}}

### 0x02 配置Proxifier
* Proxifier添加代理服务
{{% fluid_img src="/img/post/global_agent_proxifier_add_proxy_servers1.png" alt="Windows下实现全局代理-添加代理服务1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/global_agent_proxifier_add_proxy_servers2.png" alt="Windows下实现全局代理-添加代理服务2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/global_agent_proxifier_check_proxy.png" alt="Windows下实现全局代理-检测添加的代理.png" %}}


* Proxifier添加规则
{{% fluid_img src="/img/post/global_agent_proxifier_set_rules1.png" alt="Windows下实现全局代理-设置规则1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/global_agent_proxifier_set_rules2.png" alt="Windows下实现全局代理-设置规则2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/global_agent_proxifier_add_rules1.png" alt="Windows下实现全局代理-添加规则1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/global_agent_proxifier_add_rules2.png" alt="Windows下实现全局代理-添加规则2.png" %}}


* 测试全局代理设置成功与否
{{% fluid_img src="/img/post/global_agent_test1.png" alt="Windows下实现全局代理-测试全局代理是否设置成功1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/global_agent_test2.png" alt="Windows下实现全局代理-测试全局代理是否设置成功2.png" %}}