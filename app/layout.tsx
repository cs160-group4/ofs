import Footer from '@/app/ui/home/Footer'
import Navbar from '@/app/ui/home/Navbar'
import '@/app/globals.css'
import { GeistMono, GeistSans } from 'geist/font'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'OFS - On-Demand Food Delivery Service',
  description: 'Order food from your OFS groceries.',
  icons: '/favicon.jpg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" data-theme="cupcake" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body >
            {children}
        </body>
      </html>
    </>
  )
}
