// import * as dayjs from "dayjs";
import dayjs from "dayjs"
import { getUserOrders } from "../lib/userActions"
import { numberToDollars } from "../utils/general"

const page = async () => {

  const orders = await getUserOrders()

  const totalSales = orders.reduce((sales, order) => sales + order.price*order.quantity, 0)
  const completedOrders = orders.reduce((count, order) => order.completed ? count + 1: count, 0)

  return (
    <div className="flex flex-col gap-4 p-8">

<div className="flex justify-center gap-8">
        <div className="stats shadow bg-inherit">
          <div className="stat place-items-center">
            <div className="stat-title text-xs">Total Orders</div>
            <div className="stat-value text-2xl">{orders.length}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-xs">Sales</div>
            <div className="stat-value text-2xl">
              {numberToDollars(totalSales)}
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-xs">Completed</div>
            <div className="stat-value text-2xl">{completedOrders}</div>
          </div>
        </div>
      </div>

    <div className=" bg-neutral-800 rounded-lg px-16 py-8 pt-2 w-full">
        <div className="overflow-x-auto">
          {orders.length === 0 && (
            <div className="text-center w-full  italic opacity-20 pt-4">
              No orders made
            </div>
          )}
          <table className={`table ${orders.length === 0 ? "hidden" : ""}`}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr className="p-2">
                  <td>{i + 1}</td>
                  <td className="font-semibold">{order.title}</td>
                  <td>
                    {
                      // calculate time ago using dayjs
                      ""+dayjs(order.date).toString()
                    }
                  </td>
                  <td>{order.quantity}</td>
                  <td>{numberToDollars(order.quantity * +order.price)}</td>
                  <td>{order.completed ? "Completed": "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
    </div>
    </div>
  )
}

export default page