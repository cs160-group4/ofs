import '@/app/globals.css';
import Footer from '@/app/ui/home/Footer';
import Navbar from '@/app/ui/home/Navbar';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'OFS - On-Demand Food Delivery Service',
  description: 'Order food from your OFS groceries.',
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" data-theme="cupcake" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body >
          <Navbar />
          <main className="min-h-[calc(100vh-299px)] overflow-hidden ">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </>
  )
}
