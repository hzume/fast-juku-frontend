import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PageLayout } from '@/components/PageLayout'
import { DataFetch } from '@/providers/DataFetch'
import { ModalManager } from '@/components/Modal'
import { SWRConfig } from 'swr'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fast塾',
  description: 'FastJukuのホームページです',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <DataFetch>
            <PageLayout>
              <ModalManager />        
              {children}              
            </PageLayout>          
        </DataFetch>
      </body>
    </html>
  )
}
