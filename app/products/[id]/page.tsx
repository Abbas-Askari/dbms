import { getProductById } from "@/app/lib/actions";
import { addToCart, removeFromCart } from "@/app/lib/cartActions";
import { Product } from "@/app/lib/definitions";
import SellerInfo from "@/app/ui/sellerInfo";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import React from "react";
import FormSubmitButton from "@/app/ui/formSubmitButton";

type Props = {
  params: { id: string };
};

async function Page({ params }: Props) {
  unstable_noStore();
  
  const { id } = params;
  const product: Product = await getProductById(id);

  // const products: Product[] = (await sql`SELECT * FROM product;`)
  //   .rows as Product[];

  // const session = await getSession();
  const session = await auth();
  // const session = await getSession();
  const session = await auth();
  const addToCartBound = addToCart.bind(null, product.id, session?.user?.id as string);
  const removeFromCartBound = removeFromCart.bind(null, product.id, session?.user?.id as string);
  const inCart = (await sql`SELECT * FROM cart WHERE product_id=${product.id} AND customer_id=${session?.user?.id};`).rowCount > 0;

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex">
        <div className="flex p-8 px-16 gap-8">
          <div className="flex-1 h-full aspect-square">
            <img
              src=""
              alt=""
              className="bg-white rounded-xl aspect-square"
              />
          </div>
          <div className="flex flex-col flex-[2_2_0%] justify-between">
            <div className="flex flex-col gap-4">

            <div className="flex justify-between">
              <div className="text-4xl font-bold">{product.title}</div>
              <form action={!inCart ? addToCartBound : removeFromCartBound}>
                <FormSubmitButton className=" bg-gray-800 hover:bg-gray-600 outline-none px-6 py-2 rounded-lg mx-auto  " value={!inCart ? "Add to Cart" : "Remove from Cart"} />
              </form>
            </div>
            <div className="text-lg text-neutral-300">{product.description}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-4xl">${product.price}</div>
              <div className="text-3xl">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </div>
            </div>
          
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-2xl font-bold">Store</div>
        <Link
          href="/store"
          className=" hover:bg-[#ffffff20] transition-colors py-4 px-8 rounded-md flex gap-8 items-center "
        >
          <img
            src={"/next.svg"}
            alt=""
            className=" w-20  aspect-square object-contain flex-shrink-0 bg-white box-border p-4"
          />
          <div className="">
            <h1 className="text-xl font-semibold">Abbas And Bros.</h1>
            <div className="description text-sm">
              An online store is a website or app where buyers can see a catalog
              of products or services and make electronic purchases. An
              ecommerce store is slightly different from an online store in that
              it doesn't need to have a digital catalog or checkout process,
              only an electronic payment method.
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">Reviews</div>
        <div className="flex flex-col gap-2">
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
        <WriteReview />
      </div>
    </div>
  );
}

function Review() {
  return (
    <div className="flex flex-col bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between p-2 border-b border-white">
        <div className="text-sm">Abbas Askari</div>
        <div className="text-sm">
          12<sup>th</sup> Sep. 2023
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="title text-lg font-semibold">An Amazing Product</div>
        <div className="">
          Thanks Mr's Abbas and you'r bros. as well for this awsome product.
        </div>
      </div>
    </div>
  );
}

function WriteReview() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Add Your Review</h1>
      <div className="flex justify-between">
        <div className="text-sm">User Name</div>
        <div className="text-sm">
          {Date().split(" ").slice(1, 4).join(" ")}
        </div>
      </div>
      <input
        className="w-full form-input"
        placeholder="Enter title for the review"
      />
      <textarea
        className="w-full form-input resize-none"
        placeholder="Enter you comments about this product."
      />
      <div className="flex justify-end gap-2">
        <button className="hover:bg-red-900 bg-red-700 transition-colors px-4 py-1 rounded-md">
          Discard
        </button>
        <button className="hover:bg-gray-900 bg-gray-700  transition-colors px-4 py-1 rounded-md">
          Post
        </button>
      </div>
    </div>
  );
}

export default Page;
