import Link from 'next/link'
import { getLatestPosts } from '@/lib/posts'

export default function Home() {
  const posts = getLatestPosts(5)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          欢迎来到我的博客
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          分享技术、生活与思考
        </p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          最新文章
        </h2>
        
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/posts/${post.slug}`}>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {post.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {post.date}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.excerpt}
            </p>
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              阅读更多 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
