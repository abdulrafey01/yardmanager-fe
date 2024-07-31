import React from "react";

import XIcon from "../../assets/main/45-xclose.svg";

import EnlargeIcon from "../../assets/main/46-enlarge.svg";

import PlusIcon from "../../assets/main/82-plus.svg";
import Image from "next/image";

import UploadIcon from "../../assets/main/44-upload.svg";
import { useDispatch } from "react-redux";
import { setPrevImage } from "../../../lib/features/shared/sharedSlice";
const ImageDropzone = ({
  previewMode = false,
  img,
  setImg,
  onImageChange,
  placeholder,
  htmlName = "image1",
}) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full relative p-4 hover:border-gray-400 rounded-lg border   flex justify-center items-center border-[#D0D5DD]">
      {img ? (
        <div className="w-full flex justify-center items-center min-h-20 space-x-2">
          <div className="relative flex justify-center items-center ">
            <Image
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt="img"
              width={100}
              height={100}
              className="w-32 h-32"
            />
            <div className="absolute top-[-15px] right-[-15px] cursor-pointer">
              <Image
                onClick={() => {
                  setImg(null);
                }}
                src={XIcon}
                alt="XIcon"
              />
            </div>
            <div
              onClick={() => {
                dispatch(setPrevImage({ modal: true, img }));
              }}
              className="absolute top-0 left-0 cursor-pointer"
            >
              <Image src={EnlargeIcon} alt="EnlargeIcon" />
            </div>
          </div>
        </div>
      ) : previewMode === true && img ? (
        <p className="text-center">No Image Uploaded</p>
      ) : (
        <label
          className="flex flex-col justify-center items-center cursor-pointer  space-y-2 min-h-20 "
          htmlFor={htmlName}
        >
          <Image src={UploadIcon} alt="UploadIcon" />
          <p className="text-[#01E268] text-center">{placeholder}</p>{" "}
          <input
            onChange={onImageChange}
            id={htmlName}
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            type="file"
          />
        </label>
      )}
    </div>
  );
};

export default ImageDropzone;
