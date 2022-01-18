+++
date = "2016-05-05T10:30:32+08:00"
description = ""
draft = false
tags = ["git"]
title = "Git 的用法"
topics = ["Git"]

+++

### 0x00 仓库
```
// 创建仓库
git init

// 克隆
git clone git@github.com:reber0/wyb0.com.git

// 若没有克隆现有仓库则可以连接远程仓库
git remote add origin git@github.com:reber/reber.com.git

// 删除远程仓库信息
git remote rm origin
```

### 0x01 添加 SSH key
生成 key
```
➜ ssh-keygen -t rsa -b 2048 -f id_rsa_github -C "123456@qq.com"
```

将 ~/.ssh/ 下生成的 id_rsa_github.pub 的内容添加到 github

验证是否添加成功
```
➜ ssh -T git@github.com
Hi reber0! You've successfully authenticated, but GitHub does not provide shell access.
```

### 0x02 配置全局信息
配置全局用户名、邮箱
```
➜ git config --global user.name "reber0"
➜ git config --global user.email "123456@qq.com"
➜ git config -l
```

配置全局忽略文件
```
➜ cat ~/.gitignore_global
Thumbs.db // 忽略 Thumbs.db 这个文件
log/  // 忽略 log 文件夹下的文件
*.pyc // 忽略 .pyc 结尾的文件
```

查看配置
```
➜ cat ~/.gitconfig
[user]
        name = reber0
        email = 123456@qq.com
[filter "lfs"]
        process = git-lfs filter-process
        required = true
        clean = git-lfs clean -- %f
        smudge = git-lfs smudge -- %f
[core]
        excludesfile = /Users/reber/.gitignore_global

[init]
        defaultBranch = main
```

### 0x03 添加和提交和推送
```
git fetch // 查看远端文件改动
git status // 查看本地文件改动
git add a.txt
git commit -m "add file a.txt"
git push origin main
```

忽略文件更新
```
# 忽略 config.py 这个文件的更新，即 config.py 的内容改变时 git add 不会添加 config.py
➜ git update-index --assume-unchanged config.py
```

### 0x04 分支
初始化仓库
```sh
[15:46 reber@wyb at ~/temp/test]
➜ git init
已初始化空的 Git 仓库于 /Users/reber/temp/test/.git/
[15:48 reber@wyb at ~/temp/test git:(main) ✗]
➜ git add a.txt
[15:48 reber@wyb at ~/temp/test git:(main) ✗]
➜ git commit -m "add file a.txt"
[main（根提交） e23479e] add file a.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 a.txt
[15:48 reber@wyb at ~/temp/test git:(main)]
➜ ls
a.txt
```

新建分支，切换分支后，分支的更改不会影响原来分支，分支更改后需要 add，然后 commit
```
[15:48 reber@wyb at ~/temp/test git:(main)]
➜ git branch gh-pages
[15:48 reber@wyb at ~/temp/test git:(main)]
➜ git checkout gh-pages
切换到分支 'gh-pages'
[15:49 reber@wyb at ~/temp/test git:(gh-pages)]
➜ touch b.txt
[15:49 reber@wyb at ~/temp/test git:(gh-pages) ✗]
➜ git add b.txt
[15:49 reber@wyb at ~/temp/test git:(gh-pages) ✗]
➜ git commit -m "add file b.txt"
[gh-pages 12aa148] add file b.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 b.txt
[15:49 reber@wyb at ~/temp/test git:(gh-pages)]
➜ ls
a.txt b.txt
[15:49 reber@wyb at ~/temp/test git:(gh-pages)]
➜ git checkout main
切换到分支 'main'
[15:49 reber@wyb at ~/temp/test git:(main)]
➜ ls
a.txt
```

合并分支代码到主分支
```
[15:54 reber@wyb at ~/temp/test git:(main)]
➜ git merge gh-pages
更新 e23479e..12aa148
Fast-forward
 b.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 b.txt
[15:54 reber@wyb at ~/temp/test git:(main)]
➜ ls
a.txt b.txt
```

### 0x05 撤回

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

### 0x06 多用户
如果有多个用户时可进行如下设置
```
➜ ssh-keygen -t rsa -b 2048 -f id_rsa_github -C "123456@qq.com"
➜ ssh-keygen -t rsa -b 2048 -f id_rsa_gitlab -C "456789@qq.com"
➜ cat ~/.ssh/config
Host github.com
HostName github.com
User reber0
Port 22
IdentityFile ~/.ssh/id_rsa_github

Host git.mysite.com
HostName git.mysite.com
User reber
Port 22
IdentityFile ~/.ssh/id_rsa_gitlab

Host myvps
HostName 123.56.123.123
User root
Port 9833
IdentityFile ~/.ssh/id_rsa
➜ ls
    config  id_rsa_github.pub  id_rsa_gitlab.pub  id_rsa.pub
    id_rsa_github  id_rsa_gitlab      id_rsa      known_hosts
```