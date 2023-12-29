import React from "react";
import CartSidebar from "./cartSidebar";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

function Cart() {
  return (
    <div className="drawer drawer-end w-min ">
      <label
        htmlFor="my-drawer-4"
        className=" border-neutral-700 border-2  pointer w-min p-2 rounded-lg hover:border-neutral-500"
      >
        <ShoppingCartIcon className="w-6 h-6  " />
      </label>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
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
  );
}

export default Cart;
