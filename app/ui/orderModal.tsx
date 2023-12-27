'use client';

import { completeOrder } from "../lib/cartActions";
import { numberToDollars } from "../utils/general";
import CompleteOrderButton from "./completeOrderButton";

function OrderModal({order}: {order: any}) {
    console.log({order})

  return (
        <tr>
            <button className="btn" onClick={()=>document.getElementById(`${order.id}-order-modal`).showModal()}>Manage</button>
            <dialog id={`${order.id}-order-modal`} className="modal">
            <div className="modal-box">

            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{order.first_name + " " + order.last_name}</h2>
                <div className="">
                    <h1 className=" card-title">Address</h1>
                    <div className="pl-2">
                        <div>{order.address}</div>
                        <div className="flex justify-between">
                        <span className="font-semibold">City:</span>
                            <span>{order.city}  </span>
                            <span>Province:</span>
                            <span className="font-semibold">{order.province}  </span>
                            <span>Zip:</span>
                            <span>{order.zip_code}</span>
                        </div>
                    </div>
                </div>
                <div className="flex  justify-between items-center">
                    <div className="card-title">Quantity</div>
                    <div className=" text-xl font-bold">{order.quantity}</div>
                </div>

                <div className="flex  justify-between items-center">
                    <div className="card-title">Total</div>
                    <div className=" text-xl font-bold">{numberToDollars(+order.price * order.quantity)}</div>
                </div>
                <div className="card-actions flex mt-4">
                    <form action={() => completeOrder(order.order_id, order.product_id)}>
                        <CompleteOrderButton />
                    </form>
                    <form method="dialog" className=" flex-1">
                        <button className="btn  btn-info w-full ">Close</button>
                    </form>
                </div>
            </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
        </tr>
    )
}

export default OrderModal