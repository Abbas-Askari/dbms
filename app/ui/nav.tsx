import React from "react";
import favIcon from "@/app/favicon.ico";
import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import CartToggleButton from "./cartButton";
import { CartProductCard } from "./cartProductCard";
import CartSidebar from "./cartSidebar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import Cart from "./cart";
import { auth } from "../api/auth/[...nextauth]/route";

async function searchProducts(formData: FormData) {
  "use server";

  redirect(`/products?query=${formData.get("query")}`);
}

const Nav = async () => {
  const session = await auth();

  return (
    <div className="px-8 py-4 flex gap-2  items-center justify-between">
      <Link href={"/products"} className="flex gap-2 items-center ">
        <img
          src={favIcon.src}
          alt=""
          className="w-10 h-10 rounded-full border-white border-2"
        />
        <div className=" font-bold text-2xl">Zarad</div>
      </Link>

      <form
        action={searchProducts}
        className=" flex text-md items-center border-2 border-neutral-700 pl-6 pr-4 py-2 rounded-lg  focus-within:border-neutral-500    "
      >
        <input
          name="query"
          type="text"
          className=" outline-none w-[400px] bg-inherit "
          placeholder="Search for products..."
        />
        <button>
          <MagnifyingGlassIcon className="w-5 h-5 " />
        </button>
      </form>

      {/* <div className=" flex bg-white text-black pl-4 pr-4 py-1 rounded-2xl    ">
            <input type="text" className=' outline-none w-[400px] ' placeholder='Search'/>
            <MagnifyingGlassIcon className='w-6 h-6 '/>
        </div> */}
      <div className="flex gap-4 ">
        {session?.user && (
          <>
            <LogoutButton />
            <Cart />
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
