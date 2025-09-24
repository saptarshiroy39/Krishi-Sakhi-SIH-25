import React from 'react'
import Header from './Header'
import BottomNav from './BottomNav'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 px-4 py-6 pb-20 max-w-4xl mx-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout