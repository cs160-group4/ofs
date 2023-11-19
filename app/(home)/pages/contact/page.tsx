/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function Contact() {
  return (
    <>  <h1 className="text-3xl text-center font-bold mt-8">Contact Us</h1>
      <div className="flex justify-center w-lg dark:text-white">
        <div className="w-full max-w-lg mt-8">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-2">
              <label className="block uppercase tracking-wide dark:text-gray-700 text-xs font-bold mb-2"
              >
                Name
              </label>
              {/* <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border @error('name') border-red-500 @enderror rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="name" name="name" type="text" placeholder="Name" value="{{ old('name') }}">
                      @error('name')
                          <p className="text-red-500 text-xs italic">{{ $message }}</p>
                      @enderror */}
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border @error('email') border-red-500 @enderror rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="name" name="name" type="text" placeholder="Name"
                value="">
              </input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-62">
            <div className="w-full px-3 mb-2">
              <label className="block uppercase tracking-wide  dark:text-gray-700 text-xs font-bold mb-2"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border @error('email') border-red-500 @enderror rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="email" name="email" type="email" placeholder="Email"
                value="">
              </input>
              {/* @error('email')
                          <p className="text-red-500 text-xs italic">{{ $message }}</p>
                      @enderror */}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide  dark:text-gray-700 text-xs font-bold mb-2"
              >
                Message
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border @error('
                          message') border-red-500 @enderror rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="message" name="message" placeholder="Message"></textarea>
              {/* @error('message')
                          <p className="text-red-500 text-xs italic">{{ $message }}</p>
                      @enderror */}


              <button type='submit'
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div></>
  )
}
