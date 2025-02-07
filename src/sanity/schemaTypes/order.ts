import { defineType, defineField } from "sanity";

const orderSchema = defineType({
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zip",
      title: "Zip Code",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "price",
      title: "Total Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "phone",
      title: "Phone No",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
  ],
});

export default orderSchema;
