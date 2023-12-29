"use client";

import React from "react";
import { uploadImage } from "../lib/imageActions";
import FormSubmitButton from "../ui/formSubmitButton";

function ImageUploadPage() {
  return (
    <div className="h-screen ">
      <form
        action={async (formData: FormData) => {
          const fileReader = new FileReader();
          const image = formData.get("image") as File;
          fileReader.readAsDataURL(image);
          fileReader.addEventListener("load", () => {
            uploadImage(image.name, fileReader.result as string);
          });
        }}
        className=" artboard flex flex-col p-16 gap-8 items-center shadow bg-white w-fit mx-auto rounded-lg"
      >
        <img src="" alt="" className="" />
        <input
          name="image"
          type="file"
          className="file-input w-full max-w-xs"
        />
        <FormSubmitButton value={"Upload"} />
        {/* <button className="btn btn-primary">Upload</button> */}
      </form>
    </div>
  );
}

export default ImageUploadPage;
