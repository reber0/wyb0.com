+++
date = "2016-02-05T11:38:23+08:00"
description = ""
draft = false
tags = ["python","正则"]
title = "Python的正则"
topics = ["Python"]

+++

## 正则表达式
> 正则表达式是用来匹配字符串的异常强大的东西，可以用来匹配邮箱、域名等字符串

## 原子字符
> {{% fluid_img src="/img/post/regular_atomic_character.png" alt="正则的原子字符" %}}

## 元字符
> {{% fluid_img src="/img/post/regular_metacharacters.png" alt="正则的元字符" %}}

## 修饰符
> {{% fluid_img src="/img/post/regular_modifier.png" alt="正则的修饰符" %}}

## re模块
> 由于Pyton的字符串本身也用\转义，强烈建议使用r前缀

* 函数match()  
这个函数会尝试从字符串起始位置匹配一个模式，未匹配到则返回None
{{% fluid_img src="/img/post/regular_re_match.png" alt="re模块的match函数" %}}

* 函数search()  
这个函数会扫描整个字符串并返回第一个成功的匹配，未匹配到则返回None
{{% fluid_img src="/img/post/regular_re_search.png" alt="re模块的match函数" %}}

* 函数findall()和finditer()  
re.findall()将以列表的形式返回所有能匹配到的字符  
re.finditer()将以迭代器的形式返回所有能匹配到的字符
{{% fluid_img src="/img/post/regular_re_findall_finditer.png" alt="re的findall和finditer" %}}

* 函数sub()  
这个函数会对字符串进行匹配，然后替换，可以指定替换次数
{{% fluid_img src="/img/post/regular_re_sub.png" alt="re的sub函数" %}}

* 函数split()  
这个函数会以正则来分割字符串，以列表样式返回
{{% fluid_img src="/img/post/regular_re_split.png" alt="re的split函数" %}}

* 函数compile()  
这个函数可以编译正则，提高匹配速度
{{% fluid_img src="/img/post/regular_re_compile.png" alt="re的compile函数" %}}

## 提取子串  
> 根据正则可以匹配字符然后提取出来，用括号表示要提取的分组
{{% fluid_img src="/img/post/regular_re_get_substr.png" alt="提取子串" %}}

## 贪婪匹配
> 正则表达式默认贪婪匹配，会尽可能的多匹配字符，一般就是用"？"来抑制贪婪匹配
{{% fluid_img src="/img/post/regular_re_not_greed_match .png" alt="非贪婪匹配" %}}