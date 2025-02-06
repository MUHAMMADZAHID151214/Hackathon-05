  "use client";
  import { useEffect, useState } from "react";
  import { useRouter, useParams } from "next/navigation"; // Import useRouter
  import { client } from "@/sanity/lib/client";
  import { groq } from "next-sanity";
  import { Product } from "../../../../types/products";
  import Image from "next/image";

  export default function ProductPage() {
    const { slug } = useParams();
    const router = useRouter(); // Initialize useRouter
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const data = await client.fetch(
            groq`
              *[_type == "product" && slug.current == $slug][0]{
                _id,
                title,
                price,
                discountPercentage,
                description,
                "imageUrl": productImage.asset->url,
                slug
              }
            `,
            { slug }
          );
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      if (slug) {
        fetchProduct();
      }
    }, [slug]);

    const handleQuantityChange = (newQuantity: number) => {
      setQuantity(Math.max(1, newQuantity)); // Ensure minimum quantity is 1
    };

    const addToCart = (product: Product, quantity: number) => {
      type CartItem = Product & { quantity: number };

      const cartItems: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existingProductIndex = cartItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex >= 0) {
        cartItems[existingProductIndex].quantity += quantity;
      } else {
        cartItems.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));

      // ✅ Redirect to cart page after adding to cart
      router.push("/cart");
    };

    if (loading) {
      return <div className="text-center mt-20">Loading...</div>;
    }

    if (!product) {
      return <div className="text-center mt-20">Product not found</div>;
    }

    return (
      <>
        {/* Shop Banner */}
        <div>
          <Image
            src={"/images/product.png"}
            alt="shop"
            width={1440}
            height={316}
            className="w-full h-auto mt-20"
          />
        </div>

        {/* Filter & Sort Section */}

        <div className="max-w-7xl mx-auto px-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-md"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>

            <div className="flex flex-col gap-8">
              <h1 className="text-4xl font-bold">{product.title}</h1>
              <p className="text-2xl font-sans text-gray-800">
                <b>Price: </b>${product.price}
              </p>
              <p className="text-gray-700">
                <b className="text-2xl">Description: </b>
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <b className="text-2xl font-sans text-gray-800"> Quantity: </b>
                <button
                  className="bg-[#B88E2F] text-white font-bold py-2 px-4 rounded shadow hover:bg-white hover:text-[#B88E2F] hover:shadow-md"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>

                <button
                  className="bg-[#B88E2F] text-white font-bold py-2 px-4 rounded shadow hover:bg-white hover:text-[#B88E2F] hover:shadow-md"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="w-full bg-[#B88E2F] text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-white hover:text-[#B88E2F] hover:shadow-md"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
