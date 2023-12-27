import React from 'react'
import { getCartProducts, placeOrder } from '../lib/cartActions';
import { ChevronLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import FormInput from '../ui/formInput';
import Link from 'next/link';
import FormSubmitButton from '../ui/formSubmitButton';

const CheckoutProductCard = ({product}) => {
    

    return (
        <div className="flex items-center mb-4 gap-4 items-center  ">
            <PhotoIcon className="w-12 h-12"/>
            <div className="flex-1">
                <div className="">{product.title}</div>
                <div className=" text-neutral-400 text-xs">{product.quantity} x ${product.price}</div>
            </div>
            <div className="">${(product.quantity * product.price).toFixed(2)}</div>
        </div>
    )
}





const CheckoutPage = async () => {
    const cart = await getCartProducts();
    
    const subtotal = cart?.reduce((acc, product) => acc + product.quantity * product.price, 0) || 0;

    return (
    <div className="flex h-screen">
        <form action={placeOrder} className="flex-1 p-16 flex flex-col">
            <h3 className=' font-semibold text-lg mb-2'>Contact</h3>
                <FormInput placeholder='Email or phone number' name="email_phone" type='text' className='' />

            <h3 className=' font-semibold text-lg mb-2 mt-6'>Shipping Address</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <FormInput placeholder='First name' name="first_name" type='text' className='' />
                    <FormInput placeholder='Last name' name="last_name" type='text' className='' />
                </div>
                <FormInput placeholder='Address' name='address' type='text' className='' />
                <div className="flex gap-4">
                    <FormInput placeholder='City' name='city' type='text' className='' />
                    <FormInput placeholder='State' name='province' type='text' className='' />
                    <FormInput placeholder='Zip Code' type='text' name="zip_code" className='' />
                </div>
            </div>

            <div className="flex mt-8 justify-between">
                <Link href={'/products'} className="flex items-center gap-2">
                    <ChevronLeftIcon className='w-4 h-4 inline-block text-blue-500'/>
                    <span className='text-blue-500'>More Products</span>
                </Link>
                <FormSubmitButton className='bg-blue-500 px-6 py-2 rounded-md text-white font-bold  ' value={'Place Order'} />
                {/* <button className='bg-blue-500 px-6 py-2 rounded-md text-white font-bold  '>Place Order</button> */}
            </div>
        </form>
        <div className="flex-1 flex flex-col border-l-[1px] border-neutral-700 p-16">

            <div className="max-w-md mb-4">

                {cart?.map((product) => (<CheckoutProductCard product={product}/>))}            
            </div>

            <div className="flex justify-between max-w-md font-semibold text-sm mb-1">
                <div className="font-light">Subtotal</div>
                <div className=""> ${subtotal.toFixed(2)}</div>
            </div>

            <div className="flex justify-between max-w-md font-semibold text-sm mb-1">
                <div className="font-light">Shipping</div>
                <div className=""> $2.00</div>
            </div>

            <div className="flex justify-between max-w-md text-lg font-bold">
                <div className="">Total</div>
                <div className=""><span className='text-neutral-600  font-normal text-sm mx-1'>USD</span> ${(subtotal + 2).toFixed(2)}</div>
            </div>
        </div>

    </div>
  )
}

export default CheckoutPage;