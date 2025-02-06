"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCards from "../Products/page";

export default function ShopPage() {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const handleNext = () => {
    setSelectedNumber((prev) => (prev === 3 ? 1 : prev + 1));
  };

  const handlePrevious = () => {
    setSelectedNumber((prev) => (prev === 1 ? 3 : prev - 1));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <>
      {/* Shop Banner */}
      <div>
        <Image
          src={"/images/shop.svg"}
          alt="shop"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>

      {/* Filter & Sort Section */}
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

        {/* Search Bar & Sorting Dropdown */}
        <div className="flex flex-wrap items-center justify-between sm:space-x-4 mt-2 sm:mt-0 w-full">
          {/* Functional Search Bar */}
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={handleSearch}
            className="w-full sm:w-1/2 p-2 border border-gray-300 rounded mb-4 sm:mb-0"
          />

          {/* Sorting Dropdown */}
          <div>
            <span className="text-xs sm:text-sm md:text-base">Sort by</span>
            <select
              value={sortOption || ""}
              onChange={handleOptionSelect}
              className="w-full h-[50px] border rounded"
            >
              <option value="" disabled>
                Sort Options
              </option>
              <option value="sort-by-title">Sort by Title</option>
              <option value="sort-low-high">Low to High</option>
              <option value="sort-az">Sort by A-Z</option>
              <option value="sort-za">Sort by Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <ProductCards searchQuery={search} sortOption={sortOption} />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-8 mt-14">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-[60px] h-[60px] flex items-center justify-center ${
              selectedNumber === num ? "text-white bg-yellow-600" : "text-black"
            } bg-[#F9F1E7] border border-black`}
          >
            {num}
          </div>
        ))}

        {/* Previous Button */}
        <Link href={"/shop"}>
          <button
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
