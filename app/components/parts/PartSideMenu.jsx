import { useDispatch, useSelector } from "react-redux";
import {
  setShowSideMenu,
  setShowSuccessModal,
} from "../../../lib/features/shared/sharedSlice";
import { useEffect, useState } from "react";
import { addPart, updatePart } from "../../../lib/features/parts/partActions";
import CrossIcon from "../../assets/main/64-cross.svg";
import Image from "next/image";
import GreenToggle from "../common/GreenToggle";
const PartSideMenu = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const [formData, setFormData] = useState({
    name: "",
    variant: [],
    color: false,
  });

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        setFormData({
          name: selectedItem.name,
          variant: selectedItem.variant,
          color: selectedItem.color,
        });
      }
    } else {
      setFormData({ name: "", variant: [] });
    }
  }, [selectedItem, showSideMenu]);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (showSideMenu.mode === "edit") {
      dispatch(updatePart({ formData, id: selectedItem._id }));
    } else {
      dispatch(addPart(formData));
    }
    dispatch(setShowSideMenu({ value: false }));
  };

  const removeVariantFromList = (index) => {
    setFormData({
      ...formData,
      variant: formData.variant.filter((_, i) => i !== index),
    });
    console.log(index);
  };
  const dispatch = useDispatch();
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
      <div
        // ref={menuRef}
        className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start "
      >
        <div className="p-6 flex w-full flex-col space-y-4">
          <p className="font-semibold">
            {showSideMenu.mode === "edit" ? "Edit Part" : "Add New Part"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Part name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Part Name"
                name="name"
                onChange={onInputChange}
                value={formData.name}
              />
            </div>
            {/* Part Variant input */}
            <div className="w-full flex flex-wrap gap-2 gap-y-4 p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              {formData.variant.map((variant, index) => (
                <div
                  key={index}
                  className={`bg-[#1212121A]  rounded-full min-w-20 py-3 h-4 flex justify-center items-center gap-2 text-sm `}
                >
                  {variant}
                  <Image
                    onClick={() => removeVariantFromList(index)}
                    className="cursor-pointer"
                    src={CrossIcon}
                    alt="cross"
                  />
                </div>
              ))}
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Variant"
                name="variant"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFormData({
                      ...formData,
                      variant: [...formData.variant, e.target.value],
                    });
                    e.target.value = "";
                  }
                }}
              />
            </div>
            {/* Color toggle */}
            <div className="w-full flex justify-between items-center">
              {/* Text container */}
              <div>
                <p className="text-lg font-bold">Color</p>
                <p className="text-[#6E7793] text-sm">
                  Require color when adding these parts in inventory{" "}
                </p>
              </div>
              {/* Toggle container */}
              <GreenToggle
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.checked })
                }
                checked={Boolean(formData.color)}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
          <div
            onClick={() => {
              dispatch(setShowSideMenu({ value: false, mode: "add" }));
            }}
            className="flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-white border border-gray-300 font-semibold cursor-pointer select-none hover:bg-gray-200"
          >
            Cancel
          </div>
          <div
            onClick={onFormSubmit}
            className={`flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none ${
              showSideMenu.mode === "preview" && "hidden"
            }`}
          >
            {showSideMenu.mode === "edit" ? "Edit Part" : "Add Part"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartSideMenu;
