export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        关于我
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          欢迎来到我的个人博客！这里是我分享技术、生活感悟和思考的地方。
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          我热爱编程，喜欢探索新技术，也喜欢记录生活中的点点滴滴。
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          希望你能在这里找到一些有用的内容，也欢迎与我交流！
        </p>
      </div>
    </div>
  )
}
