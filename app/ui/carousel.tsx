"use client";

import CarouselButtons from "../products/[id]/carousel";
import {
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getImages } from "../lib/imageActions";
import { fileToImage } from "../utils/general";

type Props = {
  productId?: number;
  className?: string;
  props?: any;
  formInput?: boolean;
};

export function Carousel({ productId, className, formInput, ...props }: Props) {
  const [images, setImages] = useState([]);
  console.log(images.map((i) => JSON.parse(JSON.stringify(i))));

  useEffect(() => {
    if (productId === undefined) return;
    getImages(productId).then((images) => setImages(images));
  }, [productId]);

  return (
    <div
      {...props}
      className={`${className} relative select-none bg-base-100 rounded-2xl`}
    >
      <CarouselButtons className="absolute left-2 right-2 top-[50%] translate-y-[-50%]" />

      {formInput && (
        <label className="btn p-1 box-border btn-circle btn-xs absolute left-1 top-1">
          <PlusIcon />
          <input
            type="file"
            className="hidden"
            onChange={async (e) => {
              console.log(e.target.files);
              const dataPromises = [];
              for (let file of Array.from(e.target.files)) {
                dataPromises.push(fileToImage(file));
              }
              const datas = await Promise.all(dataPromises);
              setImages((images) => [
                ...images,
                ...datas.map((data, i) => ({
                  name: e.target.files[i].name,
                  id: Math.random() * 100 + Date.now(),
                  data: data,
                })),
              ]);
            }}
          />
        </label>
      )}

      <input
        type="text"
        className=" hidden"
        name="images"
        value={JSON.stringify(images)}
        readOnly={true}
      />

      <div className="w-full h-full carousel rounded-box">
        <div className="carousel-item w-full flex items-center justify-center">
          <span className="text-xs">Click + to Add Images</span>
        </div>
        {images.map((image) => (
          <div className="carousel-item w-full">
            <img
              src={image.data}
              className="w-full object-contain"
              alt={image.name}
            />
            {formInput && (
              <button
                onClick={() => {
                  setImages((images) =>
                    images.filter((img) => img.id !== image.id)
                  );
                }}
                className="btn p-1 box-border btn-circle btn-xs absolute right-1 top-1"
              >
                <XMarkIcon />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
