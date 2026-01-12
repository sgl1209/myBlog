import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '我的个人博客',
  description: '欢迎来到我的个人博客',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
