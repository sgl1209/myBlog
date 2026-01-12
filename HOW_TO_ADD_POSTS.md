# 如何添加新文章

## 方法一：在 lib/posts.ts 中添加（推荐）

这是最简单的方法，适合快速添加文章。

### 步骤：

1. 打开 `lib/posts.ts` 文件

2. 在 `posts` 数组中添加新的文章对象，格式如下：

```typescript
{
  id: 3,  // 使用一个唯一的数字 ID（递增）
  title: '你的文章标题',
  date: '2024-01-03',  // 使用 YYYY-MM-DD 格式
  excerpt: '这是文章的简短摘要，会显示在文章列表中。',
  slug: 'your-post-slug',  // URL 友好的标识符，使用小写字母和连字符
  content: `
    <p>这里是文章的正文内容。</p>
    <h2>二级标题</h2>
    <p>你可以使用 HTML 标签来格式化内容。</p>
    <ul>
      <li>列表项 1</li>
      <li>列表项 2</li>
    </ul>
    <p>更多内容...</p>
  `
}
```

### 示例：

```typescript
{
  id: 3,
  title: 'TypeScript 入门指南',
  date: '2024-01-03',
  excerpt: '学习 TypeScript 的基础知识和最佳实践。',
  slug: 'typescript-guide',
  content: `
    <p>TypeScript 是 JavaScript 的超集，为 JavaScript 添加了静态类型检查。</p>
    <h2>为什么使用 TypeScript？</h2>
    <ul>
      <li>类型安全</li>
      <li>更好的 IDE 支持</li>
      <li>更容易重构</li>
    </ul>
    <h2>基本语法</h2>
    <p>TypeScript 的基本类型包括：string, number, boolean, array 等。</p>
  `
}
```

### 注意事项：

- **id**: 必须唯一，建议按顺序递增
- **slug**: 必须唯一，用于生成文章 URL（例如：`/posts/typescript-guide`）
- **date**: 建议使用 YYYY-MM-DD 格式，文章会按日期倒序排列
- **content**: 可以使用 HTML 标签，但要注意转义特殊字符

## 方法二：使用 Markdown 文件（高级）

如果你想要使用 Markdown 格式编写文章，可以：

1. 安装 Markdown 处理库（如 `remark` 或 `gray-matter`）
2. 在 `posts/` 目录下创建 `.md` 文件
3. 修改 `lib/posts.ts` 来读取 Markdown 文件

这需要更多的配置，但提供了更好的写作体验。

## 快速添加文章模板

复制以下模板到 `lib/posts.ts` 的 `posts` 数组中：

```typescript
{
  id: 0,  // 记得修改为下一个可用的 ID
  title: '',
  date: '',
  excerpt: '',
  slug: '',
  content: `
    <p></p>
  `
}
```

## 验证

添加文章后：

1. 运行 `npm run dev` 启动开发服务器
2. 访问 `http://localhost:3000` 查看首页
3. 访问 `http://localhost:3000/posts` 查看所有文章
4. 访问 `http://localhost:3000/posts/your-slug` 查看具体文章

如果文章没有显示，请检查：
- slug 是否唯一
- 所有必填字段是否都已填写
- 代码语法是否正确
