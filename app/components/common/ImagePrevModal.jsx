import Image from "next/image";
import React from "react";
import CrossIcon from "../../assets/main/65-close.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPrevImage } from "../../../lib/features/shared/sharedSlice";

const ImagePrevModal = () => {
  const { prevImage } = useSelector((state) => state.shared);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        prevImage.modal ? "fixed" : "hidden"
      } z-20 w-full h-full flex items-center `}
    >
      {/* // Outer Black on whole screen till scroll end */}
      <div className="absolute z-50 bg-black opacity-50 w-full h-full"></div>
      {/* Container equal to screen to middle the modal */}
      <div className="w-full relative z-[60] h-screen flex justify-center items-center">
        {/* Modal */}
        <div className="relative">
          <Image
            src={
              typeof prevImage?.img === "string"
                ? prevImage?.img
                : URL.createObjectURL(prevImage?.img)
            }
            alt="preview"
            className="relative max-w-[75vw] rounded-2xl flex flex-col justify-center items-center gap-4  "
            width={1300}
            height={1100}
          />
          {/* Cross icon */}
          <Image
            onClick={() => {
              dispatch(setPrevImage({ modal: false, img: "" }));
            }}
            src={CrossIcon}
            alt="cross"
            className="cursor-pointer absolute -top-7 -right-9"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePrevModal;
