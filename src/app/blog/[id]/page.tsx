import Image from "next/image";
import React from "react";

const SingleBlogPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Image */}
        <div className="relative">
          <Image
            width={1000}
            height={1000}
            src="/placeholder-blog.jpg"
            alt="Blog post header"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <span className="text-white text-sm font-medium bg-indigo-500 px-3 py-1 rounded-full">
              Kategori
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Judul Artikel Detail
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Image
                width={40}
                height={40}
                src="/avatar-placeholder.jpg"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-900 font-medium">Penulis</p>
                <p className="text-gray-500 text-sm">12 Januari 2024</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 my-4">
              Sub Judul Artikel
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <Image
              width={800}
              height={400}
              src="/placeholder-blog.jpg"
              alt="Article image"
              className="w-full h-[300px] object-cover rounded-lg my-6"
            />

            <p className="text-gray-700 leading-relaxed mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
