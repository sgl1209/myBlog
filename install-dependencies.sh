#!/bin/bash

# 服务器依赖安装脚本
# 在服务器上运行：bash install-dependencies.sh

set -e

echo "🚀 开始安装服务器依赖..."
echo ""

# 更新系统包
echo "📦 更新系统包..."
sudo apt update
echo ""

# 安装 Git
echo "📦 安装 Git..."
if ! command -v git &> /dev/null; then
    sudo apt install git -y
    echo "✅ Git 安装完成"
else
    echo "✅ Git 已安装: $(git --version)"
fi
echo ""

# 安装 Node.js (使用 nvm)
echo "📦 安装 Node.js..."
if ! command -v node &> /dev/null; then
    echo "   安装 nvm (Node Version Manager)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    # 加载 nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$HOME/.bashrc" ] && source "$HOME/.bashrc"
    
    echo "   安装 Node.js 18..."
    nvm install 18
    nvm use 18
    nvm alias default 18
    
    echo "✅ Node.js 安装完成: $(node -v)"
else
    NODE_VERSION=$(node -v)
    echo "✅ Node.js 已安装: $NODE_VERSION"
    
    # 检查版本
    NODE_MAJOR=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo "⚠️  Node.js 版本过低，建议升级..."
        echo "   安装 nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        nvm install 18
        nvm use 18
        echo "✅ Node.js 已升级到: $(node -v)"
    fi
fi
echo ""

# 安装 PM2
echo "📦 安装 PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    echo "✅ PM2 安装完成: $(pm2 -v)"
else
    echo "✅ PM2 已安装: v$(pm2 -v)"
fi
echo ""

# 安装 Nginx
echo "📦 安装 Nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install nginx -y
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo "✅ Nginx 安装完成"
else
    echo "✅ Nginx 已安装: $(nginx -v 2>&1)"
fi
echo ""

# 显示安装结果
echo "📊 安装结果汇总:"
echo "   Node.js: $(node -v 2>/dev/null || echo '未安装')"
echo "   npm: v$(npm -v 2>/dev/null || echo '未安装')"
echo "   Git: $(git --version 2>/dev/null || echo '未安装')"
echo "   PM2: v$(pm2 -v 2>/dev/null || echo '未安装')"
echo "   Nginx: $(nginx -v 2>&1 | head -n1 2>/dev/null || echo '未安装')"
echo ""

echo "✅ 所有依赖安装完成！"
echo ""
echo "下一步："
echo "1. 将项目推送到 Git 仓库（GitHub/Gitee）"
echo "2. 在服务器上克隆项目"
echo "3. 运行部署脚本"
