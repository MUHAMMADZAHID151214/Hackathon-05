"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products"; // Import your Product type
import Image from "next/image";
import Swal from "sweetalert2"; // Import SweetAlert2

const CheckOutPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);

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
    paymentMethod: "bank",
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    country: false,
    city: false,
    zip: false,
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Validate the current step's form
  const validateStep = (step: number) => {
    const errors = { ...formErrors };
    if (step === 1) {
      errors.firstName = !formData.firstName;
      errors.lastName = !formData.lastName;
      errors.email = !formData.email;
      errors.phone = !formData.phone;
    }
    if (step === 2) {
      errors.address = !formData.address;
      errors.country = !formData.country;
      errors.city = !formData.city;
      errors.zip = !formData.zip;
    }
    setFormErrors(errors);
    // Return true if no errors exist
    return Object.values(errors).every((error) => !error);
  };

  // Validate the entire form (both billing and shipping)
  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      return false;
    }
    if (
      !formData.address ||
      !formData.country ||
      !formData.city ||
      !formData.zip
    ) {
      return false;
    }
    return true;
  };

  // Handle form submission (place order)
  const handlePlaceOrder = async () => {
    // Show confirmation popup with custom button styles
    const result = await Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to place this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      // Disable SweetAlert2's default button styling
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "p-2 border border-black w-full lg:w-[112px] h-12 rounded-2xl text-lg bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F] mr-2",
        cancelButton:
          "p-2 border border-black w-full lg:w-[112px] h-12 rounded-2xl text-lg bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]",
      },
    });
  
    if (result.isConfirmed) {
      if (validateForm()) {
        // Remove applied discount from localStorage if any
        localStorage.removeItem("appliedDiscount");
  
        // Show a success alert
        Swal.fire({
          title: "Order placed successfully!",
          text: "Your order has been placed. You will receive an email confirmation shortly.",
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false, // Disable default styling
          customClass: {
            confirmButton:
              "p-2 border border-black w-full lg:w-[112px] h-12 rounded-2xl text-lg bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]",
          },
        });
        
        const orderData = {
          _type: "order",
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          country: formData.country,
          city: formData.city,
          zip: formData.zip,
          email: formData.email,
          phone: formData.phone,
          cartItems: cart.map((item) => ({
            _type: "reference",
            _ref: item._id,
          })),
          total: totalAmount,
          orderDate: new Date().toISOString(),
        };
  
        try {
          const response = await fetch("/api/place-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });
  
          if (!response.ok) {
            throw new Error("Failed to place order");
          }
          // Additional success logic here if needed
        } catch (error) {
          console.error("Order Error:", error);
          Swal.fire(
            "Order Failed",
            "Failed to place order. Please try again.",
            "error"
          );
        }
      } else {
        Swal.fire(
          "Order Failed",
          "Please make sure all required fields are filled out correctly.",
          "error"
        );
      }
    }
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
                <h2 className="text-[24px] font-semibold mb-5">
                  Billing Details
                </h2>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm">First name is required</p>
                )}
  
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm">Last name is required</p>
                )}
  
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
  
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm">
                    Phone number is required
                  </p>
                )}
  
                <button
                  onClick={handleNextStep}
                  className="mt-5 p-2 border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]"
                >
                  Next
                </button>
              </>
            )}
  
            {currentStep === 2 && (
              <>
                <h2 className="text-[24px] font-semibold mb-5">
                  Shipping Address
                </h2>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm">Address is required</p>
                )}
  
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.country && (
                  <p className="text-red-500 text-sm">Country is required</p>
                )}
  
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm">City is required</p>
                )}
  
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                />
                {formErrors.zip && (
                  <p className="text-red-500 text-sm">Zip code is required</p>
                )}
  
                <div className="flex flex-wrap gap-4 mt-5">
                  <button
                    onClick={handlePreviousStep}
                    className="p-2 border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="p-2 border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
  
            {currentStep === 3 && (
              <>
                <h2 className="text-[24px] font-semibold mb-5">
                  Payment Details
                </h2>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full h-[50px] border border-black rounded-md mt-2"
                >
                  <option value="bank">Direct Bank Transfer</option>
                  <option value="cod">Cash On Delivery</option>
                </select>
                <div className="flex flex-wrap gap-4 mt-5">
                  <button
                    onClick={handlePreviousStep}
                    className="p-2 border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="p-2 border border-black w-full lg:w-[222px] h-[48px] lg:h-[58.95px] rounded-2xl text-[18px] lg:text-[20px] bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F]"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
  
          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[35%]">
            <h2 className="text-[36px] font-semibold">Order Summary</h2>
            {cart.map((item) => (
              <p key={item._id} className="text-[#9F9F9F]">
                {item.title} <span className="text-black">X {item.quantity}</span>
              </p>
            ))}
            <div className="mt-6">
              <span className="text-[24px] font-semibold">Subtotal : </span>
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
