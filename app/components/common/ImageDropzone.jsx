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
  imgArray,
  setImgArray,
  onImageChange,
  htmlName = "image1",
  placeholder = "Upload Part Image",
}) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full relative p-4 hover:border-gray-400 rounded-lg border   flex justify-center items-center border-[#D0D5DD]">
      {imgArray?.length > 0 ? (
        <div className="w-full flex justify-start items-center min-h-20 space-x-2">
          {imgArray.map((img, index) => (
            <div key={index} className="relative ">
              <Image
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                width={80}
                height={80}
                alt="img"
              />
              <div
                className={`absolute top-[-15px] right-[-15px] cursor-pointer ${
                  previewMode ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <Image
                  onClick={() => {
                    setImgArray(imgArray.filter((item) => item !== img));
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
          ))}
        </div>
      ) : previewMode === true && imgArray?.length === 0 ? (
        <p className="text-center">No Image Uploaded</p>
      ) : (
        <label
          className="flex flex-col justify-center items-center cursor-pointer  space-y-2 min-h-20 "
          htmlFor={htmlName}
        >
          <Image src={UploadIcon} alt="UploadIcon" />
          <p className="text-[#01E268]">{placeholder}</p>{" "}
          <input
            onChange={onImageChange}
            id={htmlName}
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            type="file"
            multiple
          />
        </label>
      )}
      <label
        className={`absolute bg-white cursor-pointer top-2 right-2 ${
          imgArray?.length > 0 ? "block" : "hidden"
        } ${previewMode ? "pointer-events-none opacity-50" : ""}`}
      >
        <input
          className="hidden"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={onImageChange}
          multiple
        />
        <Image width={20} height={20} src={PlusIcon} alt="PlusIcon" />
      </label>
    </div>
  );
};

export default ImageDropzone;
