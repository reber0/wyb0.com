+++
date = "2016-11-25T17:44:23+08:00"
description = "python中openpyxl模块的使用,可以用来操作excel文件"
draft = false
tags = ["python", "python模块"]
title = "Python的openpyxl模块"
topics = ["Python"]

+++

> {{% fluid_img src="/img/anime/anime001.jpg" alt="夏目友人帐" %}}

### 0x00 openpyxl模块
> ```
这个模块可以让你读写excel文件
```

### 0x01 读取数据
> {{% fluid_img src="/img/post/openpyxl_excel.png" alt="excel数据" %}}
<br /><br />
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

> 结果如下：
{{% fluid_img src="/img/post/openpyxl_result.png" alt="excel数据提取结果" %}}

### 0x02 写入数据
> 代码如下：
> ```python
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

> 结果如下：
{{% fluid_img src="/img/post/openpyxl_write.png" alt="向excel写入数据" %}}