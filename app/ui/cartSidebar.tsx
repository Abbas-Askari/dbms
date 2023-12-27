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


// const fetcher = (...args) => fetch(...args, {next: {tags: ["cart"]}, cache: 'no-store'}).then((res) => res.json());

const CartSidebar = ({setIsOpen}) => {
    unstable_noStore();

    // const {data, error} = useSWR('/api/cart', fetcher);
    // const products = data?.result.rows;
    const [products, setProducts] = useState([]);
    console.log("Rerendering Cart.", {products})

    useEffect(() => {
        fetch('/api/cart').then((res) => 
            res.json().then((result) => {console.log({newProducts: result}); setProducts(result.result)})
        );
    }, []);


    
    // const session = await auth();

    // const products = (await sql`SELECT * FROM product JOIN cart ON cart.product_id = product.id ORDER BY product.id`).rows;

    
    const totalCost = products?.reduce((acc: number, product: any) => {
        return acc + product.price * product.quantity;
    }, 0) || 0;


    return (
        <div className="absolute z-10 top-0 right-0 h-[100vh] backdrop-filter backdrop-blur-md  bg-[#000000e8] p-8 flex flex-col">
            
            <div className="flex items-center justify-between mb-4">
                <div className=" font-bold text-xl">Cart</div>
                <button onClick={() => setIsOpen(false)}>
                    <XMarkIcon className='w-8 h-8 border-[1px] border-neutral-700 rounded-md p-1'/>
                </button>
            </div>

            <div className="  flex-1">
                {products.length > 0 ? products?.map((product) => (
                    <CartProductCard key={product.id} product={product}  setProducts={setProducts}/>
                )) : <span className='text-neutral-400 italic text-center w-full'>Your cart is empty.</span>}

            </div>

            <div className="flex mb-4 text-sm">
                <div className="mr-auto font-light">Total</div>
                <div className=" ">${totalCost.toFixed(2)} USD</div>
                </div>
            <button className="btn">This button</button>

            <Link href={'/checkout'} className=' bg-blue-700 px-8 py-3 text-sm rounded-full text-center' onClick={() => setIsOpen(false)}>Proceed to Checkout</Link>
        </div>

    )
}

export default CartSidebar