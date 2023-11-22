import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from '@/providers/NextAuth'
import { PageLayout } from '@/components/PageLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FastJuku',
  description: 'FastJukuのホームページです',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
      <NextAuthProvider>
      <PageLayout>
        {children}    
      </PageLayout>
      </NextAuthProvider>
      </body>
    </html>
  )
}
