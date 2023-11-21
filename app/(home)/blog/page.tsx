import { Post, getBlogPostsWithAuthor } from '@/app/lib/posts';
import { User } from '@/app/lib/users';
import { getAvatarURL, getImageUrl } from '@/app/lib/utils';
import Image from 'next/image';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function Blog() {
  let list = await getBlogPostsWithAuthor();
  let posts: Post[] = [];
  let users: User[] = [];
  for (let i = 0; i < list.length; i++) {
    posts.push(list[i].blog_posts);
    users.push(list[i].user);
  }

  function getImage(image: string) {
    return getImageUrl(image);
  }

  function truncate(str: string, n: number) {
    return str.length > n ? str.substring(0, n - 1) + '...' : str;
  }
  return (
    <section className="flex items-center font-poppins justify-center ">
      <div className="container flex flex-col items-center px-5 py-16">
        <div className="justify-center items-center  max-w-6xl px-4 py-4 ">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
            {posts.map((post, index) => (

              <>
                <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 ">
                  <a href={"blog/" + post.id}>
                    <Image src={getImage(post.image as string)} alt="" className="object-cover w-full h-64 rounded-t-lg" width={640} height={448} />
                  </a>
                  <div className="p-5">
                    <a href={"blog/" + post.id}>
                      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-gray-400">{post.title}</h2>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncate(post.content, 100)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center ">
                        <Image width={48} height={48} src={getAvatarURL(users[index].image as string)}
                          alt=""
                          className="object-cover object-right w-8 h-8 rounded-full" />
                        <div className="ml-2">
                          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">{users[index].name}
                          </h2>
                          <span className="text-sm text-gray-500 dark:text-gray-500">{users[index].role}</span>
                        </div>
                      </div>
                      <a href={"blog/" + post.id}
                        className="px-3 py-2 text-xs text-gray-200 bg-blue-700 rounded-full dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-600 hover:text-gray-100">
                        Continue Reading</a>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

    </section >
  )
}
