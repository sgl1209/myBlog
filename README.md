# 我的个人博客

基于 Next.js 14 + TypeScript + Tailwind CSS 构建的现代化个人博客。

## 功能特性

- ✨ 现代化的 UI 设计
- 📱 响应式布局，支持移动端
- 🌙 支持深色模式
- ⚡ 基于 Next.js 14 App Router
- 🎨 使用 Tailwind CSS 进行样式设计
- 📝 易于扩展的文章系统

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
myBlog/
├── app/                 # Next.js App Router 目录
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   ├── about/          # 关于页面
│   └── posts/          # 文章相关页面
├── components/          # React 组件
│   ├── Header.tsx      # 头部导航
│   └── Footer.tsx      # 页脚
├── public/             # 静态资源
└── package.json        # 项目配置
```

## 下一步

- 添加 Markdown 支持（可以使用 `remark` 或 `mdx`）
- 集成 CMS 系统（如 Contentful、Sanity）
- 添加评论系统
- 优化 SEO
- 添加 RSS 订阅功能

## 部署到云服务器

详细的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署步骤

1. **连接服务器**：使用 SSH 连接到你的云服务器
2. **上传项目**：使用 Git 或 SCP 上传项目文件
3. **安装依赖**：`npm install`
4. **构建项目**：`npm run build`
5. **启动服务**：使用 PM2 管理进程
6. **配置 Nginx**：设置反向代理

更多详细信息请参考部署文档。

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: 可部署到 Vercel、Netlify、云服务器等平台

## 相关文档

- [如何添加新文章](./HOW_TO_ADD_POSTS.md)
- [云服务器部署指南](./DEPLOYMENT.md)

## 许可证

MIT
