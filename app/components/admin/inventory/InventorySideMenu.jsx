import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideMenu } from "../../../../lib/features/shared/sharedSlice";

import UploadIcon from "../../../assets/main/44-upload.svg";

import XIcon from "../../../assets/main/45-xclose.svg";
import FancyInput from "../../common/FancyInput";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import GreenBtn from "../../../abstracts/GreenBtn";
import CrossIcon from "../../../assets/main/80-cross.svg";
import Image from "next/image";
import EnlargeIcon from "../../../assets/main/46-enlarge.svg";

const InventorySideMenu = () => {
  const [imgArray, setImgArray] = React.useState(null);

  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.shared);

  const onImageChange = (e) => {
    // formData not set directly becauese files after selecting appearing in box are coming from imgArray
    const files = Array.from(e.target.files);
    setImgArray(files);
    // for (let i = 0; i < files.length; i++) {
    //   formDataRef.current.append("images", files[i]);
    // }
  };
  return (
    <div
      className={`fixed ${
        showSideMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={() => {
          dispatch(setShowSideMenu({ value: false }));
          console.log("clicked");
        }}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div className="flex-1  bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start ">
        <div className="p-6 flex w-full flex-col space-y-4">
          <div className="flex justify-between items-center w-full ">
            <p className="font-semibold">
              {showSideMenu.mode === "edit"
                ? "Edit Inventory"
                : showSideMenu.mode === "preview"
                ? "Preview Inventory"
                : "Add New Inventory"}
            </p>
            <Image
              src={CrossIcon}
              alt="CrossIcon"
              className="cursor-pointer"
              onClick={() => dispatch(setShowSideMenu({ value: false }))}
            />
          </div>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col gap-5   w-full `}
          >
            {/* Inventory Name input */}
            <FancyInput identity={"inventoryName"} placeholder={"Name"} />
            {/* Inventory Email input */}
            <FancyInput
              identity={"inventoryLocation"}
              placeholder={"Location"}
            />
            <div className="flex gap-4">
              {/* Inventory Date Added */}
              <FancyInput
                type={"date"}
                identity={"dateAdded"}
                placeholder={"Date Added"}
              />
              {/* Inventory Date input */}
              <FancyInput
                type={"date"}
                identity={"inventoryDate"}
                placeholder={"Last Updated"}
              />
            </div>
            {/* Inventory Quantity input */}
            <FancyInput
              identity={"inventoryLocation"}
              placeholder={"Quantity"}
            />
            {/* Inventory Notes input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <textarea
                className="w-full outline-none min-h-20 max-h-32"
                type="text"
                placeholder="Notes"
                name="notes"
                // value={formState.notes}
                // onChange={onInputChange}
              />
            </div>
            {/* Inventory Image input */}
            <div className="w-full p-4 hover:border-gray-400 rounded-lg border   flex justify-center items-center border-[#D0D5DD]">
              {imgArray?.length > 0 ? (
                <div className="w-full flex justify-start items-center min-h-20 space-x-2">
                  {imgArray.map((img, index) => (
                    <div key={index} className="relative ">
                      <Image
                        src={
                          typeof img === "string"
                            ? img
                            : URL.createObjectURL(img)
                        }
                        width={80}
                        height={80}
                        alt="img"
                      />
                      <div className="absolute top-[-15px] right-[-15px] cursor-pointer">
                        <Image
                          onClick={() => {
                            setImgArray(
                              imgArray.filter((item) => item !== img)
                            );
                          }}
                          src={XIcon}
                          alt="XIcon"
                        />
                      </div>
                      <div className="absolute top-0 left-0 cursor-pointer">
                        <Image src={EnlargeIcon} alt="EnlargeIcon" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <label
                  className="flex flex-col justify-center items-center cursor-pointer  space-y-2 min-h-20 "
                  htmlFor="dropzone"
                >
                  <Image src={UploadIcon} alt="UploadIcon" />
                  <p className="text-[#01E268]">Upload Part Image</p>{" "}
                  <input
                    onChange={onImageChange}
                    id="dropzone"
                    className="hidden"
                    type="file"
                    multiple
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex w-full p-4  justify-center  gap-4 flex-1 items-end">
          <div className="flex-1">
            <GreenBtn
              onClick={() => dispatch(setShowSideMenu({ value: false }))}
              title={"Go Back"}
              textCenter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySideMenu;
