import React from "react";
import { ProductForm } from "@/app/ui/productForm";
import { createProduct } from "@/app/lib/actions";

const Page = () => {
  return <ProductForm actionCallback={createProduct} isNew={true} />;
};

export default Page;
