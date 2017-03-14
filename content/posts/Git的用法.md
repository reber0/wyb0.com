+++
date = "2016-05-05T10:30:32+08:00"
description = ""
draft = false
tags = ["git"]
title = "Git的用法"
topics = ["Git"]

+++

### 0x00 创建仓库
> {{% fluid_img src="/img/post/git_init.png" alt="创建仓库" %}}


### 0x01 克隆
> {{% fluid_img src="/img/post/git_clone.png" alt="git克隆" %}}

### 0x02 仓库连接到远程服务器
> ```
# 若没有克隆现有仓库则可以连接远程仓库：
git remote add origin git@github.com:reber-9/reber-9.com.git
```

### 0x03 .gitignore文件
> {{% fluid_img src="/img/post/git_gitignore.png" alt="gitignore" %}}

### 0x04 添加和提交和推送
> {{% fluid_img src="/img/post/win_github_add_push_md.png" alt="推送更改" %}}

### 0x05 分支
* 切换分支后，分支的更改不会影响原来分支，
* 切换分支后，分支更改后需要add，然后commit
* git checkout -b test可以创建分支同时切换
{{% fluid_img src="/img/post/git_branch.png" alt="分支" %}}


### 0x06 更新和合并
> ```
git pull 可以同步github上的数据到本地
git merge test 可以将test分支的改动合并到当前分支
```

### 0x07 查看状态
> ```
git status
```

### 0x08 撤回
> ```
git reset HEAD  # 上一次add的文件全部撤销

git log查看commit的id  
git reset --hard commit_id  # 若未push,可回到上个commit处

git revert HEAD # 若push后,可撤销前一次 commit 
```

### 0x09 多用户
> 如果有多个用户时可进行如下设置
> ```
$ ssh-keygen -t rsa -b 2048 -t github -C "123456@qq.com"
$ ssh-keygen -t rsa -b 2048 -t gitlab -C "456789@qq.com"
$ vim config
    Host github.com
    HostName github.com
    User user2
    Port 22
    IdentityFile ~/.ssh/github

    Host 123.12.12.123
    HostName mygitlab.com
    User user1
    Port 2222
    IdentityFile ~/.ssh/gitlab
$ ls
    config  github.pub  gitlab.pub  id_rsa.pub
    github  gitlab      id_rsa      known_hosts

# 可以新建项目后在项目里执行下面两条命令配置局部用户名和邮箱
# 会在.git/config写入用户名和邮箱
git config --local user.name "reber-9"  
git config --local user.email "123456@qq.com"
```