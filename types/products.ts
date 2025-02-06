export interface Product {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    discountPercentage: number;
    description: string;
    imageUrl: string; // Resolved URL
    tags?: string[];
    slug: {
      _type: "slug";
      current: string;
    };
  }
  