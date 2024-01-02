import React from "react";
import { numberToDollars } from "@/app/utils/general";
import * as dayjs from "dayjs";
import OrderModal from "@/app/ui/orderModal";
import DB from "@/database";
import Link from "next/link";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { getStoreOrders } from "@/app/lib/queries";
dayjs.extend(require("dayjs/plugin/relativeTime"));

async function getOrders(): Promise<any[]> {
  "use server";

  const session = await auth();
  const store_id = session?.user?.store_id as number;

  return (
    await DB.query(getStoreOrders(store_id))
  ).rows;
}

async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="mx-8">
      <div role="tablist" className="tabs tabs-lifted w-min mx-auto">
        <Link role="tab" className={`tab `} href={"products"}>
          Products
        </Link>
        <Link
          role="tab"
          className={`tab tab-active [--tab-bg:#262626] `}
          href={"orders"}
        >
          Orders
        </Link>
      </div>

      <div className=" bg-neutral-800 rounded-lg px-16 py-8 pt-2">
        <div className="overflow-x-auto">
          {orders.length === 0 && (
            <div className="text-center w-full  italic opacity-20 pt-4">
              No pending orders
            </div>
          )}
          <table className={`table ${orders.length === 0 ? "hidden" : ""}`}>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr className="p-2">
                  <td>{i + 1}</td>
                  <td className="font-semibold">{order.title}</td>
                  <td>{order.first_name + " " + order.last_name}</td>
                  <td>
                    {
                      // calculate time ago using dayjs
                      dayjs(order.date).fromNow(true)
                    }{" "}
                    ago
                  </td>
                  <td>{order.quantity}</td>
                  <td>{numberToDollars(order.quantity * +order.price)}</td>
                  <OrderModal order={order} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
