+++
date = "2016-05-10T09:24:07+08:00"
description = ""
draft = false
tags = ["git"]
title = "Windows下用github搭建博客"
topics = ["Windows", "Git"]

+++

### 0x00 首先在github上新建仓库
![在github上新建仓库1](/img/post/win_github_blog_new_repository1.png)

![在github上新建仓库2](/img/post/win_github_blog_new_repository2.png)

### 0x01 本地新建仓库
* 下载安装hugo
![本地安装hugo](/img/post/win_github_blog_install_hugo.png)

* 为hugo添加环境变量
![为hugo添加环境变量](/img/post/win_github_blog_hugo_add_env.png)

* 下载安装github客户端
![安装github客户端](/img/post/win_github_blog_install_github.png)

* 新建仓库
![新建仓库](/img/post/win_github_blog_local_new_repository.png)

* 下载主题  
可以在https://github.com/spf13/hugoThemes 下载你喜欢的主题  
![下载博客主题](/img/post/win_github_blog_download_theme.png)

* 使用主题并查看效果
![使用主题并启动服务](/img/post/win_github_blog_use_theme_and_start_server.png)
![本地查看博客效果](/img/post/win_github_blog_view_blog.png)

### 0x02 本地环境配置
* 本地生成秘钥
![本地生成key](/img/post/win_github_blog_local_create_key.png)

* 在github保存秘钥
![向github添加key1](/img/post/win_github_blog_github_add_key1.png)
![向github添加key2](/img/post/win_github_blog_github_add_key2.png)
![向github添加key3](/img/post/win_github_blog_github_add_key3.png)

* 测试公钥是否添加成功
![查看公钥是否添加成功](/img/post/win_github_blog_check_add_key.png)

* 设置本地用户名和邮箱
![设置本地用户名和邮箱](/img/post/win_github_blog_local_set_username_email.png)

### 0x03 配置config.toml
```
# 将reber-9全部替换为你github的账户名，另外你也可以进行一些基本的设置
baseurl = "http://reber-9.github.io"
languageCode = "en-us"
title = "reber-9's Blog"
theme = "beautifulhugo"
pygmentsUseClasses = false
#disqusShortname = "XXX"
#googleAnalytics = "XXX"

[Params]
  logo = "img/avatar-icon.png"
  subtitle = "This is my personal blog"

[Author]
  name = "Some Person"
  email = "123123123@163.com"
  github = "reber-9"

[[menu.main]]
    name = "Blog"
    url = "/"
    weight = 1

[[menu.main]]
    name = "About"
    url = "/page/about/"
    weight = 2
```

### 0x04 同步本地和远程仓库
* 用hugo将markdown文档生成html
![用hugo将markdown文档生成html](/img/post/win_github_blog_md_to_html.png)

* 初始化本地仓库并与远程仓库建立联系
![初始化本地仓库并与远程仓库建立联系](/img/post/win_github_blog_init.png)

* 添加生成的html、为本次push做注释、推送
![添加生成的html](/img/post/win_github_blog_add_html.png)
![为本次push做注释](/img/post/win_github_blog_add_annotation.png)
![推送生成的html](/img/post/win_github_blog_push_html.png)

### 0x05 访问博客
直接访问http://reber-9.github.io 即可