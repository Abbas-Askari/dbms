import Link from "next/link";
import FormInput from "./formInput";
import { Carousel } from "./carousel";

type Props = {
  actionCallback: (formData: FormData) => Promise<void>;
  title?: string;
  desc?: string;
  price?: number;
  stock?: number;
  id?: number;
};

export const ProductForm = ({
  actionCallback,
  title,
  desc,
  price,
  stock,
  id,
}: Props) => {
  return (
    <div className="flex justify-center items-center flex-1">
      <form
        action={actionCallback}
        className="w-1/2 flex flex-col gap-4 bg-neutral-800 text-white shadow-md rounded-xl p-12"
      >
        <div className="flex gap-4">
        <Carousel
          productId={id}
          className="aspect-square w-48 h-48 mx-auto "
          formInput={true}
          />

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
        <div className="group">
          <label htmlFor="description">Description</label>
          <textarea
            required
            name="description"
            id="description"
            className="textarea textarea-bordered"
            placeholder="Add some description"
            defaultValue={desc}
            rows={3}
            ></textarea>
        </div>
        </div>
        </div>

        <div className="flex gap-4 items-center">
        <div className="flex gap-2 flex-1 items-center">
          <label htmlFor="stock">Stock</label>
          <input
            name="stock"
            id="stock"
            type="text"
            placeholder="Give a title to your product"
            className="input input-sm input-bordered flex-1"
            defaultValue={stock}
          />
        </div>
        <div className="flex gap-2 flex-1 items-center">
          <label htmlFor="price">Price</label>
          <input
            name="price"
            id="price"
            type="number"
            placeholder="Price your product"
            className="input input-sm input-bordered w-full"
            defaultValue={price}
            />
        </div>
        </div>
        <div className="flex self-center gap-4 w-1/2">
          <Link href="/store" className="btn  btn-error flex-1">
            Discard
          </Link>
          <button className="btn btn-primary flex-1">Save</button>
        </div>
      </form>
    </div>
  );
};
