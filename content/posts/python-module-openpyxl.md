+++
date = "2016-11-25T17:44:23+08:00"
description = "python中openpyxl模块的使用,可以用来操作excel文件"
draft = false
tags = ["python", "module"]
title = "使用Python的openpyxl模块读写xlsx文件"
topics = ["Python"]

+++

![夏目友人帐](/img/anime/anime001.jpg)

### 0x00 openpyxl模块
这个模块可以让你读写excel文件

### 0x01 读取数据
![40](/img/post/openpyxl_excel.png)
代码如下：
```
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from openpyxl import load_workbook

wb = load_workbook(filename='aa.xlsx')

sheetnames = wb.get_sheet_names() #获得所有表名
print u"存在表：%s" % sheetnames

ws = wb.get_sheet_by_name(sheetnames[0])
print u"第一张表表名为：%s" % ws.title  #Sheet1
rows = ws.max_row  #行数
columns = ws.max_column  #列数
print "表%s有%d行%d列" % (ws.title,rows,columns)  #10 2  共10行2列


print
print u"取部分数据："
print ws['A1'].value,ws['B1'].value  
print ws['A2'].value,ws['B2'].value
print ws.cell(row=1, column=2).value

print u"\n输出表%s的所有数据：" % ws.title
for x in range(1,rows+1):
    for y in range(1,columns+1):
        print ws.cell(row=x,column=y).value,'\t',
    print
```

结果如下：
![40](/img/post/openpyxl_result.png)

### 0x02 写入数据
代码如下：
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from openpyxl import Workbook

wb = Workbook()

# 建表
ws1 = wb.active # 第一张表需要这样写，代表从第一张表开始
ws1.title = 's1'
ws2 = wb.create_sheet(title='s2')
ws3 = wb.create_sheet(title='s3')

# 写入数据
ws1['A1'] = 1111
ws1['A2'] = 2222
ws1['A3'] = 3333
ws2['A1'] = 'ssssssssss'
ws2['B1'] = 'dddddddddd'
for x in range(1,4):
    for y in range(1,8):
        v = int(str(x)+str(y))
        _ = ws3.cell(column=x,row=y,value=v)

wb.save(filename='test.xlsx') # 保存数据
```

结果如下：
![50](/img/post/openpyxl_write.png)

### 0x03 实际案例
```ini
$ ls
111.txt 222.txt t2x.py
$ cat 111.txt
aaa--111--AAA
bbb--222--BBB
ccc--333--CCC
ddd--444--DDD
$ cat 222.txt
hello--xiaoming--hello,world!
test--xiaohua--This is a test message.
weather--lihua--It will be sunny tomorrow.
```
以-\-进行分割，写入xlsx
```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# code by reber <1070018473@qq.com>

from openpyxl import Workbook

def write2xlsx():
    def get_content(filename):
        data = []
        with open(filename) as f:
            lines = f.readlines()
            for line in lines:
                data.append(line.strip().split('--'))
        return data

    def write2sheet(ws,filename):
        data = get_content(filename)
        # print data
        for x in range(1,len(data)+1): #第几行
            for y in xrange(1,4): #第几列
                print data[x-1][y-1],
                _ = ws.cell(row=x,column=y,value=data[x-1][y-1])
            print

    wb = Workbook()
    fs = ['111.txt','222.txt']
    for index,filename in enumerate(fs):
        sheet_name = filename.split('.')[0]
        ws = wb.create_sheet(title=sheet_name,index=index)
        write2sheet(ws, filename)
    wb.save(filename='test.xlsx')

write2xlsx()
```
![60](/img/post/20190116-123847.png)