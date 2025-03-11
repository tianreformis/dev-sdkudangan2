import Image from "next/image";
import React from "react";


const Component = () => {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Artikel Terbaru</h1>
        <div className="relative">
          <Image 
            width={1000}
            height={1000}
            src="/placeholder-blog.jpg" 
            alt="Featured blog post"
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <span className="text-white text-sm font-medium bg-indigo-500 px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Judul Blog Post
          </h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image 
                width={1000}
                height={1000}
                src="/avatar-placeholder.jpg"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">Penulis</span>
            </div>
            <span className="text-gray-500 text-sm">12 Jan 2024</span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Artikel Lainnya</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Artikel 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            width={500}
            height={300} 
            src="/placeholder-blog.jpg"
            alt="Blog post"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Artikel Sekolah 1</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates...
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  width={32}
                  height={32}
                  src="/avatar-placeholder.jpg" 
                  alt="Author"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-700 text-sm">Penulis</span>
              </div>
              <span className="text-gray-500 text-xs">10 Jan 2024</span>
            </div>
          </div>
        </div>

        {/* Artikel 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            width={500}
            height={300}
            src="/placeholder-blog.jpg"
            alt="Blog post" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Artikel Sekolah 2</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates...
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  width={32}
                  height={32}
                  src="/avatar-placeholder.jpg"
                  alt="Author"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-700 text-sm">Penulis</span>
              </div>
              <span className="text-gray-500 text-xs">9 Jan 2024</span>
            </div>
          </div>
        </div>

        {/* Artikel 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            width={500}
            height={300}
            src="/placeholder-blog.jpg"
            alt="Blog post"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Artikel Sekolah 3</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates...
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  width={32}
                  height={32}
                  src="/avatar-placeholder.jpg"
                  alt="Author"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-700 text-sm">Penulis</span>
              </div>
              <span className="text-gray-500 text-xs">8 Jan 2024</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      

    </div>
  )
}


export default Component;
