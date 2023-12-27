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
        <div className="z-100 h-screen bg-black bg-opacity-90 p-8 flex flex-col gap-4 w-max">
            <div className="flex items-center justify-between">
                <div className=" font-bold text-xl">Cart</div>
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
                        {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-700"></div> */}
                        <span className="loading loading-spinner loading-lg"></span>

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