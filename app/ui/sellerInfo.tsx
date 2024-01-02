import React from "react";
import DB from "@/database";
import { PhotoIcon } from "@heroicons/react/20/solid";

async function SellerInfo({ vendorId }: { vendorId: string }) {
  const result = await DB.query(`SELECT * FROM users WHERE store_id = ${vendorId}`);
  const vendor = result.rows[0]
  const store_id = result.rows[0].store_id 
  const store = (await DB.query(`SELECT * FROM store WHERE id = ${store_id}`)).rows[0]

  const query = `
  SELECT data FROM image JOIN storeimage ON store_id = ${vendorId} AND image_id = id;
  `;

  console.log(query);

  const imageResult = await DB.query(query);

  const imageData = imageResult.rows[0]?.data;

  return (
        <div className="p-8 flex gap-8">
      {imageData ? (
        <img
          src={imageData}
          className="self-center flex-shrink-0 h-48 w-48 rounded-xl bg-[#00000020] border-neutral-500 border-[1px] object-contain p-2"
        />
      ) : (
        <div className="self-center flex-shrink-0 h-48 w-48 rounded-xl bg-[#00000080] border-neutral-500 border-[1px] flex flex-col items-center  justify-center opacity-25">
          <PhotoIcon className="w-12 h-12 textwhite" />
          <span className=" font-extrabold italic">No photo</span>
        </div>
      )}

      <div className=" flex flex-col self-streach">
        <h1 className="text-2xl font-bold">{store.name}</h1>
        <div className="description text-sm">{store.description}</div>
        <div className="mt-auto flex gap-8">
          <div className="">Phone: {vendor.phone}</div>
          <div className="">Email: {vendor.email}</div>
        </div>
      </div>
    </div>
  );
}

export default SellerInfo;
