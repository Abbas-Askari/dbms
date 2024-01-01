"use client";
import Link from "next/link";
import { makeCustomer, makeVendor } from "../lib/userActions";
import { useEffect, useState } from "react";
import { Carousel } from "../ui/carousel";

const page = () => {
  const [page, setPage] = useState(0);
  const [role, setRole] = useState("Customer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [error, setError] = useState("");

  const verifyEmail = (value: string) => {
    if (value !== "") {
      return true;
    } else {
      setError("Invalid Email Entered");
      return false;
    }
  };

  const isFilled = (...toCheck: string[]) => {
    for (let i = 0; i < toCheck.length; i++) {
      if (toCheck[i] === "") {
        setError("Please Fill all Fields");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setError("");
  }, [page]);

  return (
    <div className="flex justify-center items-center flex-1">
      <form
        className="flex flex-col gap-4 bg-white shadow-md min-w-[25%] rounded-xl p-12"
        action={(formData: FormData) =>
          role === "Customer"
            ? makeCustomer({
                email,
                phoneNumber,
                password,
                firstName,
                lastName,
              })
            : makeVendor({
                email,
                phoneNumber,
                password,
                firstName,
                lastName,
                storeName,
                storeDesc,
                images: formData.get("images") as string,
              })
        }
      >
        <h3 className="text-gray-700 font-bold text-3xl text-center">
          Sign up
        </h3>

        {page === 0 && (
          <>
            <h1 className="font-bold text-2xl text-neutral-700">
              Select Your Role:{" "}
            </h1>

            <div className="flex rounded-xl overflow-hidden border-2 border-black">
              {/* <button
                type="button"
                onClick={() => setRole("Customer")}
                className={`${
                  role === "Customer"
                    ? "bg-red-500 text-white"
                    : "bg-neutral-900 text-neutral-100 hover:bg-white hover:text-black"
                } flex-1 font-mono text-xl p-4 border-r border-white `}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("Vendor")}
                className={`${
                  role === "Vendor"
                    ? "bg-red-500 text-white"
                    : "bg-neutral-900 text-neutral-100 hover:bg-white hover:text-black"
                } flex-1 font-mono text-xl p-4 border-l border-white `}
              >
                Vendor
              </button> */}
              <div className="join">
                <input
                  className="join-item btn"
                  type="radio"
                  name="options"
                  aria-label="Radio 1"
                />
                <input
                  className="join-item btn"
                  type="radio"
                  name="options"
                  aria-label="Radio 2"
                />
              </div>
            </div>
            <button
              tabIndex={0}
              type="button"
              className="btn"
              onClick={() => setPage(1)}
            >
              Next
            </button>
          </>
        )}

        {page === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <label
                className="block text-gray-700 text-lg font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="form-input flex-1"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <p className="text-red-500 underline text-sm">{error}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn flex-1"
                onClick={() => setPage(0)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn flex-1"
                onClick={() => {
                  if (verifyEmail(email)) setPage(2);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label
                  className="block text-gray-700 text-lg font-bold"
                  htmlFor="first_name"
                >
                  First Name
                </label>
                <input
                  className="form-input flex-1"
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="block text-gray-700 text-lg font-bold"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
                <input
                  className="form-input flex-1"
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 underline text-sm">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                className="btn flex-1"
                onClick={() => setPage(1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn flex-1"
                onClick={() => {
                  if (isFilled(firstName, lastName)) setPage(3);
                }}
              >
                Next
              </button>
            </div>
          </>
        )}

        {page === 3 && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label
                  className="block text-gray-700 text-lg font-bold"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="form-input flex-1"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="block text-gray-700 text-lg font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="form-input flex-1"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 underline text-sm">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                className="btn flex-1"
                onClick={() => setPage(2)}
              >
                Previous
              </button>
              {role === "Customer" && (
                <button type="submit" className="btn btn-primary flex-1">
                  Done
                </button>
              )}
              {role === "Vendor" && (
                <button
                  type="button"
                  onClick={() => setPage(4)}
                  className="btn flex-1"
                >
                  Setup Shop
                </button>
              )}
            </div>
          </>
        )}

        {page === 4 && role === "Vendor" && (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Carousel
                  className="aspect-square w-48 h-48"
                  formInput={true}
                />

                <div className="flex flex-col gap-2 w-96">
                  <input
                    className="form-input"
                    id="storeName"
                    name="storeName"
                    type="text"
                    placeholder="Enter your Store's Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                  <textarea
                    className="form-input flex-1"
                    id="storeDesc"
                    name="storeDesc"
                    placeholder="Enter your Store's Description"
                    value={storeDesc}
                    onChange={(e) => setStoreDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn flex-1"
                onClick={() => setPage(3)}
              >
                Previous
              </button>
              <button type="submit" className="btn btn-primary flex-1">
                Done
              </button>
            </div>
          </>
        )}

        <p className="text-black text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default page;
