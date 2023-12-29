'use client';

import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import CartSidebar from './cartSidebar';

const CartToggleButton = ({children} : any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <button onClick={() => setIsOpen(!isOpen)} className='border-neutral-700 border-2  aspect-square p-2 rounded-lg hover:border-neutral-500'>
            <ShoppingCartIcon className='w-6 h-6  ' />
        </button>
        {isOpen && <CartSidebar setIsOpen={setIsOpen}/>}
    </>
  )   
}

export default CartToggleButton;