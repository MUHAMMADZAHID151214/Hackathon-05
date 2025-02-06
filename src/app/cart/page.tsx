"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types/products";

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(cartItems);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      {loading ? (
        <div>Loading cart...</div>
      ) : (
        <div>
          <Image
            src="/images/cart-img.png"
            alt="cart-section"
            width={1440}
            height={316}
            className="w-full h-auto mt-20"
          />
          <div className="flex flex-col lg:flex-row items-center lg:justify-around mt-20 lg:h-[550px]">
            <div className="flex flex-col w-full lg:w-[920px]">
              <nav className="h-[55px] w-full bg-[#F9F1E7] flex items-center justify-around text-sm lg:text-base">
                <div className="flex-1 text-center">Product</div>
                <div className="flex-1 text-center">Price</div>
                <div className="flex-1 text-center">Quantity</div>
                <div className="flex-1 text-center">Subtotal</div>
                <div className="flex-1 text-center">Action</div>
              </nav>
              {/* Scrollable Container for Products */}
              <div className="overflow-y-auto max-h-[350px] mt-6 lg:mt-14 flex flex-col items-center gap-4 border-t">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-around gap-4 w-full border-b py-4"
                    >
                      {/* Product Title */}
                      <div className="flex-1 text-center text-sm lg:text-base">{item.title}</div>

                      {/* Price */}
                      <div className="flex-1 text-center text-sm lg:text-base">
                        Rs. {item.price.toFixed(2)}
                      </div>

                      {/* Quantity */}
                      <div className="flex-1 flex justify-center items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="border px-2 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="border px-2 rounded"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="flex-1 text-center text-sm lg:text-base">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <div className="flex-1 text-center">
                        <button
                          className="text-red-500 text-sm lg:text-base"
                          onClick={() => removeItem(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Your cart is empty</div>
                )}
              </div>
              {/* Add More Products Button */}
              <div className="mt-6 flex justify-center">
                <Link href="/shop">
                  <button className="border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]">
                    Add More Products
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-[#F9F1E7] w-full lg:w-[450px] h-auto lg:h-[390px] mt-8 lg:mt-0 p-6 rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-center text-[24px] lg:text-[32px] font-semibold mb-6">
                Cart Totals
              </h1>
              <div className="flex items-center justify-between mb-4 w-full px-4 lg:px-0">
                <h3 className="text-sm lg:text-base">Subtotal</h3>
                <span className="text-sm lg:text-base">
                  Rs. {calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-6 w-full px-4 lg:px-0">
                <h3 className="text-sm lg:text-base">Total</h3>
                <span className="text-sm lg:text-base text-[#B88E2F]">
                  Rs. {calculateTotal().toFixed(2)}
                </span>
              </div>
              <Link href="/checkout">
                <button className="border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
