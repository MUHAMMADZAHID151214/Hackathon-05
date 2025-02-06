"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products"; // Import the Product type
import Image from "next/image";

const CheckOutPage = () => {
  const [cart, setCart] = useState<Product[]>([]); // Explicit type for cart
  const [totalAmount, setTotalAmount] = useState<number>(0); // Explicit type for totalAmount
  const [currentStep, setCurrentStep] = useState<number>(1); // Tracks the current step (1 for billing, 2 for shipping, 3 for payment)
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    zip: "",
    additionalInfo: "",
    paymentMethod: "bank", // Default payment method
  });

  // Validation messages
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    zip: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{11}$/; // Validates 11-digit phone numbers
    return phoneRegex.test(phone);
  };

  const validateZip = (zip: string) => {
    const zipRegex = /^[0-9]+$/; // Validates numbers only
    return zipRegex.test(zip);
  };

  // Handle next step with validation
  const handleNextStep = () => {
    const { email, phone, zip } = formData;
    const validationErrors = { email: "", phone: "", zip: "" };

    // Validate email
    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address (e.g., abc@gmail.com).";
    }

    // Validate phone
    if (!validatePhone(phone)) {
      validationErrors.phone = "Phone number must be 11 digits.";
    }

    // Validate zip
    if (!validateZip(zip)) {
      validationErrors.zip = "Zip code must only contain numbers.";
    }

    // Set error messages
    setErrors(validationErrors);

    // Log validation errors and form data
    console.log("Validation Errors: ", validationErrors);
    console.log("Form Data: ", formData);

    // Check if no validation errors exist
    if (!validationErrors.email && !validationErrors.phone && !validationErrors.zip) {
      // Use functional state update for correct state value
      setCurrentStep((prevStep) => {
        console.log("Previous Step: ", prevStep); // Log to verify previous step
        return prevStep + 1;
      });
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission (mock implementation)
  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const total = savedCart.reduce((total: number, item: Product) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalAmount(total);
  }, []);

  return (
    <div>
      <Image
        src="/images/checkout.png"
        alt="checkout"
        width={1440}
        height={316}
        className="w-full h-auto mt-20"
      />
      <div className="container mx-auto px-4 lg:px-12 mt-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left Side: Checkout Form */}
          <div className="w-full lg:w-[60%]">
            <h1 className="text-[36px] font-semibold mb-5">Checkout Details</h1>

            {/* Billing & Shipping Form */}
            {currentStep === 1 && (
              <>
                <h2 className="text-[24px] font-semibold mb-5">Billing Details</h2>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                <button onClick={handleNextStep} className="mt-5 p-2 bg-blue-500 text-white">
                  Next
                </button>
              </>
            )}

            {/* Shipping Form */}
            {currentStep === 2 && (
              <>
                <h2 className="text-[24px] font-semibold mb-5">Shipping Address</h2>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {errors.zip && <p className="text-red-500">{errors.zip}</p>}

                <button onClick={handlePreviousStep} className="mt-5 p-2 bg-gray-500 text-white">
                  Back
                </button>
                <button onClick={handleNextStep} className="mt-5 p-2 bg-blue-500 text-white">
                  Next
                </button>
              </>
            )}

            {/* Payment Details Form */}
            {currentStep === 3 && (
              <>
                <h2 className="text-[24px] font-semibold mb-5">Payment Details</h2>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                >
                  <option value="bank">Direct Bank Transfer</option>
                  <option value="cod">Cash On Delivery</option>
                </select>
                <button onClick={handlePreviousStep} className="mt-5 p-2 bg-gray-500 text-white">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="mt-5 p-2 bg-green-500 text-white">
                  Place Order
                </button>
              </>
            )}
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[35%]">
            <h2 className="text-[24px] font-semibold">Order Summary</h2>
            {cart.map((item) => (
              <p key={item._id} className="text-[#9F9F9F]">
                {item.title} <span className="text-black">X {item.quantity}</span>
              </p>
            ))}
            <div className="mt-6">
              <span className="text-[24px] font-semibold">Subtotal: </span>
              <span className="text-[#B88E2F] text-[24px] font-semibold">
                Rs. {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
