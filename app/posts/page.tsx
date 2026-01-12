import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Posts() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        所有文章
      </h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                {post.title}
              </h2>
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
