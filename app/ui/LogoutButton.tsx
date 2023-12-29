"use client"

// import { signOut } from "@/auth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";


export function LogoutButton() {
    return <button onClick={async () => {
            const result = await signOut();
            console.log({result})
        }} className='border-neutral-700  border-2 aspect-square w-12 h-12 flex items-center justify-center rounded-lg'>
        <ArrowLeftOnRectangleIcon className='w-6 h-6 ' />
    </button>;
}
