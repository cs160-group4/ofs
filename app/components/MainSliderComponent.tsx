import Image from 'next/image'

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function MainSliderComponent() {
  return (
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
  )
}

