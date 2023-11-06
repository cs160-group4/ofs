import Image from 'next/image'
export default function Blog() {
  return (
    <section className="flex items-center font-poppins justify-center ">
      <div className="container flex flex-col items-center px-5 py-16">
        <div className="justify-center items-center  max-w-6xl px-4 py-4 ">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 ">
              <a href="#" className="">
                <Image src="/images/blog/blog1.jpg" alt="" className="object-cover w-full h-64 rounded-t-lg" width={640} height={448} />
              </a>
              <div className="p-5">
                <a href="#" className="">
                  <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-gray-400">Swedish Pancakes</h2>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">My go-to recipe for Swedish pancakes! Buttery, tender, and thick enough to sink your teeth into but with a nice thin, delicate, lacy edge.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    {/* <img src="https://i.postimg.cc/Qdhgyp8g/second.jpg" alt=""
                    className="object-cover object-right w-8 h-8 rounded-full"> */}
                    <div className="ml-2">
                      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">John Doe
                      </h2>
                      <span className="text-sm text-gray-500 dark:text-gray-500">Food Blogger</span>
                    </div>
                  </div>
                  <a href="#"
                    className="px-3 py-2 text-xs text-gray-200 bg-blue-700 rounded-full dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-600 hover:text-gray-100">
                    Continue Reading</a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 ">
              <a href="#" className="">
                <Image src="/images/blog/blog2.jpg" alt="" className="object-cover w-full h-64 rounded-t-lg" width={640} height={448} />

              </a>
              <div className="p-5">
                <a href="#" className="">
                  <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-gray-400">Roasted Corn and Fried Tacos</h2>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Roasted Corn and Fried Egg Tacos with a crispy, cheesy, lacy-edged egg, corn, cotjia cheese, cilantro, pickled onions and sauce all piled into a tortilla with refried beans.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    {/* <img src="https://i.postimg.cc/fW3hVdhv/pexels-rodnae-productions-7648047.jpg" alt=""
                    className="object-cover object-right w-8 h-8 rounded-full"> */}
                    <div className="ml-2">
                      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Alice Smith
                      </h2>
                      <span className="text-sm text-gray-500 dark:text-gray-500">Food Influencer</span>
                    </div>
                  </div>
                  <a href="#"
                    className="px-3 py-2 text-xs text-gray-200 bg-blue-700 rounded-full hover:bg-blue-600 hover:text-gray-100">
                    Continue Reading</a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 ">
              <a href="#" className="">
                <Image src="/images/blog/blog3.jpg" alt="" className="object-cover w-full h-64 rounded-t-lg" width={640} height={448} />
              </a>
              <div className="p-5">
                <a href="#" className="">
                  <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-gray-400">Chimichurri with Tomatoes</h2>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Saucy, punchy, and delightful Chimichurri Shrimp! Served with a tomato salad, a pile of hot steamy rice, and a dollop of creamy tzatziki.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    {/* <img src="https://i.postimg.cc/pdZ0BTZg/pexels-cowomen-2041627.jpg" alt=""
                    className="object-cover object-right w-8 h-8 rounded-full"> */}
                    <div className="ml-2">
                      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">David Lee
                      </h2>
                      <span className="text-sm text-gray-500 dark:text-gray-500">Food Photographer</span>
                    </div>
                  </div>
                  <a href="#"
                    className="px-3 py-2 text-xs text-gray-200 bg-blue-700 rounded-full hover:bg-blue-600 hover:text-gray-100">
                    Continue Reading</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
