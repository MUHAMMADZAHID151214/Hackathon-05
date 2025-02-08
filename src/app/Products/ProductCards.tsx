"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sanity = createClient({
  projectId: "weoe5nuj",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
});

// Define a custom loader for Sanity images
const sanityImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  productImage?: {
    asset: {
      _ref: string;
    };
  };
  tags: string[];
  slug: {
    _type: "slug";
    current: string;
  };
}

interface CartProduct extends Product {
  quantity: number;
}

interface ProductCardsProps {
  searchQuery?: string;
  sortOption?: string;
}

const ProductCards: React.FC<ProductCardsProps> = ({ searchQuery = "", sortOption = "sort-by-title" }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantityMap, setQuantityMap] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = `
          *[_type == "product"]{
            _id,
            title,
            price,
            discountPercentage,
            description,
            "imageUrl": productImage.asset->url,
            tags,
            slug
          }
        `;
        const data: Product[] = await sanity.fetch(query);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortOption) {
      case "sort-by-title":
      case "sort-az":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "sort-za":
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "sort-low-high":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "sort-high-low":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, sortOption, products]);

  const addToCart = (product: Product, quantity: number) => {
    if (typeof window !== "undefined") {
      const cartItems: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProductIndex = cartItems.findIndex((item) => item._id === product._id);

      if (existingProductIndex >= 0) {
        cartItems[existingProductIndex].quantity += quantity;
      } else {
        cartItems.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      router.push("/cart");
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantityMap((prevMap) => ({ ...prevMap, [productId]: newQuantity }));
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-slate-800 mt-4 mb-4">Products From API Data</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const productQuantity = quantityMap[product._id] || 1;
            return (
              <div
                key={product._id}
                className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <Link href={`/product/${product.slug?.current || product._id}`}>
                  <Image
                    loader={sanityImageLoader}
                    src={product.imageUrl}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                    priority
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-slate-800 mt-2 text-sm">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-slate-600 font-bold">Rs. {product.price.toFixed(2)}</p>
                      {product.discountPercentage > 0 && (
                        <p className="text-sm text-green-600">{product.discountPercentage}% OFF</p>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="p-4 bg-slate-50 border-t-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-[#B88E2F] text-white font-bold py-2 px-4 rounded shadow hover:bg-white hover:text-[#B88E2F] hover:shadow-md"
                        onClick={() => handleQuantityChange(product._id, Math.max(1, productQuantity - 1))}
                      >
                        -
                      </button>
                      <span>{productQuantity}</span>
                      <button
                        className="bg-[#B88E2F] text-white font-bold py-2 px-4 rounded shadow hover:bg-white hover:text-[#B88E2F] hover:shadow-md"
                        onClick={() => handleQuantityChange(product._id, productQuantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="w-full bg-[#B88E2F] text-white font-bold py-2 px-4 rounded shadow hover:bg-white hover:text-[#B88E2F] hover:shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, productQuantity);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductCards;