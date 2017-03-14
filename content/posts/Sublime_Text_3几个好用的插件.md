+++
date = "2016-09-02T23:07:44+08:00"
description = ""
draft = false
tags = ["sqblime text", "插件"]
title = "Sublime Text 3几个好用的插件"
topics = ["Miscellanea"]

+++

### 0x00 Package Control
> 安装完这个插件后可以更容易的管理(安装、删除、查看等)其他插件  

* 代码安装  
ctrl+~快捷键调出console，将下面代码粘贴进去，然后Enter执行(注意单引号)

> ```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

* 手动安装  
    * 点击https://sublime.wbond.net/Package%20Control.sublime-package 下载文件
    * 将下载的文件放在root path/Data/Installed Packages下
    * 重启Sublime Text
* 使用方法
    * Ctrl+Shift+P调出菜单然后选择相应操作
    {{% fluid_img src="/img/post/sublime_package_control1.png" alt="插件Package Control1" %}}
    * Preferences -> Package Control也可调出
    {{% fluid_img src="/img/post/sublime_package_control2.png" alt="插件Package Control2" %}}
    * 选择Install Package后可以输入想安装的插件名搜索安装
    {{% fluid_img src="/img/post/sublime_install.png" alt="插件安装" %}}

### 0x01 Emmet
> 前端必备插件，前身是Zen Coding，可高效编写HTML和CSS(需要依赖PyV8，会自动安装)
{{% fluid_img src="/img/post/sublime_emmet.png" alt="插件Emmet" %}}
<br /><br />
<a href='http://emmet.io/'>{{% fluid_img src="/img/post/sublime_emmet_demo.png" alt="插件Emmet示例" %}}</a>

### 0x02 Anaconda
> 可以自动补全并提示语法，还可跳转到定义、使用等
{{% fluid_img src="/img/post/sublime_anaconda_set.png" alt="插件Anaconda设置" %}}
<br /><br />
{{% fluid_img src="/img/post/sublime_anaconda_set_default.png" alt="插件Anaconda设置默认选项" %}}
<br /><br />
{{% fluid_img src="/img/post/sublime_anaconda_set_user.png" alt="插件Anaconda设置用户选项" %}}
<br /><br />
{{% fluid_img src="/img/post/sublime_anaconda_add_file.png" alt="插件Anaconda处理补全问题" %}}

> 效果如下：
{{% fluid_img src="/img/post/sublime_anaconda.png" alt="插件Anaconda" %}}

### 0x03 Git
> 在编辑器就可以执行git命令，有github的开发者必备
{{% fluid_img src="/img/post/sublime_git.png" alt="插件Git" %}}


### 0x04 GitGutter
> 在有了Git插件后，GitGutter 更好的帮助开发者查看文件之前的改动和差异，提升开发效率
{{% fluid_img src="/img/post/sublime_gitgutter.png" alt="插件GitGutter" %}}

### 0x05 Markdown Preview
> 可以在本地预览文件
{{% fluid_img src="/img/post/sublime_markdown_preview.png" alt="插件Markdown Preview" %}}
<br /><br />
{{% fluid_img src="/img/post/sublime_markdown_preview_html.png" alt="插件Markdown Preview预览" %}}

### 0x06 DocBlokr
> 这个插件对于编码风格很严的编程语言很有帮助，可以生成标准的注释
{{% fluid_img src="/img/post/sublime_docblocr1.gif" alt="插件DocBlocr" %}}
<br /><br />
{{% fluid_img src="/img/post/sublime_docblocr2.gif" alt="插件DocBlocr" %}}

### 0x07 AutoFileName
> 快捷输入文件名
{{% fluid_img src="/img/post/sublime_autofilename.png" alt="插件AutoFileName" %}}

### 0x08 Theme-Flatland和Theme-SoDaReloaded
> 两个很不错的主题插件，安装好之后：首选项 -> 设置-用户，修改文件
{{% fluid_img src="/img/post/sublime_theme.png" alt="主题插件" %}}

### 0x09 Alignment
> 插件安装好后选中要对齐的文本，然后按Ctrl+Alt+a即可对齐"=","+", "-", "&", "|", "<",">"等符号
{{% fluid_img src="/img/post/sublime_alignment.gif" alt="插件Alignment" %}}

### 0x0A ConvertToUTF8
> 文件转码成utf-8

### 0x0B IMESupport
> 解决Sublime Text中文输入法不能跟随光标的问题

### 0x0C 光标所在行高亮显示
> 首选项->设置-用户，在文件中添加 "highlight_line":true

### 0x0E 后记
* 在安装插件时总出错提示"There are no packages available for installation"可以用上面提到的手动安装Package Control来解决，或者：
{{% fluid_img src="/img/post/sublime_end1.png" alt="后记1" %}}
* 有时Package Control不能下载插件时，可以直接下载插件，然后放在下面图示的文件夹中，然后重启Sublime Text使插件生效：
{{% fluid_img src="/img/post/sublime_end2.png" alt="后记2" %}}