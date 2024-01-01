import React from "react";
import { createProduct } from "../lib/actions";
import Link from "next/link";
import { ProductForm } from "../ui/productForm";

const Page = () => {
  return (
    <ProductForm actionCallback={createProduct} />
  );
};

export default Page;
