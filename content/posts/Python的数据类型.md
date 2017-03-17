+++
date = "2016-01-19T13:47:17+08:00"
description = ""
draft = false
tags = ["python"]
title = "Python的数据类型"
topics = ["Python"]

+++

### 0x00 特点及差别
> ```
常见4种数据类型：list、tuple、dict、set

list即列表，它内部是有序的，可以添加、更新、删除元素
tuple是元组，它的内部也是有序的，但一般不可更新、删除，即内部元素不可变
dict即字典，它的内部无序，key不可变、不可重复，key值可更新，可删除键值对
set可用作求交集、并集等，它的内部无序，key不可变、不可重复，可添加和删除
```

### 0x01 操作示例
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

#######################################
print '-----list-----'
L = [] #这样就可以声明一个list了
n = 1
while n <= 9:
    L.append(n) #添加
    n = n + 2
print L #[1,3,5,7,9]
L[len(L)-1] = 11 #更新
print L #[1,3,5,7,11]
L.pop() #删除,和L.pop(-1)一样
L.pop(-2)
print L #[1,3,7]
L.insert(1,'jack')
for x in range(len(L)):
    print L[x], #逗号可抑制换行，结果为 1 jack 3 7
print '\n-----list-----\n'
#######################################
print '-----tuple-----'
T =('Michael','Bob','Tracy')
print T #['Michael', 'Bob', 'Tracy']
for x in range(len(T)):
    print T[x], # Michael Bob Tracy
print '\n-----tuple-----\n'
#######################################
print '-----dict-----'
D = {'Adam':95,'Lisa':90,'Bart':75}
print D #{'Lisa': 90, 'Adam': 95, 'Bart': 75}
D['Lisa'] = 99 #更新
D['Kongming'] = 'X'  #添加
print D #{'Lisa': 99, 'Kongming': 'X', 'Adam': 95, 'Bart': 75}
D.pop('Bart') #删除key和对应的值
print D #{'Lisa': 99, 'Kongming': 'X', 'Adam': 95}
print D.get('Adam')
for key in D:
    print (key), #Lisa Kongming Adam
print #单个print默认为换行
for key in D:
    print (D[key]), #99 X 95
print '\n-----dict-----\n'
#######################################
print '-----set-----'
S = set(['a','b','c','d','d','e'])
print S #set(['a', 'c', 'b', 'e', 'd'])
S.remove('b') #删除
print S # set(['a', 'c', 'e', 'd'])
S.add(5) #添加
for x in S:
    print x, #a c e d 5
print '\n-----set-----'
```
<br>
{{% fluid_img src="/img/post/python_data_type.png" alt="python数据的操作" %}}

### 0x02 切片
> ```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

L = ['Michael','Sarah','Tracy','Bob','Jack']
r = []
for i in range(3): #i的值为0、1、2
    r.append(L[i]) #取前3个元素依次添加到r
print r

#切片取前3个元素,L[1:3]表示从索引1开始取,直到索引3为止,但不包括索引3
print L[1:3]
print L[:2] #第一个索引为0,可以省略
print L[-2:] #倒数第一个元素的索引是-1

L = range(20) #取0-19
print L
print L[:10] #取前10个数
print L[-10:] #取后10个数
print L[:10:2] #取前10个数,且每两个取一个,即取2的倍数
print L[::5] #所有数每5个取1个,取5的倍数
print L[:] #原样复制一个list
LL = L[::]  #LL的值将和L中的一样，就是复制了
SS = L[::-1]  #SS的内容为L内容的倒序

#tuple也是一种list，唯一区别是tuple不可变，它也可用切片操作
print (1,2,3,4,5)[:3]
#字符串'xxx'或Unicode字符串u'xxx'也可看成一种list
print 'abcdefg'[1:4]
```
<br>
{{% fluid_img src="/img/post/python_slice.png" alt="python的切片" %}}

### 0x03 迭代
> 通过for循环遍历list或tuple这种遍历在python中称为迭代
```python
d = {'a':1,'b':2,'c':3}
for k,v in d.iteritems():
    print k,v
for k in d:
    print k,
print
for v in d.itervalues():
    print v,
print
for x,y in [(1,1),(2,4),(3,9)]: #python可一次将多个值赋给多个变量
    print x,y
```
<br>
{{% fluid_img src="/img/post/python_iteration.png" alt="python的迭代" %}}

### 0x04 解析json
* 常用函数
    * json.dumps()
        * 编码：把一个Python对象编码转换成Json字符串
    * json.loads()
        * 解码：把Json格式字符串解码转换成Python对象
    
    > {{% fluid_img src="/img/post/python_json.png" alt="python解析json" %}}

* 排序和缩进

> {{% fluid_img src="/img/post/python_sort_and_indent.png" alt="排序和缩进" %}}