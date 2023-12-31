import React from "react";
import { Vendor } from "../lib/definitions";
import DB from "@/database";

async function SellerInfo({ vendorId }: { vendorId: string }) {
  const result = await DB.query(`SELECT * FROM vendor WHERE id = ${vendorId}`);
  const vendor = result.rows[0] as Vendor;

  return (
    // <div className="p-8 flex gap-8 items-center">
    //   <img
    //     src={"/next.svg"}
    //     alt=""
    //     className=" w-20  aspect-square object-contain flex-shrink-0 bg-white box-border p-4"
    //   />
    //   <div className="">
    //     <h1 className="text-2xl font-bold">Abbas And Bros.</h1>
    //     <div className="description">
    //       An online store is a website or app where buyers can see a catalog of
    //       products or services and make electronic purchases. An ecommerce store
    //       is slightly different from an online store in that it doesn't need to
    //       have a digital catalog or checkout process, only an electronic payment
    //       method.
    //     </div>
    //   </div>
    // </div>

    <div className="p-8 flex gap-8">
      <img
        src={"/next.svg"}
        alt=""
        className=" self-center w-32  aspect-square object-contain flex-shrink-0 bg-white box-border p-4"
      />
      <div className=" flex flex-col self-streach">
        <h1 className="text-2xl font-bold">{vendor.store_name}</h1>
        <div className="description">{vendor.store_description}</div>
        <div className="mt-auto flex gap-8">
          <div className="">Phone: {vendor.phone}</div>
          <div className="">Email: {vendor.email}</div>
        </div>
      </div>
    </div>
  );
}

export default SellerInfo;
