import { getProductById } from "@/app/lib/actions";
import { addToCart, removeFromCart } from "@/app/lib/cartActions";
import { Product, Review } from "@/app/lib/definitions";
import SellerInfo from "@/app/ui/sellerInfo";
import { auth } from "@/app/api/auth/[...nextauth]/route";
// import { sql } from "@vercel/postgres";
// import { sql } from "@/database";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import React from "react";
import FormSubmitButton from "@/app/ui/formSubmitButton";
import CarouselButton from "./carousel";
import CarouselButtons from "./carousel";
import DB from "@/database";
import { notFound } from "next/navigation";
import { Rating } from "@/app/ui/rating";
import { addReview, deleteReview } from "@/app/lib/reviewActions";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  params: { id: string };
};

async function Page({ params }: Props) {
  // unstable_noStore();

  const { id } = params;
  const product: Product = await getProductById(id);
  if (!product) notFound();

  // const products: Product[] = (await sql`SELECT * FROM product;`)
  //   .rows as Product[];

  // const session = await getSession();
  const session = await auth();
  // const session = await getSession();
  const addToCartBound = addToCart.bind(
    null,
    product.id,
    session?.user?.id as string
  );
  const removeFromCartBound = removeFromCart.bind(
    null,
    product.id,
    session?.user?.id as string
  );
  const inCart =
    (
      await DB.query(
        `SELECT * FROM cart WHERE product_id=${product.id} AND customer_id=${session?.user?.id};`
      )
    ).rowCount > 0;

  const images = (
    await DB.query(`
    SELECT * from image WHERE id IN 
      (SELECT image_id FROM productimage WHERE product_id = ${product.id}) ;`)
  ).rows;

  const reviews = (
    await DB.query(`
    SELECT review.*, customer.first_name, customer.last_name 
    FROM review JOIN customer ON customer_id = customer.id
    WHERE product_id = ${product.id};`)
  ).rows as Review[];

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex">
        <div className="flex flex-1 p-8 px-16 gap-8">
          <div className="flex-1 h-full aspect-square relative bg-base-100 rounded-2xl">
            <CarouselButtons className="absolute left-2 right-2 top-[50%] translate-y-[-50%]" />
            <div className="w-full h-full carousel rounded-box">
              {/* <div className="carousel-item w-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div> */}
              {images.length > 0 ? (
                images.map((image) => (
                  <div className="carousel-item w-full">
                    <img
                      src={image.data}
                      className="w-full object-contain"
                      alt={image.name}
                    />
                  </div>
                ))
              ) : (
                <span className=" indicator-top">
                  This product has no images
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-[2_2_0%] justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="text-4xl font-bold">{product.title}</div>
                <form action={!inCart ? addToCartBound : removeFromCartBound}>
                  <FormSubmitButton
                    className=" bg-gray-800 hover:bg-gray-600 outline-none px-6 py-2 rounded-lg mx-auto  "
                    value={!inCart ? "Add to Cart" : "Remove from Cart"}
                  />
                </form>
              </div>
              <div className="text-lg text-neutral-300">
                {product.description}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-4xl">${product.price}</div>
              <div className="text-3xl">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-2xl font-bold">Store</div>
        <Link
          href="/store"
          className=" hover:bg-[#ffffff20] transition-colors py-4 px-8 rounded-md flex gap-8 items-center "
        >
          <img
            src={"/next.svg"}
            alt=""
            className=" w-20  aspect-square object-contain flex-shrink-0 bg-white box-border p-4"
          />
          <div className="">
            <h1 className="text-xl font-semibold">Abbas And Bros.</h1>
            <div className="description text-sm">
              An online store is a website or app where buyers can see a catalog
              of products or services and make electronic purchases. An
              ecommerce store is slightly different from an online store in that
              it doesn't need to have a digital catalog or checkout process,
              only an electronic payment method.
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">Reviews</div>
        <div className="flex flex-col gap-2">
          <Revi />
          <Revi />
          {reviews.map((review) => (
            <Review review={review} customerId={+session?.user?.id as number} />
          ))}
        </div>
        <WriteReview productId={product.id} />
      </div>
    </div>
  );
}

function Revi() {
  return (
    <div className="flex flex-col bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between p-2 border-b border-white">
        <div className="text-sm">Abbas Askari</div>
        <div className="text-sm">
          12<sup>th</sup> Sep. 2023
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="title text-lg font-semibold">
          <span>An Amazing Product</span>
        </div>

        <div className="">
          Thanks Mr's Abbas and you'r bros. as well for this awsome product.
        </div>
      </div>
    </div>
  );
}

function Review({ review, customerId }: { review: any; customerId: number }) {
  const deleteReviewBound = deleteReview.bind(null, review.id);
  return (
    <div className="flex flex-col bg-neutral-800 p-4 rounded-lg relative">
      {customerId === review.customer_id && (
        <form action={deleteReviewBound}>
          <button className="btn btn-circle btn-xs absolute right-0 top-0">
            <XMarkIcon className="p-1 text-white" />
          </button>
        </form>
      )}

      <div className="flex justify-between p-2 border-b border-white">
        <div className="text-sm">
          {review.first_name} {review.last_name}
        </div>
        <div className="text-sm">
          {review.date.toDateString().split(" ").slice(1, 4).join(" ")}
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="title text-lg font-semibold flex justify-between items-center">
          <span>{review.title}</span>
          <Rating
            id={review.id}
            defaultRating={review.rating}
            disabled
            className={"rating-sm"}
          />
        </div>
        <div className="">{review.content}</div>
      </div>
    </div>
  );
}

function WriteReview({ productId }: { productId: number }) {
  const addReviewBound = addReview.bind(null, productId);

  return (
    <form className="flex flex-col gap-2" action={addReviewBound}>
      <h1 className="font-bold text-2xl">Add Your Review</h1>
      <div className="flex justify-between items-center gap-8">
        <input
          name="title"
          className="w-full form-input"
          placeholder="Enter title for the review"
        />
        <Rating />
        <input
          type="radiobutton"
          className="hidden"
          value={5}
          name="rating"
          readOnly
        />
      </div>
      <textarea
        name="content"
        className="w-full form-input resize-none"
        placeholder="Enter you comments about this product."
      />
      <div className="flex justify-end gap-2">
        <button
          type="reset"
          className="hover:bg-red-900 bg-red-700 transition-colors px-4 py-1 rounded-md"
        >
          Discard
        </button>
        <button className="hover:bg-gray-900 bg-gray-700  transition-colors px-4 py-1 rounded-md">
          Post
        </button>
      </div>
    </form>
  );
}

export default Page;
