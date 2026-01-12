export interface Post {
  id: number
  title: string
  date: string
  excerpt: string
  slug: string
  content: string
}

// 在这里添加你的所有文章
export const posts: Post[] = [
  {
    id: 1,
    title: '欢迎来到我的博客',
    date: '2024-01-01',
    excerpt: '这是我的第一篇博客文章，欢迎阅读！',
    slug: 'welcome',
    content: `
      <p>欢迎来到我的个人博客！</p>
      <p>这是我的第一篇博客文章。我会在这里分享我的技术学习心得、项目经验以及生活中的一些思考。</p>
      <p>希望你能在这里找到一些有用的内容，也欢迎与我交流讨论！</p>
    `
  },
  {
    id: 2,
    title: 'Next.js 博客搭建指南',
    date: '2024-01-02',
    excerpt: '学习如何使用 Next.js 搭建一个现代化的个人博客。',
    slug: 'nextjs-blog-guide',
    content: `
      <p>Next.js 是一个强大的 React 框架，非常适合用来构建博客网站。</p>
      <h2>主要特性</h2>
      <ul>
        <li>服务端渲染 (SSR)</li>
        <li>静态站点生成 (SSG)</li>
        <li>自动代码分割</li>
        <li>优化的图片加载</li>
      </ul>
      <p>使用 Next.js 可以轻松构建一个高性能的博客网站。</p>
    `
  },
  {
    id: 3,
    title: '董丰硕的cursor使用第一天',
    date: '2026-01-12',
    excerpt: '今天是我使用cursor的第一天',
    slug: 'cursor-first-day',
    content: `
      <p>今天是我使用cursor的第一天,我感到非常兴奋。</p>
      <p>我使用cursor快速构建了我的个人博客</p>
      <p>就是你现在看到的这个博客</p>
    `
  }
]

// 根据 slug 获取文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}

// 获取所有文章（按日期倒序）
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// 获取最新的 N 篇文章
export function getLatestPosts(count: number = 5): Post[] {
  return getAllPosts().slice(0, count)
}
