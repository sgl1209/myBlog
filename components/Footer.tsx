export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} 我的个人博客. 保留所有权利.</p>
          <p className="mt-2 text-sm">
            使用 Next.js 和 Tailwind CSS 构建
          </p>
        </div>
      </div>
    </footer>
  )
}
