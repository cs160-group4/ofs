import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <main className="">
      {/* ------------Casousel---------------- */}
      <div className="carousel w-full  h-[650px] shadow-xl relative">
        <div id="slide1" className="carousel-item relative w-full ">
          <Image width={1920} height={1080} src="/images/sliders/slide1.jpg" className="w-full" alt='slide 1' />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative  w-full ">
          <Image width={1920} height={1080} src="/images/sliders/slide2.jpg" className="w-full" alt='slide 2' />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative  w-full ">
          <Image width={1920} height={1080} src="/images/sliders/slide3.jpg" className="w-full" alt='slide 3' />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      {/* ------------ End Casousel---------------- */}

      {/* A grid of 3 cards centered on the page */}

      <div className="flex justify-evenly lg:flex-row flex-col items-center">
        <div className="card w-96 bg-base-100 shadow-xl m-4">
          <figure>
            <Image src="/images/food/food1.jpg" alt="vegetable dish" width={640} height={448} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Vegan Curry!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>rice with green leaf vegetable on white ceramic plate</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Vegetables</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl m-4">
          <figure>
            <Image src="/images/food/food2.jpg" alt="vegetable dish" width={640} height={448} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Tasty salad!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              stainless steel fork and knife on white ceramic plate</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Nutrition</div>
              <div className="badge badge-outline">Salad</div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl m-4">
          <figure>
            <Image src="/images/food/food3.jpg" alt="vegetable dish" width={640} height={448} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Fresh salad with vegetables!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              vegetable dish on gray bowl</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Nutrition</div>
              <div className="badge badge-outline">Salad</div>
            </div>
          </div>
        </div>
      </div>
      <script defer src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js" />
    </main>
  )
}
