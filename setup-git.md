# Git 仓库设置指南

## 步骤 1：在本地初始化 Git 并推送到远程仓库

### 1.1 初始化 Git 仓库（如果还没有）

在本地项目目录（PowerShell）中执行：

```powershell
# 检查是否已有 Git 仓库
git status

# 如果没有，初始化
git init
git add .
git commit -m "Initial commit: Next.js blog project"
```

### 1.2 创建远程仓库

选择以下平台之一创建仓库：

**GitHub:**
1. 访问 https://github.com
2. 点击右上角 "+" -> "New repository"
3. 仓库名：`myBlog`（或你喜欢的名字）
4. 选择 Public 或 Private
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

**Gitee（码云，国内访问更快）:**
1. 访问 https://gitee.com
2. 点击右上角 "+" -> "新建仓库"
3. 仓库名：`myBlog`
4. 选择公开或私有
5. **不要**勾选 "使用Readme文件初始化这个仓库"
6. 点击 "创建"

### 1.3 添加远程仓库并推送

**GitHub 示例：**
```powershell
# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/myBlog.git

# 推送到远程
git branch -M main
git push -u origin main
```

**Gitee 示例：**
```powershell
# 添加远程仓库（替换为你的用户名）
git remote add origin https://gitee.com/你的用户名/myBlog.git

# 推送到远程
git branch -M main
git push -u origin main
```

**如果遇到认证问题：**
- GitHub: 使用 Personal Access Token（不是密码）
- Gitee: 可以使用账号密码或配置 SSH 密钥

## 步骤 2：在服务器上克隆项目

在服务器 SSH 终端中执行：

```bash
# 创建项目目录
sudo mkdir -p /var/www
cd /var/www

# 克隆项目（替换为你的仓库地址）
git clone https://github.com/你的用户名/myBlog.git
# 或
git clone https://gitee.com/你的用户名/myBlog.git

# 进入项目目录
cd myBlog

# 修改所有者
sudo chown -R $USER:$USER /var/www/myBlog
```

## 步骤 3：后续更新项目

当你在本地修改了代码后：

**本地推送：**
```powershell
git add .
git commit -m "更新描述"
git push
```

**服务器上更新：**
```bash
cd /var/www/myBlog
git pull
npm install  # 如果有新依赖
npm run build
pm2 restart myBlog
```

## 常见问题

### 1. GitHub 推送需要 Token

GitHub 不再支持密码认证，需要创建 Personal Access Token：

1. GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
2. Generate new token
3. 勾选 `repo` 权限
4. 生成后复制 token
5. 推送时使用 token 作为密码

### 2. Gitee 推送需要密码

Gitee 支持密码认证，直接输入账号密码即可。

### 3. 使用 SSH 密钥（推荐，更安全）

**生成 SSH 密钥：**
```powershell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**添加到 GitHub/Gitee：**
- 复制 `~/.ssh/id_rsa.pub` 内容
- GitHub: Settings -> SSH and GPG keys -> New SSH key
- Gitee: 设置 -> SSH公钥 -> 添加公钥

**使用 SSH 地址：**
```powershell
git remote set-url origin git@github.com:你的用户名/myBlog.git
```
