# 云服务器部署指南

本指南将帮助你将这个 Next.js 博客项目部署到云服务器上。

## 前置准备

1. **云服务器**（推荐配置）：
   - 操作系统：Ubuntu 20.04/22.04 或 CentOS 7/8
   - 内存：至少 1GB（推荐 2GB+）
   - CPU：1 核以上
   - 已安装 Node.js（推荐 v18+）

2. **本地环境**：
   - 已安装 Git
   - 已安装 SSH 客户端（Windows 可使用 PowerShell 或 PuTTY）

## 方法一：使用 SSH 连接服务器（推荐）

### Windows 系统

#### 1. 使用 PowerShell 连接

```powershell
# 基本连接命令
ssh username@your-server-ip

# 示例：如果用户名是 root，IP 是 123.45.67.89
ssh root@123.45.67.89

# 如果使用非默认端口（例如 2222）
ssh -p 2222 username@your-server-ip

# 使用密钥文件连接（推荐）
ssh -i path/to/your-key.pem username@your-server-ip
```

#### 2. 使用 PuTTY 连接

1. 下载并安装 [PuTTY](https://www.putty.org/)
2. 打开 PuTTY
3. 输入服务器 IP 地址
4. 端口默认 22（或你的自定义端口）
5. 连接类型选择 SSH
6. 点击 "Open" 连接
7. 输入用户名和密码

### Linux/Mac 系统

```bash
# 基本连接
ssh username@your-server-ip

# 使用密钥
ssh -i ~/.ssh/your-key.pem username@your-server-ip

# 使用非默认端口
ssh -p 2222 username@your-server-ip
```

### 首次连接

首次连接时会提示确认服务器指纹，输入 `yes` 确认。

## 方法二：使用 VS Code Remote SSH（推荐用于开发）

1. 在 VS Code 中安装 "Remote - SSH" 扩展
2. 按 `F1` 或 `Ctrl+Shift+P`，输入 "Remote-SSH: Connect to Host"
3. 输入 `username@your-server-ip`
4. 选择服务器配置
5. 输入密码或使用密钥

## 服务器端部署步骤

### 步骤 1：连接服务器

使用上述方法连接到你的云服务器。

### 步骤 2：安装必要软件

```bash
# 更新系统包（Ubuntu/Debian）
sudo apt update && sudo apt upgrade -y

# 安装 Node.js（如果未安装）
# 方法 1：使用 NodeSource（推荐）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 方法 2：使用 nvm（推荐用于多版本管理）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 安装 Git（如果未安装）
sudo apt install git -y

# 安装 PM2（用于进程管理）
sudo npm install -g pm2

# 安装 Nginx（用于反向代理）
sudo apt install nginx -y
```

### 步骤 3：上传项目到服务器

#### 方法 A：使用 Git（推荐）

**在本地项目目录：**

```bash
# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit"

# 4. 在 GitHub/Gitee 创建远程仓库，然后推送
git remote add origin https://github.com/your-username/myBlog.git
git branch -M main
git push -u origin main
```

**在服务器上：**

```bash
# 1. 进入网站目录（创建目录）
sudo mkdir -p /var/www
cd /var/www

# 2. 克隆项目
sudo git clone https://github.com/your-username/myBlog.git
cd myBlog

# 3. 修改所有者
sudo chown -R $USER:$USER /var/www/myBlog
```

#### 方法 B：使用 SCP 直接上传

**在本地 PowerShell（Windows）或终端（Mac/Linux）：**

```bash
# Windows PowerShell
scp -r . username@your-server-ip:/var/www/myBlog

# 或使用密钥
scp -i path/to/key.pem -r . username@your-server-ip:/var/www/myBlog

# Linux/Mac
scp -r . username@your-server-ip:/var/www/myBlog
```

**在服务器上创建目录：**

```bash
sudo mkdir -p /var/www/myBlog
sudo chown -R $USER:$USER /var/www/myBlog
```

### 步骤 4：安装依赖并构建项目

```bash
# 进入项目目录
cd /var/www/myBlog

# 安装依赖
npm install

# 构建生产版本
npm run build
```

### 步骤 5：使用 PM2 运行项目

```bash
# 启动应用
pm2 start npm --name "myBlog" -- start

# 或者使用 ecosystem 文件（推荐）
# 先创建 ecosystem.config.js（见下方）
pm2 start ecosystem.config.js

# 查看运行状态
pm2 status

# 查看日志
pm2 logs myBlog

# 设置开机自启
pm2 startup
pm2 save
```

### 步骤 6：配置 Nginx 反向代理

```bash
# 创建 Nginx 配置文件
sudo nano /etc/nginx/sites-available/myBlog
```

在文件中添加以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # 替换为你的域名或 IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/myBlog /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 步骤 7：配置防火墙

```bash
# Ubuntu UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# CentOS firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 使用 HTTPS（可选但推荐）

### 使用 Let's Encrypt 免费 SSL 证书

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书（替换为你的域名）
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 常用管理命令

### PM2 命令

```bash
# 查看所有应用
pm2 list

# 重启应用
pm2 restart myBlog

# 停止应用
pm2 stop myBlog

# 删除应用
pm2 delete myBlog

# 查看日志
pm2 logs myBlog

# 监控
pm2 monit
```

### 更新项目

```bash
cd /var/www/myBlog

# 如果使用 Git
git pull origin main

# 重新安装依赖（如果有新依赖）
npm install

# 重新构建
npm run build

# 重启应用
pm2 restart myBlog
```

## 故障排查

### 1. 无法连接服务器

- 检查服务器 IP 是否正确
- 检查防火墙是否开放 SSH 端口（默认 22）
- 检查服务器是否运行
- 检查 SSH 服务是否启动：`sudo systemctl status ssh`

### 2. 应用无法访问

- 检查 PM2 状态：`pm2 status`
- 查看日志：`pm2 logs myBlog`
- 检查端口是否被占用：`sudo netstat -tulpn | grep 3000`
- 检查 Nginx 配置：`sudo nginx -t`
- 检查 Nginx 日志：`sudo tail -f /var/log/nginx/error.log`

### 3. 构建失败

- 检查 Node.js 版本：`node -v`（需要 v18+）
- 检查磁盘空间：`df -h`
- 清理并重新安装：`rm -rf node_modules package-lock.json && npm install`

## 安全建议

1. **使用 SSH 密钥认证**（比密码更安全）
2. **禁用 root 登录**
3. **定期更新系统**：`sudo apt update && sudo apt upgrade`
4. **配置防火墙**，只开放必要端口
5. **使用强密码**
6. **定期备份**项目文件

## 快速部署脚本

可以创建一个部署脚本来自动化部署过程，详见 `deploy.sh` 文件。
