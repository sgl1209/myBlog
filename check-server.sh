#!/bin/bash

# 服务器环境检查脚本
# 在服务器上运行：bash check-server.sh

echo "🔍 检查服务器环境..."
echo ""

# 检查 Node.js
echo "📦 检查 Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js 已安装: $NODE_VERSION"
    
    # 检查版本是否 >= 18
    NODE_MAJOR=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo "✅ Node.js 版本符合要求 (>= 18)"
    else
        echo "⚠️  Node.js 版本过低，建议升级到 v18+"
    fi
else
    echo "❌ Node.js 未安装"
fi
echo ""

# 检查 npm
echo "📦 检查 npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm 已安装: v$NPM_VERSION"
else
    echo "❌ npm 未安装"
fi
echo ""

# 检查 Git
echo "📦 检查 Git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "✅ Git 已安装: $GIT_VERSION"
else
    echo "❌ Git 未安装"
fi
echo ""

# 检查 PM2
echo "📦 检查 PM2..."
if command -v pm2 &> /dev/null; then
    PM2_VERSION=$(pm2 -v)
    echo "✅ PM2 已安装: v$PM2_VERSION"
else
    echo "❌ PM2 未安装"
fi
echo ""

# 检查 Nginx
echo "📦 检查 Nginx..."
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1)
    echo "✅ Nginx 已安装: $NGINX_VERSION"
else
    echo "❌ Nginx 未安装"
fi
echo ""

# 检查系统信息
echo "💻 系统信息:"
echo "   操作系统: $(uname -a)"
echo "   当前用户: $(whoami)"
echo "   当前目录: $(pwd)"
echo ""

# 检查磁盘空间
echo "💾 磁盘空间:"
df -h | grep -E '^/dev/'
echo ""

echo "检查完成！"
