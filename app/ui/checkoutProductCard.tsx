import { PhotoIcon } from "@heroicons/react/24/outline";

export const CheckoutProductCard = ({ product }: {product: any}) => {
    return (
      <div className="flex items-center gap-4 my-2">
        <div className="w-16 h-16">
          {product.data ? (
            <img
              src={product.data}
              className="h-16 w-16 rounded-lg bg-[#00000080] border-neutral-100 border-[1px] object-contain"
            />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-[#00000080] border-neutral-100 border-[1px] flex flex-col items-center  justify-center opacity-25">
              <PhotoIcon className="w-8 h-8 textwhite" />
              <span className=" font-extrabold italic text-xs">No photo</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="">{product.title}</div>
          <div className=" text-neutral-400 text-xs">
            {product.quantity} x ${product.price}
          </div>
        </div>
        <div className="">${(product.quantity * product.price).toFixed(2)}</div>
      </div>
    );
  };