import React from 'react'
import SellerInfo from '../ui/sellerInfo';
import { Order } from '../lib/definitions';
import { sql } from '@vercel/postgres';
import { numberToDollars, timeAgo } from '../utils/general';
import * as dayjs from 'dayjs';
import OrderModal from '../ui/orderModal';
dayjs.extend(require('dayjs/plugin/relativeTime'));



async function getOrders(): Promise<any[]> {
  "use server";
  return (await sql`
      SELECT * FROM order_ JOIN customer ON order_.customer_id = customer_id
      JOIN orderProducts ON order_.id = orderProducts.order_id JOIN product ON orderProducts.product_id = product.id
      JOIN address ON address.id::INT = order_.address_id::INT;
  `).rows;
}

async function OrdersPage() {
    const orders = await getOrders();
    console.log({orders}, "asdad");

  return (
    <div className=" h-screen  ">
        <SellerInfo />
        <div className="px-16 py-8">
        <div className="overflow-x-auto">
            <table className="table   ">
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

                {
                  orders.map((order, i) => <tr>
                    <th>{i}</th>
                    <td className='font-semibold'>{order.title}</td>
                    <td>{order.first_name + order.last_name}</td>
                    <td>{
                        // calculate time ago using dayjs
                        dayjs(order.date).fromNow(true)

                        }</td>
                    <td>{order.quantity}</td>
                    <td>{numberToDollars(order.quantity * (+order.price))}</td>
                    <OrderModal order={order}/>
                  </tr>)
                }



              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default OrdersPage;