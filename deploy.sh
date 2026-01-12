#!/bin/bash

# Next.js 博客部署脚本
# 使用方法：在服务器上运行 bash deploy.sh

set -e

echo "🚀 开始部署博客..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查 PM2 是否安装
if ! command -v pm2 &> /dev/null; then
    echo "⚠️  PM2 未安装，正在安装..."
    npm install -g pm2
fi

# 停止旧进程（如果存在）
pm2 stop myBlog 2>/dev/null || true
pm2 delete myBlog 2>/dev/null || true

# 启动应用
echo "🚀 启动应用..."
pm2 start ecosystem.config.js

# 保存 PM2 配置
pm2 save

echo "✅ 部署完成！"
echo "📊 查看状态: pm2 status"
echo "📝 查看日志: pm2 logs myBlog"
