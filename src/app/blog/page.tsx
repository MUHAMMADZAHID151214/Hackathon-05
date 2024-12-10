"use client";
import React, { useState,useRef } from 'react';
import Image from 'next/image';
import Link from "next/link";

export default function BlogPage() {
  // Move the hook inside the function component
  const [selectedNumber, setSelectedNumber] = useState<number>(1); // Default selected number is 1

  const handleNext = () => {
    setSelectedNumber((prev) => {
      if (prev === 3) return 1; // Cycles 3 -> 1
      return prev + 1; // Cycles 1 -> 2 -> 3 -> 1
    });
  };

  const handlePrevious = () => {
    setSelectedNumber((prev) => {
      if (prev === 1) return 3; // Cycles 1 -> 3
      return prev - 1; // Cycles 3 -> 2 -> 1 -> 3
    });
  };
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchInputRef.current) {
      const inputValue = searchInputRef.current.value;
      console.log("Search Value:", inputValue); // Replace with your search logic
    }
  };
  return (
    <>
      {/* Banner Section */}
      <div>
        <Image
          src={"/images/blog.png"}
          alt="blog"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:h-[2210px] px-4 lg:px-0">
        {/* Left Section */}
        <div className="lg:w-1/2 lg:ml-12">
          {/* Blog Post 1 */}
          <Link href={"/blog1"}> 
            <Image
              src={"/images/laptop.png"}
              alt="laptop-img"
              width={817}
              height={500}
              className="mt-8 lg:mt-28 w-full"
            />
          </Link>
          <div className="flex items-center gap-2 lg:gap-4 mt-2">
            <Image src={"/images/user.svg"} alt="user-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">Admin</h3>
            <Image src={"/images/briefcase.svg"} alt="briefcase-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">14 Oct 2022</h3>
            <Image src={"/images/wood.svg"} alt="wood-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">Wood</h3>
          </div>
          <h1 className="text-[20px] lg:text-[30px] font-semibold my-4">
            Going all-in with millennial design
          </h1>
          <p className="text-[#9F9F9F] mb-8 text-sm lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          
          <Link href={"/blog1"}>
            <span className="border-b border-black text-sm">Read More</span>
          </Link>
          
          {/* Blog Post 2 */}
          <Link href={"/blog2"}>
            <Image
              src={"/images/drawing.png"}
              alt="drawing-img"
              width={817}
              height={500}
              className="mt-14 w-full"
            />
          </Link>
        
          <div className="flex items-center gap-2 lg:gap-4 mt-2">
            <Image src={"/images/user.svg"} alt="user-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">Admin</h3>
            <Image src={"/images/briefcase.svg"} alt="briefcase-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">14 Oct 2022</h3>
            <Image src={"/images/wood.svg"} alt="wood-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">Wood</h3>
          </div>
          <h1 className="text-[20px] lg:text-[30px] font-semibold my-4">
            Exploring new ways of decorating
          </h1>
          <p className="text-[#9F9F9F] mb-8 text-sm lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          <Link href={"/blog2"}>
            <span className="border-b border-black text-sm">Read More</span>
          </Link>
          
          {/* Blog Post 3 */}
          <Link href={"/blog3"}>  
            <Image
              src={"/images/book.png"}
              alt="books-img"
              width={817}
              height={500}
              className="mt-14 w-full"
            />
          </Link>
          <div className="flex items-center gap-2 lg:gap-4 mt-2">
            <Image src={"/images/user.svg"} alt="user-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">Admin</h3>
            <Image src={"/images/briefcase.svg"} alt="briefcase-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">14 Oct 2022</h3>
            <Image src={"/images/wood.svg"} alt="wood-img" width={20} height={20} />
            <h3 className="text-[#9F9F9F] text-sm lg:text-base">Wood</h3>
          </div>
          <h1 className="text-[20px] lg:text-[30px] font-semibold my-4">
            Handmade pieces that took time to make
          </h1>
          <p className="text-[#9F9F9F] mb-8 text-sm lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
          <Link href={"/blog3"}>
            <span className="border-b border-black text-sm">Read More</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 lg:mr-20 lg:ml-20 mt-10 lg:mt-28">
          {/* Search Bar */}
          
          <div className="flex items-center w-full lg:w-[311px] h-[58px] border px-4 border-[#9F9F9F] rounded-md">
      {/* Input Box */}
      <input
        type="search"
        ref={searchInputRef}
        placeholder="Search Here"
        className="flex-grow px-4 py-2 border-none rounded-md text-sm focus:outline-none focus:ring-2"
      />
      {/* Search Button */}
      <button
        className="ml-2 focus:outline-none"
        onClick={handleSearch}
      >
        <Image src="/images/research.svg" alt="search-img" width={20} height={20} />
      </button>
    </div>

          {/* Categories */}
          <h1 className="text-[20px] lg:text-[24px] font-semibold mt-10">Categories</h1>
          <div className="space-y-4 lg:space-y-6">
            {[{ name: 'Crafts', count: 2 }, { name: 'Design', count: 8 }, { name: 'Handmade', count: 7 }, { name: 'Interior', count: 1 }, { name: 'Wood', count: 6 }]
              .map((category) => (
                <div key={category.name} className="flex justify-between text-sm lg:text-base">
                  <h3>{category.name}</h3>
                  <span>{category.count}</span>
                </div>
              ))}
          </div>

          {/* Recent Posts */}
          <h1 className="text-[24px] font-semibold mb-8">Recent Posts</h1>
          {[{ src: '/images/pro1.png', title: 'Going all-in with millennial design' }, { src: '/images/pro2.png', title: 'Exploring new ways of decorating' }, { src: '/images/pro3.png', title: 'Handmade pieces that took time to make' }, { src: '/images/pro4.png', title: 'Modern home in Milan' }, { src: '/images/pro5.png', title: 'Colorful office redesign' }]
            .map((post, index) => (
              <div key={index} className="flex items-center justify-between gap-8">
                <Image src={post.src} alt={`post${index + 1}`} width={80} height={80} />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-[14px] w-[119px]">{post.title}</h1>
                  <span className="text-[#9F9F9F]">03 Aug 2022</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-14">
      {/* Number 1 */}
      <div
        className={`w-[60px] h-[60px] flex items-center justify-center ${
          selectedNumber === 1 ? "text-white bg-yellow-600" : "text-black"
        } bg-[#F9F1E7] border border-black`}
      >
        1
      </div>
{/* Number 2 */}
      <div
        className={`w-[60px] h-[60px] flex items-center justify-center ${
          selectedNumber === 2 ? "text-white bg-yellow-600" : "text-black #F9F1E7"
        } bg-[#F9F1E7] border border-black`}
      >
        2
      </div>

      {/* Number 3 */}
      <div
        className={`w-[60px] h-[60px] flex items-center justify-center ${
          selectedNumber === 3 ? "text-white bg-yellow-600" : "text-black"
        } bg-[#F9F1E7] border border-black`}
      >
        3
      </div>

      {/* Previous Button */}
      
     <Link href={"/blog"}> <button
        onClick={handlePrevious}
        className="w-[60px] h-[60px] bg-[#F9F1E7] text-black flex items-center justify-center cursor-pointer border border-black"
      >
        Prev
      </button>
</Link>
      {/* Next Button */}
      
     <Link href={"/blog"}> 
      <button
        onClick={handleNext}
        className="w-[60px] h-[60px] bg-[#F9F1E7] text-black flex items-center justify-center cursor-pointer border border-black"
      >
        Next
      </button>
    </Link>
    </div>
    
      </>
  );
}
