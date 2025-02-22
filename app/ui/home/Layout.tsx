import Footer from '@/app/ui/home/Footer';
import Navbar from '@/app/ui/home/Navbar';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function HomeLayout({ children, }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
        <div className="flex-grow">
          <Navbar />
          <main className="my-0 py-16">{children}</main>
        </div>
        <Footer />
      </div>


      <main className="min-h-[calc(100vh-299px)] overflow-hidden ">
        {children}
      </main>
      <Footer />
    </>
  );
};
