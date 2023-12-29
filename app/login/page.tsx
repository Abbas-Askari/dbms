'use client';

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/userActions";

const page = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const {pending} = useFormStatus();

    return (
        <div  className="flex justify-center items-center flex-1">
            <form action={dispatch} className="flex flex-col gap-4 bg-white shadow-md rounded-xl p-12" >
                <h2 className="text-gray-700 font-bold text-3xl text-center">
                    Sign In
                </h2>
                <div className="flex flex-col gap-2">
                    <label className="block text-gray-700 text-lg font-bold" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="form-input w-72"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="block text-gray-700 text-lg font-bold" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-input w-72"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="text-black">
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
