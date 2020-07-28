+++
date = "2016-05-05T10:30:32+08:00"
description = ""
draft = false
tags = ["git"]
title = "Git的用法"
topics = ["Git"]

+++

### 0x00 创建仓库
```
git init
```

### 0x01 克隆
```
git clone git@github.com:reber0/wyb0.com.git
```

### 0x02 仓库连接到远程服务器
```
# 若没有克隆现有仓库则可以连接远程仓库：
git remote add origin git@github.com:reber-9/reber-9.com.git
```

### 0x03 忽略文件
```
$ cat .gitignore
# 忽略 log 文件夹下的文件
log/

# 忽略 Thumbs.db 这个文件
Thumbs.db

# 忽略 .sql 结尾的文件
data/*.sql
```

```
# 忽略 config.py 这个文件的更新，即 config.py 的内容改变是 git add 不会添加 config.py
$ git update-index --assume-unchanged config.py
```

### 0x04 添加和提交和推送
```
git add a.txt
git commit -m "add file a.txt"
git push origin master
```

### 0x05 分支
* 切换分支后，分支的更改不会影响原来分支，
* 切换分支后，分支更改后需要add，然后commit
* git checkout -b test可以创建分支同时切换

![分支](/img/post/git_branch.png)

### 0x06 更新和合并
```
git pull 可以同步github上的数据到本地
git merge test 可以将test分支的改动合并到当前分支
```

### 0x07 查看状态
```
git status
```

### 0x08 撤回

* 撤销 add
```bash
git reset HEAD  # 上一次add的文件全部撤销
git reset HEAD 1.txt  # 撤销 add 的 1.txt
```

* 查看 commit id
```
git log # 查看 commit 的 id  
git reflog # 查看 commit 的 id  
```

* 回退
```
git revert HEAD # 若push后,可撤销前一次 commit 
```

* 文件恢复

```
1.若用的 rm 删除文件，那就相当于只删除了工作区的文件，直接用git checkout -- <file>即可恢复
2.若用 git rm 删除文件，则删除文件的同时且操作被添加到了暂存区，即暂存区的文件也被删了，需要先 git reset HEAD <file>，然后再 git checkout -- <file> 恢复
3.若先用了 git rm，而且 git commit 了，那只能 git reset --hard HEAD^ 恢复，或者 git reset --hard <add 时的 id>
```

### 0x09 多用户
如果有多个用户时可进行如下设置
```
$ ssh-keygen -t rsa -b 2048 -f id_rsa_github -C "123456@qq.com"
$ ssh-keygen -t rsa -b 2048 -f id_rsa_gitlab -C "456789@qq.com"
$ vim config
    Host github.com
    HostName github.com
    User user2
    Port 22
    IdentityFile ~/.ssh/id_rsa_github

    Host 123.12.12.123
    HostName mygitlab.com
    User user1
    Port 2222
    IdentityFile ~/.ssh/id_rsa_gitlab
$ ls
    config  id_rsa_github.pub  id_rsa_gitlab.pub  id_rsa.pub
    id_rsa_github  id_rsa_gitlab      id_rsa      known_hosts

# 可以新建项目后在项目里执行下面两条命令配置局部用户名和邮箱
# 会在.git/config写入用户名和邮箱
git config --local user.name "reber-9"  
git config --local user.email "123456@qq.com"
```