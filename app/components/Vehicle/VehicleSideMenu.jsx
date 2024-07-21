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
import { updateVehicle } from "../../../lib/features/vehicle/vehicleActions";
import DropDownInput from "../common/DropDownInput";
import ImageDropzone from "../common/ImageDropzone";
const InventorySideMenu = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { locationSearchData } = useSelector((state) => state.locations);
  const { partSearchData } = useSelector((state) => state.parts);
  const { colorToggle } = useSelector((state) => state.settings);

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
  const formData = new FormData();
  const [colorSwitch, setColorSwitch] = React.useState(false);
  const [formState, setFormState] = React.useState({
    name: "",
    sku: "",
    model: [],
    make: [],
    variant: [],
    notes: "",
    color: "",
    startYear: "",
    lastYear: "",
  });
  const [locId, setLocId] = React.useState(null);

  const [partId, setPartId] = React.useState(null);

  // Function to handle input change
  const onInputChange = (e) => {
    // formDataRef.current.set(e.target.name, e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  // Function to handle image change
  const onImageChange = (e) => {
    // formData not set directly becauese files after selecting appearing in box are coming from imgArray
    const files = Array.from(e.target.files);
    setImgArray([...imgArray, ...files]);
  };

  // Function to handle form submit
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);

    if (
      formState.name === "" ||
      !formState.name ||
      formState.name.length <= 0
    ) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Name field",
          red: true,
        })
      );
    } else if (locId === null || locId === "" || !locId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Location field",
          red: true,
        })
      );
    } else if (partId === null || partId === "" || !partId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Part field",
          red: true,
        })
      );
    } else if (formState.sku <= 0 || formState.sku === "" || !formState.sku) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill  the SKU field",
          red: true,
        })
      );
    } else if (formState.model.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Model field",
          red: true,
        })
      );
    } else if (formState.make.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Make field",
          red: true,
        })
      );
    } else if (formState.variant.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Variant field",
          red: true,
        })
      );
    }
    formData.append("name", formState.name);
    formData.append("sku", formState.sku);
    formData.append("location", locId);
    formData.append("part", partId);
    if (formState.model.length === 1) {
      formData.append("model[0]", formState.model[0]);
    } else {
      formState.model.forEach((model, index) => {
        formData.append(`model`, model);
      });
    }

    if (formState.make.length === 1) {
      formData.append("make[0]", formState.make[0]);
    } else {
      formState.make.forEach((make, index) => {
        formData.append(`make`, make);
      });
    }

    if (formState.variant.length === 1) {
      formData.append("variant[0]", formState.variant[0]);
    } else {
      formState.variant.forEach((variant, index) => {
        formData.append(`variant`, variant);
      });
    }

    if (formState.notes.length > 0) {
      formData.append("notes", formState.notes);
    }
    formData.append("startYear", formState.startYear);
    formData.append("lastYear", formState.lastYear);
    if (showSideMenu.mode === "edit") {
      if (imgArray.length > 0) {
        for (let i = 0; i < imgArray.length; i++) {
          if (typeof imgArray[i] !== "string") {
            formData.append(`images`, imgArray[i]);
          } else {
          }
        }
      } else {
        formData.append("images", "");
      }
    }

    if (showSideMenu.mode === "edit") {
      dispatch(updateVehicle({ formData: formData, id: selectedItem._id }));
      setFormState({
        name: "",
        sku: "",
        model: [],
        make: [],
        variant: [],
        notes: "",
        color: "",
        startYear: "",
        lastYear: "",
      });
      setLocId("");
      setPartId("");
      setLocValue(null);
      setPartValue(null);

      dispatch(setShowSideMenu({ value: false }));

      formData.forEach((value, key) => {
        formData.delete(key);
      });
    }
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
        setFormState({
          name: selectedItem.name,
          model: selectedItem.model,
          make: selectedItem.make,
          variant: selectedItem.variant,
          notes: selectedItem.notes ? selectedItem.notes : "",
          startYear: new Date(selectedItem.startYear).getFullYear(),
          lastYear: new Date(selectedItem.lastYear).getFullYear(),
          sku: selectedItem.sku,
        });
        setLocValue(selectedItem.location?.location);
        setPartValue(selectedItem.part?.name);
        setImgArray(selectedItem?.images);
        setLocId(selectedItem.location?._id);
        setPartId(selectedItem.part?._id);
      }
    } else {
      setFormState({
        name: "",
        sku: "",
        model: [],
        make: [],
        variant: [],
        notes: "",
        startYear: "",
        lastYear: "",
        color: "",
      });
      setImgArray(null);
      setLocValue("");
      setPartValue("");
      setLocId(null);
      setPartId(null);
    }
  }, [selectedItem, showSideMenu]);

  const onCloseMenu = () => {
    dispatch(setShowSideMenu({ value: false }));
    setFormState({
      name: "",
      sku: "",
      model: [],
      make: [],
      variant: [],
      notes: "",
      color: "",
      startYear: "",
      lastYear: "",
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
              ? "Edit Vehicle"
              : showSideMenu.mode === "preview"
              ? "Preview Vehicle"
              : "Add Vehicle"}
          </p>
          {/* This additional container to make them opaque in preview mode */}
          <div
            className={`${
              showSideMenu.mode === "preview" &&
              "opacity-50 pointer-events-none"
            }  flex flex-col space-y-4  items-center w-full `}
          >
            {/* Vehicle name input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Vehicle Name"
                name="name"
                value={formState.name}
                onChange={onInputChange}
              />
            </div>
            <div className="flex w-full gap-4">
              {/* Vehicle Location input */}

              <DropDownInput
                inputValue={locValue}
                keyToShow={"location"}
                onSearch={searchLocationByName}
                placeholder={"Location"}
                searchData={locationSearchData}
                setIdFunc={(val) => {
                  setLocId(val);
                }}
                setInputValue={setLocValue}
                key={"location"}
              />
              {/* Inventory Part input */}

              <DropDownInput
                inputValue={partValue}
                keyToShow={"name"}
                onSearch={searchPartByName}
                placeholder={"Part"}
                searchData={partSearchData}
                setIdFunc={(val) => {
                  setPartId(val);
                }}
                setInputValue={setPartValue}
                key={"part"}
              />
            </div>

            {/* Inventory Dates input */}
            <div className="flex w-full space-x-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  onClick={() => setDateType1(true)}
                  className="w-full outline-none"
                  type={dateType1 ? "date" : "text"}
                  placeholder="Start Year"
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
                  placeholder="Last Year"
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
            {colorSwitch && (
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
            <ImageDropzone
              imgArray={imgArray}
              setImgArray={setImgArray}
              onImageChange={onImageChange}
            />
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
