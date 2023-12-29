import React from "react";
import SellerInfo from "../ui/sellerInfo";
import { Order } from "../lib/definitions";
import { sql } from "@vercel/postgres";
import { numberToDollars } from "../utils/general";
import * as dayjs from "dayjs";
import OrderModal from "../ui/orderModal";
import DB from "@/database";
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
    <div className=" h-screen  ">
      <SellerInfo />
      <div className="px-16 py-8 bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="table">
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
