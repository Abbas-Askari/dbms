import Link from "next/link";

export const ProductForm = ({
  actionCallback,
  title,
  desc,
  price,
  stock,
}: {
  actionCallback: (formData: FormData) => Promise<void>;
  title?: string;
  desc?: string;
  price?: number;
  stock?: number;
}) => {
  return (
    <div className="flex justify-center items-center flex-1">
      <form
        action={actionCallback}
        className="w-1/2 flex flex-col gap-4 bg-white shadow-md rounded-xl p-12"
      >
        <div className="flex gap-4">
          <img
            src=""
            alt=""
            className="aspect-square h-full border-black border-2 rounded-xl flex-1"
          />
          <div className="flex flex-col gap-4 flex-[2_2_0%]">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title ? title : ""}
              className="form-input w-full"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={desc ? desc : ""}
              rows={8}
              className="form-input w-full"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={stock ? stock : ""}
            className="form-input flex-1"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price ? price : ""}
            className="form-input flex-1"
          />
        </div>
        <div className="flex self-center gap-4 w-1/2">
          <Link href="/store" className="btn btn-accent flex-1">
            Discard
          </Link>
          <button className="btn btn-primary flex-1">Save</button>
        </div>
      </form>
    </div>
  );
};
