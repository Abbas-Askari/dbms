import React from "react";
import next from "../../public/next.svg";

function SellerInfo() {
  return (
    <div className=" p-8 flex gap-8 items-center">
      <img
        src={"/next.svg"}
        alt=""
        className=" w-20  aspect-square object-contain flex-shrink-0 bg-white box-border p-4"
      />
      <div className="">
        <h1 className="text-2xl font-bold">Abbas And Bros.</h1>
        <div className="description">
          An online store is a website or app where buyers can see a catalog of
          products or services and make electronic purchases. An ecommerce store
          is slightly different from an online store in that it doesn't need to
          have a digital catalog or checkout process, only an electronic payment
          method.
        </div>
      </div>
    </div>
  );
}

export default SellerInfo;
