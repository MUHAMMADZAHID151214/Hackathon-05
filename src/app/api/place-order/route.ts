import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { randomUUID } from 'crypto';

interface OrderData {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  email: string;
  price: number;
  phone: number;
  cartItems: { ref: string }[];
  total: number;
  orderDate?: string;
}

export async function POST(request: Request) {
  try {
    const orderData = (await request.json()) as OrderData;
    console.log("Order received:", orderData);

    // Transform cartItems into the format Sanity expects with a unique _key for each item
    const transformedCartItems = orderData.cartItems.map((item) => ({
      _key: randomUUID(), // Ensure this generates a unique string
      _type: 'reference',
      _ref: item.ref,
    }));
    console.log("Transformed Cart Items:", transformedCartItems);

    const orderDocument = {
      _type: 'order',
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      address: orderData.address,
      country: orderData.country,
      city: orderData.city,
      zip: orderData.zip,
      email: orderData.email,
      cartItems: transformedCartItems,
      price: orderData.total,
      phone: orderData.phone
      // Optionally, add orderDate if needed:
      // orderDate: orderData.orderDate || new Date().toISOString(),
    };

    console.log("Order document to be created:", orderDocument);

    const result = await client.create(orderDocument);
    console.log("Order created successfully:", result);

    return NextResponse.json(
      { message: 'Order placed successfully', orderId: result._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error processing order:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
