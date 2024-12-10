"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 py-4 px-6 lg:px-16">
      {/* Logo Section */}
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Brand Logo"
            width={150}
            height={40}
            className="w-auto h-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-8 text-gray-800">
          <Link href="/" className="hover:text-gray-600 transition duration-300">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-600 transition duration-300">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-gray-600 transition duration-300">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-600 transition duration-300">
            Contact
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden sm:flex items-center space-x-6">
          
        <Link href="/contact">
          <Image
            src="/images/contact-icon.svg"
            alt="Contact"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
          </Link>
          
          <Link href="/searches">
          <Image
            src="/images/search-icon.svg"
            alt="Search"
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
          </Link>
          
          <Link href="/mostfavourites">
            <Image
              src="/images/heart-icon.svg"
              alt="Favorites"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer hover:opacity-80"
            />
            </Link>
          <Link href="/shop">
            <Image
              src="/images/cart-icon.svg"
              alt="Cart"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer hover:opacity-80"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          onClick={handleMenuToggle}
          className="lg:hidden text-gray-800 focus:outline-none hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && isMobile && (
        <div className="lg:hidden flex flex-col p-4 space-y-4 bg-white shadow-md mt-4 absolute w-full">
          <Link href="/" className="hover:text-gray-600 transition duration-300">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-600 transition duration-300">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-gray-600 transition duration-300">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-600 transition duration-300">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
