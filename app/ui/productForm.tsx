import Link from "next/link";
import { Carousel } from "./carousel";
import FormSubmitButton from "./formSubmitButton";

type Props = {
  actionCallback: (formData: FormData) => Promise<void>;
  title?: string;
  desc?: string;
  price?: number;
  stock?: number;
  id?: number;
  isNew?: boolean;
};

export const ProductForm = ({
  actionCallback,
  title,
  desc,
  price,
  stock,
  id,
  isNew,
}: Props) => {
  return (
    <div className="flex justify-center items-center flex-1">
      <form
        action={actionCallback}
        className="w-1/2 flex flex-col gap-4 bg-neutral-800 text-white shadow-md rounded-xl p-12 artboard"
      >
        <h1 className=" text-2xl font-bold">
          {isNew ? "Create a new Product" : "Edit Product"}
        </h1>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="">Pictures</label>
            <Carousel
              productId={id}
              className="aspect-square h-48 mx-auto w-full border-[1px] border-neutral-700"
              formInput={true}
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="group">
              <label htmlFor="images" className="">
                Title
              </label>
              <input
                required
                type="text"
                name="title"
                placeholder="Give a title to your product"
                className="input input-sm input-bordered w-full"
                defaultValue={title}
              />
            </div>
            <div className="group flex-1">
              <label htmlFor="description">Description</label>
              <textarea
                required
                name="description"
                id="description"
                className="textarea textarea-bordered flex-1 resize-none"
                placeholder="Add some description"
                defaultValue={desc}
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="group flex-1">
            <label htmlFor="stock">Stock</label>
            <input
              required
              name="stock"
              id="stock"
              type="number"
              placeholder="Give a title to your product"
              className="input input-sm input-bordered w-full"
              defaultValue={stock}
            />
          </div>
          <div className="group flex-1">
            <label htmlFor="price">Price</label>
            <input
              required
              name="price"
              id="price"
              type="number"
              placeholder="Price your product"
              className="input input-sm input-bordered w-full"
              defaultValue={price}
            />
          </div>
        </div>
        <div className="flex self-center gap-4 w-full mt-4">
          <Link href="/store" className="btn  btn-error flex-1">
            Discard
          </Link>
          <FormSubmitButton value={"Save"} className=" flex-1 btn-primary" />
        </div>
      </form>
    </div>
  );
};
