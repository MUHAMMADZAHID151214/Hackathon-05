"use client";  // Ensure this is a client component if needed

import React from "react";
import ProductCards from "./ProductCards";  // Remove unnecessary import if it's in the same file

const ProductsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-6">Our Products</h1>
      <ProductCards />
    </div>
  );
};

export default ProductsPage;
