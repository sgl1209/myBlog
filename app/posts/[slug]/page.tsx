import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '@/lib/posts'

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block"
      >
        ← 返回首页
      </Link>
      
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {post.date}
        </p>
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
