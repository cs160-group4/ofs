import Image from 'next/image'
import Link from 'next/link'
import avatarIcon from "../public/images/avatar.svg"
import logo from "../public/images/logo.png"
import Navbar from './components/NavbarComponent'
export default function Home() {
  return (
    <main className="">
      <Navbar />
      <hr></hr>

      {/* ------------Casousel---------------- */}
      <div className="carousel w-full  h-[650px] shadow-xl relative">
        <div id="slide1" className="carousel-item relative w-full ">
          <img src="https://images.unsplash.com/photo-1599454100789-b211e369bd04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative  w-full ">
          <img src="https://images.unsplash.com/photo-1617391766038-970a91689241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative  w-full ">
          <img src="https://images.unsplash.com/photo-1595835018349-198460e1d309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative  w-full ">
          <img src="https://images.unsplash.com/photo-1595835018349-198460e1d309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      {/* ------------ End Casousel---------------- */}

      {/* A grid of 3 cards centered on the page */}

      <div className="flex justify-evenly lg:flex-row flex-col items-center">
        <div className="card w-96 h-[450px] bg-base-100 shadow-xl m-4">
          <figure><img src="https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="vegetable dish" /></figure>
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

        <div className="card w-96 h-[450px] bg-base-100 shadow-xl overflow-hidden m-4">
          <figure><img src="https://images.unsplash.com/photo-1622732777601-e744c3401d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80" alt="vegetable dish" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Tasty salad with dessert and juice!
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
        <div className="card w-96 h-[450px] bg-base-100 shadow-xl m-4">
          <figure><img src="https://images.unsplash.com/photo-1546072533-675fd58d08e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" alt="vegetable dish" /></figure>
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
