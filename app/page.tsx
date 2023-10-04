import Image from 'next/image'
import Link from 'next/link'
import avatarIcon from "../public/images/avatar.svg"
import Navbar from './components/NavbarComponent'

export default function Home() {
  return (
    <main className="">
      <Navbar />

      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>








      <script defer src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js" />
    </main>

  )
}
