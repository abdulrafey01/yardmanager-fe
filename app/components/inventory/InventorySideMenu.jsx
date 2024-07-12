import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import UploadIcon from "../../assets/main/44-upload.svg";
import {
  setShowSideMenu,
  setShowSuccessModal,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import XIcon from "../../assets/main/45-xclose.svg";

import EnlargeIcon from "../../assets/main/46-enlarge.svg";
import DownArrow from "../../assets/main/28-downarrow.svg";
import React, { useEffect, useRef } from "react";
import {
  addInventory,
  updateInventory,
} from "../../../lib/features/inventory/inventoryActions";
import { searchLocationByName } from "../../../lib/features/locations/locationActions";
import "../../styles.css";
import { searchPartByName } from "../../../lib/features/parts/partActions";
import MultiInput from "../common/MultiInput";
import { getLocalStorage } from "../../helpers/storage";
const InventorySideMenu = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { locationSearchData } = useSelector((state) => state.locations);
  const { partSearchData } = useSelector((state) => state.parts);
  const [imgArray, setImgArray] = React.useState(null);
  const [showLocDropDown, setShowLocDropDown] = React.useState(false);
  const [showPartDropDown, setShowPartDropDown] = React.useState(false);
  // Values for inputs
  const [locValue, setLocValue] = React.useState("");
  const [partValue, setPartValue] = React.useState("");
  const dispatch = useDispatch();
  // for date input change types
  const [dateType1, setDateType1] = React.useState(false);
  const [dateType2, setDateType2] = React.useState(false);

  // useref is used to prevent adding new key on every character change
  const formDataRef = useRef(new FormData());
  const [formState, setFormState] = React.useState({
    name: "",
    sku: "",
    year: "",
    model: [],
    make: [],
    variant: [],
    notes: "",
    color: "",
    startYear: "",
    lastYear: "",
    price: "",
  });

  // Price Toggle for inventory
  const [priceToggle, setPriceToggle] = React.useState(
    JSON.parse(getLocalStorage("priceToggle")) || false
  );

  // Color toggle for inventory
  const [colorToggle, setColorToggle] = React.useState(
    JSON.parse(getLocalStorage("colorToggle")) || false
  );
  // Function to handle input change
  const onInputChange = (e) => {
    // formDataRef.current.set(e.target.name, e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLocInputChange = (e) => {
    setLocValue(e.target.value);
    if (e.target.value.length >= 3) {
      setShowLocDropDown(true);
      dispatch(searchLocationByName(e.target.value));
    } else {
      setShowLocDropDown(false);
    }
  };

  const onLocNameClick = (loc) => {
    formDataRef.current.set("location", loc._id);
    setLocValue(loc.location);
    setShowLocDropDown(false);
  };

  const onPartNameClick = (part) => {
    formDataRef.current.set("part", part._id);
    setPartValue(part.name);
    setShowPartDropDown(false);
  };

  const onPartInputChange = (e) => {
    setPartValue(e.target.value);
    if (e.target.value.length >= 3) {
      setShowPartDropDown(true);
      dispatch(searchPartByName(e.target.value));
    } else {
      setShowPartDropDown(false);
    }
  };
  // Function to handle image change
  const onImageChange = (e) => {
    // formData not set directly becauese files after selecting appearing in box are coming from imgArray
    const files = Array.from(e.target.files);
    setImgArray(files);
    for (let i = 0; i < files.length; i++) {
      formDataRef.current.append("images", files[i]);
    }
  };

  // Function to handle form submit
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (formState.name === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill all the fields",
          red: true,
        })
      );
    }
    formDataRef.current.set("name", formState.name);
    formDataRef.current.set("sku", formState.sku);
    formDataRef.current.set("year", formState.year);
    formDataRef.current.set("model", formState.model);
    formDataRef.current.set("make", formState.make);
    formDataRef.current.set("variant", formState.variant);
    formDataRef.current.set("notes", formState.notes);
    formDataRef.current.set("startYear", formState.startYear);
    formDataRef.current.set("lastYear", formState.lastYear);
    if (priceToggle) {
      formDataRef.current.set("price", formState.price);
    }
    if (colorToggle) {
      formDataRef.current.set("color", formState.color);
    } else {
      formDataRef.current.delete("color");
    }

    if (showSideMenu.mode === "edit") {
      dispatch(
        updateInventory({ formData: formDataRef.current, id: selectedItem._id })
      );
    } else {
      dispatch(addInventory(formDataRef.current));
    }
    dispatch(setShowSideMenu({ value: false }));
  };

  const removeModelFromList = (index) => {
    setFormState({
      ...formState,
      model: formState.model.filter((_, i) => i !== index),
    });
    // console.log(index);
  };
  const removeMakeFromList = (index) => {
    setFormState({
      ...formState,
      make: formState.make.filter((_, i) => i !== index),
    });
    // console.log(index);
  };
  const removeVariantFromList = (index) => {
    setFormState({
      ...formState,
      variant: formState.variant.filter((_, i) => i !== index),
    });
    // console.log(index);
  };

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        console.log(selectedItem);
        setFormState(selectedItem);
        setLocValue(selectedItem.location.location);
        setPartValue(selectedItem.part.name);
        setImgArray(selectedItem.images);
      }
    } else {
      setFormState({
        name: "",
        sku: "",
        year: "",
        model: [],
        make: [],
        variant: [],
        notes: "",
        startYear: "",
        lastYear: "",
        price: "",
        color: "",
      });
      setImgArray(null);
      setLocValue("");
      setPartValue("");
    }
  }, [selectedItem, showSideMenu]);

  const onCloseMenu = () => {
    dispatch(setShowSideMenu({ value: false }));
    setFormState({
      name: "",
      sku: "",
      year: "",
      model: [],
      make: [],
      variant: [],
      notes: "",
      color: "",
      startYear: "",
      lastYear: "",
      price: "",
    });
    setImgArray(null);
    setLocValue("");
    setPartValue("");
    setDateType1(false);
    setDateType2(false);
  };
  return (
    <div
      className={`fixed flex w-full ${
        showSideMenu.value ? "flex" : "hidden"
      }   h-full  z-20 overflow-y-clip `}
    >
      {/* Black part */}
      <div
        onClick={onCloseMenu}
        className="flex-1  lg:flex-[2] hidden sm:block h-full bg-black opacity-50"
      ></div>

      {/* Main container */}
      <div className="flex-1 bg-white  overflow-y-auto  no-scrollbar flex flex-col justify-start items-start ">
        <div className="p-6 flex w-full flex-col space-y-4">
          <p className="font-semibold">
            {showSideMenu.mode === "edit"
              ? "Edit Inventory"
              : "Add New Inventory"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Inventory name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Inventory Name"
                name="name"
                value={formState.name}
                onChange={onInputChange}
              />
            </div>
            <div className="flex w-full gap-4">
              {/* Inventory Location input */}
              <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  value={locValue}
                  placeholder="Location"
                  name="location"
                  onChange={onLocInputChange}
                  autoComplete="off"
                />
                <Image src={DownArrow} alt="downarrow" />
                {/* Dropdown */}
                <div
                  className={`${
                    locationSearchData.length > 0 && showLocDropDown
                      ? "block"
                      : "hidden"
                  } bg-white overflow-auto no-scrollbar absolute top-[110%] w-full left-0  rounded-lg border border-black p-3 flex flex-col justify-start max-h-40`}
                >
                  {locationSearchData.map((loc) => {
                    return (
                      <p
                        onClick={() => onLocNameClick(loc)}
                        className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                      >
                        {loc.location}
                      </p>
                    );
                  })}
                </div>
              </div>
              {/* Inventory Part input */}
              <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  value={partValue}
                  placeholder="Part"
                  name="location"
                  onChange={onPartInputChange}
                  autoComplete="off"
                />
                <Image src={DownArrow} alt="downarrow" />
                {/* Dropdown */}
                <div
                  className={`${
                    partSearchData.length > 0 && showPartDropDown
                      ? "block"
                      : "hidden"
                  } bg-white overflow-auto no-scrollbar absolute top-[110%] w-full left-0  rounded-lg border border-black p-3 flex flex-col justify-start max-h-40`}
                >
                  {partSearchData.map((part) => {
                    return (
                      <p
                        onClick={() => onPartNameClick(part)}
                        className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg"
                      >
                        {part.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Inventory Dates input */}
            <div className="flex w-full space-x-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  onClick={() => setDateType1(true)}
                  className="w-full outline-none"
                  type={dateType1 ? "date" : "text"}
                  placeholder="Start Date"
                  value={formState.startYear}
                  name="startYear"
                  onChange={onInputChange}
                />
              </div>
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  onClick={() => setDateType2(true)}
                  className="w-full outline-none"
                  type={dateType2 ? "date" : "text"}
                  placeholder="End Date"
                  value={formState.lastYear}
                  name="lastYear"
                  onChange={onInputChange}
                />
              </div>
            </div>
            {/* Inventory Model input */}
            <MultiInput
              dataToMap={formState.model}
              placeholder="Model"
              name="model"
              onPressEnter={(e) => {
                if (e.target.value.length < 3) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Model should be at least 3 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    model: [...formState.model, e.target.value],
                  });
                }
              }}
              removeItemFunction={removeModelFromList}
            />
            {/* Inventory Make input */}
            <MultiInput
              dataToMap={formState.make}
              placeholder="Make"
              name="make"
              onPressEnter={(e) => {
                if (e.target.value.length < 3) {
                  dispatch(
                    dispatch(
                      setShowToast({
                        value: true,
                        msg: "Make should be at least 3 characters",
                        red: true,
                      })
                    )
                  );
                } else {
                  setFormState({
                    ...formState,
                    make: [...formState.make, e.target.value],
                  });
                }
              }}
              removeItemFunction={removeMakeFromList}
            />
            {/* Inventory Variant input */}
            <MultiInput
              dataToMap={formState.variant}
              placeholder="Variant"
              name="variant"
              onPressEnter={(e) => {
                if (e.target.value.length < 3) {
                  dispatch(
                    dispatch(
                      setShowToast({
                        value: true,
                        msg: "Variant should be at least 3 characters",
                        red: true,
                      })
                    )
                  );
                } else {
                  setFormState({
                    ...formState,
                    variant: [...formState.variant, e.target.value],
                  });
                }
              }}
              removeItemFunction={removeVariantFromList}
            />
            {/* Color input based on toggle */}
            {colorToggle && (
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Color"
                  name="color"
                  value={formState.color}
                  onChange={onInputChange}
                />
              </div>
            )}
            <div className="flex w-full gap-4">
              {/* Inventory Price input */}
              {priceToggle && (
                <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                  <input
                    className="w-full outline-none"
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formState.price}
                    onChange={onInputChange}
                  />
                </div>
              )}
              {/* Inventory SKU input */}
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="number"
                  placeholder="SKU"
                  name="sku"
                  value={formState.sku}
                  onChange={onInputChange}
                />
              </div>
            </div>
            {/* Inventory Notes input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <textarea
                className="w-full outline-none min-h-20 max-h-32"
                type="text"
                placeholder="Notes"
                name="notes"
                value={formState.notes}
                onChange={onInputChange}
              />
            </div>
            {/* Inventory Image input */}
            <div className="w-full p-4 hover:border-gray-400 rounded-lg border   flex justify-center items-center border-[#D0D5DD]">
              {imgArray?.length > 0 ? (
                <div className="w-full flex justify-start items-center min-h-20 space-x-2">
                  {imgArray.map((img, index) => (
                    <div className="relative ">
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

        <div className="flex flex-1 place-items-end p-6  w-full justify-center space-x-4 ">
          <div
            onClick={onCloseMenu}
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
            {showSideMenu.mode === "edit" ? "Edit Inventory" : "Add Inventory"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySideMenu;
