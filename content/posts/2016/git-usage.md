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

### 0x05 添加大文件
```
GitHub 限制上传 100M 的文件
1、brew install git-lfs
2、cd 到 git 文件夹执行 git lfs install
3、git lfs track "./xxx/aaa" 添加 aaa 文件，生成 .gitattributes 文件
4、git add .gitattributes
5、git commit -m "add gitattributes"
6、git push origin master
此时再添加大文件即可上传
1、git add ./xxx/aaa
2、git commit -m "add aaa"
3、git push origin master
```

### 0x06 分支
* 切换分支后，分支的更改不会影响原来分支，
* 切换分支后，分支更改后需要add，然后commit
* git checkout -b test可以创建分支同时切换

![分支](/img/post/git_branch.png)

### 0x07 更新和合并
```
git pull 可以同步github上的数据到本地
git merge test 可以将test分支的改动合并到当前分支
```

### 0x08 查看状态
```
git status
```

### 0x09 撤回

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

* 删除 commit 历史记录

    > 比如不小心在 add aa.py 这个操作里提交了密码

    * 查看 log: `git log --pretty=oneline --abbrev-commit`

    > ```
    36dd82f (HEAD -> master, origin/master, origin/HEAD) add main.py
    048715f add aa.py
    0551909 add 123.txt
    fb13042 add test.txt
    f7c2baa Initial commit
    (END)
    ```
    得到前一个 commit 的 id，即 add 123.txt 操作的 id 0551909

    * 变基，删除 log: git rebase -i 0551909
    
    > 将

    > ```
    1 pick 048715f add aa.py
    2 pick 36dd82f add main.py
    ```

    > 改为

    > ```
    1 drop 048715f add aa.py
    2 pick 36dd82f add main.py
    ```

    * 强制推送 git push -f origin master，此时 add aa.py 这个历史 commit 就没有了

    > ```
    c695a20 (HEAD -> master, origin/master, origin/HEAD) add main.py
    0551909 add 123.txt
    fb13042 add test.txt
    f7c2baa Initial commit
    (END)
    ```

* 文件恢复

```
1.若用的 rm 删除文件，那就相当于只删除了工作区的文件，直接用git checkout -- <file>即可恢复
2.若用 git rm 删除文件，则删除文件的同时且操作被添加到了暂存区，即暂存区的文件也被删了，需要先 git reset HEAD <file>，然后再 git checkout -- <file> 恢复
3.若先用了 git rm，而且 git commit 了，那只能 git reset --hard HEAD^ 恢复，或者 git reset --hard <add 时的 id>
```

### 0x0A 多用户
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