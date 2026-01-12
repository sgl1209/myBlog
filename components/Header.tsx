import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            我的博客
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              首页
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              关于
            </Link>
            <Link
              href="/posts"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              所有文章
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
