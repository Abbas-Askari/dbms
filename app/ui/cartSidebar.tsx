'use client';

import { auth } from '../api/auth/[...nextauth]/route';
import { sql } from '@vercel/postgres';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { cache, useEffect, useState } from 'react'
import { Product } from '../lib/definitions';
import { MinusIcon, PhotoIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getCartProducts, updateProductQuantity } from '../lib/cartActions';
import { CartProductCard } from './cartProductCard';
import useSWR from 'swr';
import { noSSR } from 'next/dynamic';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';


const fetcher = (...args) => fetch(...args, {next: {tags: ["cart"]}, cache: 'no-store'}).then((res) => res.json());

const CartSidebar = ({setIsOpen}) => {
    unstable_noStore();
    const [products, setProducts] = useState([]);
    const {data, error} = useSWR('/api/cart', fetcher);

    useEffect(() => {
        if (data) {
            console.log({newProducts: data.result})
            setProducts(data.result);
        }
    }, [data]);
    
    const totalCost = products?.reduce((acc: number, product: any) => {
        return acc + product.price * product.quantity;
    }, 0) || 0;

    return (
        <div className="absolute z-10 top-0 right-0 h-screen backdrop-filter backdrop-blur-md  bg-[#000000e8] p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className=" font-bold text-xl">Cart</div>
                <button onClick={() => setIsOpen(false)}>
                    <XMarkIcon className='w-8 h-8 border-[1px] border-neutral-700 rounded-md p-1'/>
                </button>
            </div>

            {
                data ? 
                    <div className="  flex-1">
                        {products.length > 0 ? products?.map((product) => (
                            <CartProductCard key={product.id} product={product}  setProducts={setProducts}/>
                        )) : <span className='text-neutral-400 italic text-center w-full'>Your cart is empty.</span>}

                    </div>
                :
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-700"></div>
                    </div>
            }


            <div className="flex text-lg justify-between">
                <div className="font-light">Total</div>
                <div className=" ">${totalCost.toFixed(2)} USD</div>
            </div>

            <Link href={'/checkout'} className='btn' onClick={() => setIsOpen(false)}>Proceed to Checkout</Link>
        </div>
    )
}

export default CartSidebar