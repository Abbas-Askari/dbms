'use client';

import { PhotoIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { updateProductQuantity } from "../lib/cartActions";
import { useRouter } from "next/navigation";
import { error } from "console";
import { useState } from "react";

export const CartProductCard = ({product, setProducts} : any) => {
    console.log(typeof product.quantity)
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    return (
        <div className='flex items-center gap-2 border-b-[1px] border-neutral-700 mb-4'>
            <PhotoIcon className='w-24 h-24'/>
            <div className="flex-1 mb-4">
                <div className="flex justify-between gap-16 mb-2">
                    <div className='  '>{product.title}</div>
                    <div className=''>${product.price * product.quantity}</div>
                </div>
                    <div className="ml-auto flex border-[1px] border-neutral-700 w-min px-3 py-1 gap-4 rounded-full">
                {
                    !loading ?
                    <>
                    <button onClick={async () => {
                        setLoading(true);
                        try {
                            const {res, error} = await updateProductQuantity(product.id, product.customer_id, product.quantity - 1);
                            setProducts(products => products.map((p) => p.id === product.id ? {...p, quantity: p.quantity - 1} : p));
                            console.log("Changed Product Quantity.")
                        }   catch (error) {
                            
                        }
                        setLoading(false);
                    }}>
                        <MinusIcon className='w-4 h-4'/>
                    </button>
                    <div className=" border-r-[1px] border-l-[1px] border-neutral-700 px-5">{product.quantity}</div>
                    <button onClick={async () => 
                    {
                        setLoading(true);
                        try {
                            const {res, error} = await updateProductQuantity(product.id, product.customer_id, product.quantity + 1);
                            if (error)  throw error;
                            setProducts(products => products.map((p) => p.id === product.id ? {...p, quantity: p.quantity + 1} : p));
                            console.log("Changed Product Quantity.");
                        } catch (error) {
                            
                        }
                        setLoading(false);
                    }}>
                        <PlusIcon className='w-4 h-4'/>
                    </button>
                    </>
                :
                <div className="">
                    <span className="loading loading-dots loading-sm"></span>
                </div>
                    }
                    </div>
            </div>
            </div>
            )
        }
