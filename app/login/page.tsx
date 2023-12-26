'use client';

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/userActions";

const page = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const {pending} = useFormStatus();

    return (
        <div  className="flex justify-center items-center h-screen">
            <form action={dispatch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                <div className="text-gray-700 font-bold text-2xl text-center mb-4">
                    Sign In
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="text-black mb-4">
                    Don't have an account? <Link href={'/signup'} className="text-blue-500">Sign Up</Link>
                </div>

                {
                    errorMessage && (
                        <div className="text-red-500 mb-4">
                            {errorMessage}
                        </div>
                    )    
                }

                <div className="flex items-center justify-between">
                    <button
                        className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        aria-disabled={pending}
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default page;
