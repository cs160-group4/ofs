import Footer from '@/components/FooterComponent'
import Navbar from '@/components/NavbarComponent'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OFS - On-Demand Food Delivery Service',
  description: 'Order food from your OFS groceries.',
  icons: '/favicon.jpg',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-[calc(100vh-299px)] overflow-auto ">
          {children}
        </main>
        <Footer />
        {/* <script defer src="https://cdn.jsdelivr.net/npm/theme-change@2.5.0/index.js" /> */}
      </body>
    </html>
  )
}
