"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ShopPage() {
  const [selectedNumber, setSelectedNumber] = useState<number>(1); // Default selected number is 1
  const [dropdownSelectedNumber, setDropdownSelectedNumber] = useState<number | null>(null); // For dropdown logic
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

const handleNumberSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const dropdownselectedValue =parseInt(event.target.value);
  setDropdownSelectedNumber(dropdownselectedValue);
}

const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = event.target.value;
  setSelectedOption(selectedValue);
};

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
return (
    <>
      <div>
        <Image
          src={"/images/shop.svg"}
          alt="shop"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>
      <div className="h-auto bg-[#F9F1E7] flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-evenly space-x-4 sm:space-x-8 w-full">
          <Image
            src="/images/dotted-line.svg"
            alt="dotted-line"
            width={25}
            height={25}
          />
          <h3 className="text-[14px] sm:text-[18px] md:text-[20px] font-semibold">
            Filter
          </h3>
          <Image
            src="/images/four-dot.svg"
            alt="four-dot"
            width={25}
            height={25}
          />
          <Image
            src="/images/square-line.svg"
            alt="square-line"
            width={25}
            height={25}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between sm:space-x-4 mt-2 sm:mt-0 w-full">
          <span className="text-xs sm:text-sm md:text-base">
            Showing 1–16 of 32 results
          </span>
          <span className="text-xs sm:text-sm md:text-base">Show</span>
          
    <div>
      {/* Dropdown with numbers 1 to 16 */}
      <div className="mt-2">
        <select
          value={dropdownSelectedNumber || ""}
          onChange={handleNumberSelect}
          className="w-full h-[50px] border rounded"
        >
          <option value="" disabled>
            Select a number
          </option>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
    </div>
          <span className="text-xs sm:text-sm md:text-base">Short by</span>

          <div>
     
      {/* Dropdown with sorting options */}
      <div className="mt-2">
        <select
          value={selectedOption || ""}
          onChange={handleOptionSelect}
          className="w-full h-[50px] border rounded"
        >
          <option value="" disabled>
            Sort Options
          </option>
          <option value="sort-by-name">Sort by Name</option>
          <option value="sort-by-title">Sort by Title</option>
          <option value="sort-az">Sort by A-Z</option>
          <option value="sort-za">Sort by Z-A</option>
          <option value="sort-low-high">Low to High</option>
        </select>
      </div>
    </div>        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl mt-8">
        <div className="w-[285px] h-[446px] bg-[#F4F5F7] mx-auto">
          {" "}
          <Image
            src={"/images/table.png"}
            alt="table-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] ml-6 mt-4">
            Syltherine
          </h3>
          <p className="ml-6">Stylish cafe chair</p>
          <span className="text-[20px] font-semibold mr-6 ml-6">
            Rp 2.500.000
          </span>
          <span className="text-[16px] line-through">Rp 3.500.000</span>
        </div>
        <div className="relative w-[285px] h-[446px] bg-[#F4F5F7] mx-auto">
          <Image
            src="/images/chair.png"
            alt="chair-img"
            width={285}
            height={301}
          />

          <h3 className="text-[24px] font-semibold text-[#3A3A3A] ml-6 mt-4">
            Leviosa
          </h3>
          <p className="ml-6">Stylish cafe chair</p>
          <span className="text-[20px] font-semibold mr-6 ml-6">
            Rp 2.500.000
          </span>

          <div className="absolute inset-0 bg-[#3A3A3A] bg-opacity-60 flex items-center justify-center flex-col">
            <Link href={"/cart"}>
              {" "}
              <button className="text-[#B88E2F] text-[16px] font-semibold bg-[#FFFFFF] w-[202px] h-[48px]">
                Add to cart
              </button>
            </Link>{" "}
            <div className="flex items-center justify-around gap-4 mt-6 text-[#FFFFFF]">
              <Image
                src={"/images/share.svg"}
                alt="icon-1"
                width={16}
                height={16}
              />
              <span>Share</span>
              <Image
                src={"/images/arrow.svg"}
                alt="icon-2"
                width={16}
                height={16}
              />
              <span>Compare</span>
              <Image
                src={"/images/heart.svg"}
                alt="icon-3"
                width={16}
                height={16}
              />
              <span>Like</span>
            </div>
          </div>
        </div>
        <div className="w-[285px] h-[446px] bg-[#F4F5F7] mx-auto">
          <Image
            src={"/images/sofa.png"}
            alt="sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] ml-6 mt-4">
            Lolito
          </h3>
          <p className="ml-6">Luxury big sofa</p>
          <span className="text-[20px] font-semibold mr-6 ml-6">
            Rp 7.000.000
          </span>
          <span className="text-[16px] line-through">Rp 3.500.000</span>
        </div>
        <div className="w-[285px] h-[446px] bg-[#F4F5F7] mx-auto">
          <Image
            src={"/images/multi-sofa.png"}
            alt="multi-sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] ml-6 mt-4">
            Respira
          </h3>
          <p className="ml-6">Outdoor bar table and stool</p>
          <span className="text-[20px] font-semibold mr-6 ml-6">
            Rp 500.000
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl mt-8">
        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/table.png"}
            alt="table-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Syltherine
          </h3>
          <p className="text-center">Stylish cafe chair</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[20px] font-semibold">Rp 2.500.000</span>
            <span className="text-[16px] line-through text-gray-500">
              Rp 3.500.000
            </span>
          </div>
        </div>

        <div className="relative w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src="/images/chair.png"
            alt="chair-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Leviosa
          </h3>
          <p className="text-center">Stylish cafe chair</p>
          <span className="text-[20px] font-semibold">Rp 2.500.000</span>
        </div>

        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/sofa.png"}
            alt="sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Lolito
          </h3>
          <p className="text-center">Luxury big sofa</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[20px] font-semibold">Rp 7.000.000</span>
            <span className="text-[16px] line-through text-gray-500">
              Rp 3.500.000
            </span>
          </div>
        </div>

        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/multi-sofa.png"}
            alt="multi-sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Respira
          </h3>
          <p className="text-center">Outdoor bar table and stool</p>
          <span className="text-[20px] font-semibold">Rp 500.000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl mt-8">
        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/table.png"}
            alt="table-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Syltherine
          </h3>
          <p className="text-center">Stylish cafe chair</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[20px] font-semibold">Rp 2.500.000</span>
            <span className="text-[16px] line-through text-gray-500">
              Rp 3.500.000
            </span>
          </div>
        </div>

        <div className="relative w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src="/images/chair.png"
            alt="chair-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Leviosa
          </h3>
          <p className="text-center">Stylish cafe chair</p>
          <span className="text-[20px] font-semibold">Rp 2.500.000</span>
        </div>

        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/sofa.png"}
            alt="sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Lolito
          </h3>
          <p className="text-center">Luxury big sofa</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[20px] font-semibold">Rp 7.000.000</span>
            <span className="text-[16px] line-through text-gray-500">
              Rp 3.500.000
            </span>
          </div>
        </div>

        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/multi-sofa.png"}
            alt="multi-sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Respira
          </h3>
          <p className="text-center">Outdoor bar table and stool</p>
          <span className="text-[20px] font-semibold">Rp 500.000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto max-w-screen-xl mt-8">
        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/table.png"}
            alt="table-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Syltherine
          </h3>
          <p className="text-center">Stylish cafe chair</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[20px] font-semibold">Rp 2.500.000</span>
            <span className="text-[16px] line-through text-gray-500">
              Rp 3.500.000
            </span>
          </div>
        </div>

        <div className="relative w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src="/images/chair.png"
            alt="chair-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Leviosa
          </h3>
          <p className="text-center">Stylish cafe chair</p>
          <span className="text-[20px] font-semibold">Rp 2.500.000</span>
        </div>

        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/sofa.png"}
            alt="sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Lolito
          </h3>
          <p className="text-center">Luxury big sofa</p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-[20px] font-semibold">Rp 7.000.000</span>
            <span className="text-[16px] line-through text-gray-500">
              Rp 3.500.000
            </span>
          </div>
        </div>

        <div className="w-full h-[446px] bg-[#F4F5F7] mx-auto flex flex-col items-center">
          <Image
            src={"/images/multi-sofa.png"}
            alt="multi-sofa-img"
            width={285}
            height={301}
          />
          <h3 className="text-[24px] font-semibold text-[#3A3A3A] mt-4">
            Respira
          </h3>
          <p className="text-center">Outdoor bar table and stool</p>
          <span className="text-[20px] font-semibold">Rp 500.000</span>
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
      
     <Link href={"/shop"}> <button
        onClick={handlePrevious}
        className="w-[60px] h-[60px] bg-[#F9F1E7] text-black flex items-center justify-center cursor-pointer border border-black"
      >
        Prev
      </button>
</Link>
      {/* Next Button */}
      
     <Link href={"/shop"}> 
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
