import React from "react";
import { numberToDollars } from "../../utils/general";
import * as dayjs from "dayjs";
import OrderModal from "../../ui/orderModal";
import DB from "@/database";
import Link from "next/link";
dayjs.extend(require("dayjs/plugin/relativeTime"));

async function getOrders(): Promise<any[]> {
  "use server";

  return (
    await DB.query(`
      SELECT * FROM orders JOIN customer ON orders.customer_id = customer.id
      JOIN orderProducts ON orders.id = orderProducts.order_id JOIN product ON orderProducts.product_id = product.id
      JOIN address ON address.id::INT = orders.address_id::INT WHERE completed = false;
  `)
  ).rows;
}

async function OrdersPage() {
  const orders = await getOrders();
  console.log({ orders }, "asdad");

  return (
    <div className="mx-8">
      <div role="tablist" className="tabs tabs-lifted w-min mx-auto">
        <Link role="tab" className={`tab `} href={"/store/products"}>
          Products
        </Link>
        <Link
          role="tab"
          className={`tab tab-active [--tab-bg:#262626] `}
          href={"/store/orders"}
        >
          Orders
        </Link>
      </div>

      <div className=" bg-neutral-800 rounded-lg px-16 py-8 pt-2">
        <div className="overflow-x-auto">
          {orders.length === 0 && (
            <div className="text-center w-full italic">No pending orders</div>
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
