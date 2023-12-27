import Link from "next/link";
import { createCustomer } from "../lib/userActions";

const page = () => {
    return (
        <div className="flex justify-center items-center flex-1">
            <form className="flex flex-col gap-4 bg-white shadow-md rounded-xl p-12" action={createCustomer}>
                <h3 className="text-gray-700 font-bold text-3xl text-center">
                    Sign Up
                </h3>
                <div className="grid grid-cols-2 gap-4 gap-x-8">
                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 text-lg font-bold" htmlFor="name">
                            First Name
                        </label>
                        <input
                            className="form-input w-72"
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="Enter your first name"
                        />
                    </div> 
                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 text-lg font-bold" htmlFor="name">
                            Last Name
                        </label>
                        <input
                            className="form-input w-72"
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Enter your last name"
                        />
                    </div> 
                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 text-lg font-bold" htmlFor="name">
                            Phone
                        </label>
                        <input
                            className="form-input w-72"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Enter your phone number"
                            />
                    </div>  
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
                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 text-lg font-bold" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="form-input w-72"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
                        />
                    </div>
                </div>
                <p className="text-black text-center">
                    Already have an account? <Link href={'/login'} className="text-blue-500">Sign In</Link>
                </p>
                <div className="flex items-center justify-center">
                    <button
                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default page;
