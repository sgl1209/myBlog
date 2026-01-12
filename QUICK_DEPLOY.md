# 快速部署命令清单

## 在服务器上依次执行以下命令

### 1. 检查环境

```bash
# 检查 Node.js（需要 v18+）
node -v

# 如果没有 Node.js，安装它
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 检查 Git
git --version

# 如果没有 Git，安装它
sudo apt update
sudo apt install git -y

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo apt install nginx -y
```

### 2. 创建项目目录

```bash
# 创建网站目录
sudo mkdir -p /var/www/myBlog
cd /var/www
sudo chown -R $USER:$USER /var/www/myBlog
```

### 3. 上传项目文件

**方法 A：使用 Git（推荐）**

先在本地将项目推送到 GitHub/Gitee，然后在服务器上：

```bash
cd /var/www
git clone https://github.com/your-username/myBlog.git
cd myBlog
```

**方法 B：使用 SCP（从本地 PowerShell 执行）**

```powershell
# 在本地 PowerShell 中执行
scp -r . admin@8.138.208.57:/var/www/myBlog
```

### 4. 安装依赖并构建

```bash
cd /var/www/myBlog

# 安装依赖
npm install

# 构建项目
npm run build
```

### 5. 启动应用（PM2）

```bash
# 使用 PM2 启动
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 设置开机自启
pm2 startup
pm2 save
```

### 6. 配置 Nginx

```bash
# 创建配置文件
sudo nano /etc/nginx/sites-available/myBlog
```

在文件中添加：

```nginx
server {
    listen 80;
    server_name 8.138.208.57;

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

保存后（Ctrl+X, Y, Enter），执行：

```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/myBlog /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 7. 配置防火墙

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 8. 验证部署

访问：http://8.138.208.57

## 常用管理命令

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs myBlog

# 重启应用
pm2 restart myBlog

# 停止应用
pm2 stop myBlog
```
