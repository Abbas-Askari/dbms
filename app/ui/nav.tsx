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
import { LogoutButton } from "./LogoutButton";
import Cart from "./cart";
import { auth } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

async function searchProducts(formData: FormData) {
  "use server";

  redirect(`/products?query=${formData.get("query")}`);
}

async function getCartItemQuantity(): Promise<number> {
  "server";

  const session = await auth();

  const result = await DB?.query(`
    SELECT COUNT(*) total FROM cart WHERE user_id = ${session?.user?.id};
  `);
  return result?.rows[0].total;
}

const Nav = async () => {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link
            href={"/products"}
            className="flex gap-2 items-center btn btn-ghost text-xl "
          >
            <img
              src={favIcon.src}
              alt=""
              className="w-8 h-8 rounded-full border-white border-2"
            />
            <div className=" font-bold text-xl">Zarad</div>
          </Link>
        </div>
      </div>
    );
  }

  const store_id = session?.user?.store_id;

  const cartItemQuantity = await getCartItemQuantity();

  console.log({ store_id });

  return (
    // <div className="px-8 py-4 flex gap-2  items-center justify-between">
    //   <Link href={"/products"} className="flex gap-2 items-center ">
    //     <img
    //       src={favIcon.src}
    //       alt=""
    //       className="w-10 h-10 rounded-full border-white border-2"
    //     />
    //     <div className=" font-bold text-2xl">Zarad</div>
    //   </Link>

    // <form
    //   action={searchProducts}
    //   className=" flex text-md items-center border-2 border-neutral-700 pl-6 pr-4 py-2 rounded-lg  focus-within:border-neutral-500    "
    // >
    //   <input
    //     name="query"
    //     type="text"
    //     className=" outline-none w-[400px] bg-inherit "
    //     placeholder="Search for products..."
    //   />
    //   <button>
    //     <MagnifyingGlassIcon className="w-5 h-5 " />
    //   </button>
    // </form>

    //   {/* <div className=" flex bg-white text-black pl-4 pr-4 py-1 rounded-2xl    ">
    //         <input type="text" className=' outline-none w-[400px] ' placeholder='Search'/>
    //         <MagnifyingGlassIcon className='w-6 h-6 '/>
    //     </div> */}
    //   <div className="flex gap-4 ">
    //     {session?.user && (
    //       <>
    // <LogoutButton />
    //         <Cart />
    //       </>
    //     )}
    //   </div>
    // </div>

    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          href={"/products"}
          className="flex gap-2 items-center btn btn-ghost text-xl "
        >
          <img
            src={favIcon.src}
            alt=""
            className="w-8 h-8 rounded-full border-white border-2"
          />
          <div className=" font-bold text-xl">Zarad</div>
        </Link>
      </div>

      <form action={searchProducts}>
        <div className="form-control">
          <input
            name="query"
            type="text"
            placeholder="Search Products..."
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </form>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            htmlFor="my-drawer-4"
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartItemQuantity}
              </span>
            </div>
          </label>

          <div className="drawer drawer-end w-min ">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle "
            />
            <div className="drawer-content">{/* Page content here */}</div>
            <div className="drawer-side  z-20 overflow-hidden">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="menu min-h-full text-base-content w-[min-content] p-0">
                <CartSidebar />
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <Link href={"/my-orders"}>My Orders</Link>
            </li>
            {store_id != undefined && (
              <li>
                <Link href={`/stores/${store_id}/products`}>My Store</Link>
              </li>
            )}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
