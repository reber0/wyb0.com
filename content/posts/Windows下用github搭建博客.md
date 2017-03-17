+++
date = "2016-05-10T09:24:07+08:00"
description = ""
draft = false
tags = ["git", "windows"]
title = "Windows下用github搭建博客"
topics = ["Git"]

+++

## 首先在github上新建仓库
> {{% fluid_img src="/img/post/win_github_blog_new_repository1.png" alt="在github上新建仓库1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/win_github_blog_new_repository2.png" alt="在github上新建仓库2.png" %}}

## 本地新建仓库
* 下载安装hugo
{{% fluid_img src="/img/post/win_github_blog_install_hugo.png" alt="本地安装hugo.png" %}}

* 为hugo添加环境变量
{{% fluid_img src="/img/post/win_github_blog_hugo_add_env.png" alt="为hugo添加环境变量.png" %}}

* 下载安装github客户端
{{% fluid_img src="/img/post/win_github_blog_install_github.png" alt="安装github客户端.png" %}}

* 新建仓库
{{% fluid_img src="/img/post/win_github_blog_local_new_repository.png" alt="新建仓库.png" %}}

* 下载主题  
可以在https://github.com/spf13/hugoThemes 下载你喜欢的主题  
{{% fluid_img src="/img/post/win_github_blog_download_theme.png" alt="下载博客主题.png" %}}

* 使用主题并查看效果
{{% fluid_img src="/img/post/win_github_blog_use_theme_and_start_server.png" alt="使用主题并启动服务.png" %}}
<br /><br />
{{% fluid_img src="/img/post/win_github_blog_view_blog.png" alt="本地查看博客效果.png" %}}

## 本地环境配置
* 本地生成秘钥
{{% fluid_img src="/img/post/win_github_blog_local_create_key.png" alt="本地生成key.png" %}}

* 在github保存秘钥
{{% fluid_img src="/img/post/win_github_blog_github_add_key1.png" alt="向github添加key1.png" %}}
<br /><br />
{{% fluid_img src="/img/post/win_github_blog_github_add_key2.png" alt="向github添加key2.png" %}}
<br /><br />
{{% fluid_img src="/img/post/win_github_blog_github_add_key3.png" alt="向github添加key3.png" %}}

* 测试公钥是否添加成功
{{% fluid_img src="/img/post/win_github_blog_check_add_key.png" alt="查看公钥是否添加成功.png" %}}

* 设置本地用户名和邮箱
{{% fluid_img src="/img/post/win_github_blog_local_set_username_email.png" alt="设置本地用户名和邮箱.png" %}}

## 配置config.toml
> ```
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

## 同步本地和远程仓库
* 用hugo将markdown文档生成html
{{% fluid_img src="/img/post/win_github_blog_md_to_html.png" alt="用hugo将markdown文档生成html.png" %}}

* 初始化本地仓库并与远程仓库建立联系
{{% fluid_img src="/img/post/win_github_blog_init.png" alt="初始化本地仓库并与远程仓库建立联系.png" %}}

* 添加生成的html、为本次push做注释、推送
{{% fluid_img src="/img/post/win_github_blog_add_html.png" alt="添加生成的html.png" %}}
<br /><br />
{{% fluid_img src="/img/post/win_github_blog_add_annotation.png" alt="为本次push做注释.png" %}}
<br /><br />
{{% fluid_img src="/img/post/win_github_blog_push_html.png" alt="推送生成的html.png" %}}

## 访问博客
> 直接访问http://reber-9.github.io 即可