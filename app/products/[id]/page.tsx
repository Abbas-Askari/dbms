import { getProductById } from "@/app/lib/actions";
import { addToCart, removeFromCart } from "@/app/lib/cartActions";
import { Product } from "@/app/lib/definitions";
import SellerInfo from "@/app/ui/sellerInfo";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import React from "react";

type Props = {
  params: { id: string };
};

async function Page({ params }: Props) {
  unstable_noStore();
  
  const { id } = params;
  const product: Product = await getProductById(id);

  // const products: Product[] = (await sql`SELECT * FROM product;`)
  //   .rows as Product[];

  const session = await getSession();
  // const session = await auth();
  const addToCartBound = addToCart.bind(null, product.id, session?.user?.id as string);
  const removeFromCartBound = removeFromCart.bind(null, product.id, session?.user?.id as string);
  const inCart = (await sql`SELECT * FROM cart WHERE product_id=${product.id} AND customer_id=${session?.user?.id};`).rowCount > 0;

  return (
    <div className="p-8">
      <div className="flex">
        <div className=" flex-1 p-8">
          <img
            src=""
            alt=""
            className="bg-white rounded-lg aspect-square h-[100%]"
          />
        </div>
        <div className=" flex-1 p-8 pl-0">
          <div className="text-2xl font-semibold">{product.title}</div>
          <div className="my-4">{product.description}</div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl">${product.price}</div>
            <div className="">
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </div>
          </div>
          <form action={!inCart ? addToCartBound : removeFromCartBound}>
            <button className=" bg-gray-800 hover:bg-gray-600 outline-none px-6 py-2 rounded-lg mx-auto  ">
              {!inCart ? "Add to Cart" : "Remove from Cart"}
            </button>
          </form>
        </div>
      </div>

      {/* Store info */}

      <div className="my-4">
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

      {/* Reviews */}

      <div className="my-4">
        <div className="text-2xl font-bold mb-4">Reviews</div>
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <WriteReview />
      </div>
    </div>
  );
}

function Review() {
  return (
    <div className="pb-4 px-8">
      <div className="flex justify-between translate-y-[0.5rem]">
        {/* translate-y-[-0.5rem] */}
        <div className="title  font-extralight text-[12px]">Abbas Askari</div>
        <div className="title font-extralight text-[12px]">
          12<sup>th</sup> Sep. 2023
        </div>
      </div>
      <div className="title text-lg font-semibold">An Amazing Product</div>
      <div className="px-4">
        Thanks Mr's Abbas and you'r bros. as well for this awsome product.
      </div>
    </div>
  );
}

function WriteReview() {
  return (
    <div className="pb-4 px-8">
      <div className="flex justify-between translate-y-[0.5rem]">
        {/* translate-y-[-0.5rem] */}
        <div className="title  font-extralight text-[12px]">User Name</div>
        {/* Get Username from auth */}
        <div className="title font-extralight text-[12px]">
          {Date().split(" ").slice(1, 4).join(" ")}
        </div>
      </div>
      <input
        className="w-[100%] text-lg font-semibold my-2 p-2 outline-none rounded-md text-black"
        placeholder="Enter title for the review"
      />
      <textarea
        className="w-[100%] px-4 py-2 rounded-md outline-none text-black resize-none"
        placeholder="Enter you comments about this product."
      />
      <div className="flex justify-end gap-2">
        <button className="hover:bg-red-900 bg-red-700 transition-colors px-4 py-1 rounded-md">
          Discard
        </button>
        <button className="hover:bg-gray-900 bg-gray-700  transition-colors px-4 py-1 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}

export default Page;
