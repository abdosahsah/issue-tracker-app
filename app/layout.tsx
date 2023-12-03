import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/app/Navbar'
import AuthProvider from '@/app/api/auth/Provider';
import QueryClientProvider from './QueryClientProvider';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'This app is for tracking issues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
        <AuthProvider>
          <Navbar />
          <main className="w-full p-3 md:max-w-3xl mx-auto">
            {children}
          </main>
        </AuthProvider>
        </ QueryClientProvider>
      </body>
    </html>
  )
}
