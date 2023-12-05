import { Post, getPostById } from '@/app/lib/posts';
import { getAvatarURL } from '@/app/lib/utils';
import { not } from 'drizzle-orm';
import Image from 'next/image'
import { notFound } from 'next/navigation';
/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function BlogPage({ params }: { params: { slug: string } }) {
  let id = Number(params.slug);
  if (!id) return notFound();
  let list = await getPostById(id);
  if (!list) return notFound();
  let post: Post = list.blog_posts;
  let user = list.user;
  let image = getAvatarURL(user.image);

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl ">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <Image src={image} width={36} height={36} className="mr-4 w-16 h-16 rounded-full" alt="" />
                  <div>
                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</a>
                    <p className="text-base text-gray-500 dark:text-gray-400">{user.role}</p>
                    <p className="text-base text-gray-500 dark:text-gray-400">{post.updatedAt}</p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl  text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {post.title}
              </h1>
            </header>
            <p className="text-gray-900">
              {post.content}
            </p>

          </article>
        </div>
      </main>

    </>
  )
}

