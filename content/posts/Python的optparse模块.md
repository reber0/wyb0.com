+++
date = "2016-08-16T15:10:44+08:00"
description = ""
draft = false
tags = ["python", "optparse", "python模块"]
title = "Python的optparse模块"
topics = ["Python"]

+++

### 0x00 关于optparse模块
> python2.3之后添加的模块optparse是专门用来处理命令行选项的
```python
import optparse

parser = optparse.OptionParser(usage='Usage: %prog [options] domaion',
                                version='%prog 1.2')
parser.add_option('-b', '--bug', dest='isbug',
                    default=False, action='store_true',
                    help='Whether open the debug mode, default is false')
parser.add_option('-u', '--url', dest='url',
                    default=None, action='store', type='string',
                    help='target url')
parser.add_option('-n','--number',
                    dest='num', default=10, type='int',
                    help='the number, default is 10')

(options, args) = parser.parse_args()

print options
print args
print options.url
# parser.print_help() # show help message
```
{{% fluid_img src="/img/post/parser_example.png" alt="parser简单示例" %}}
<br /><br />
{{% fluid_img src="/img/post/parser_show_help_msg.png" alt="显示帮助信息" %}}

### 0x01 说明
> ```
在输出帮助信息时%prog会被脚本名代替
-b和--bug作用一样，一个是短标签一个是长标签
dest：它是存储变量值的变量名
default：默认的值
type：值的类型，默认为string，可以不用写
action：有3种类型
    默认action='store'，可以不用写
    action='store_true'使用参数时将布尔值true存储到dest指定的变量中
    action='store_false'使用参数时将布尔值false存储到dest指定的变量中
```