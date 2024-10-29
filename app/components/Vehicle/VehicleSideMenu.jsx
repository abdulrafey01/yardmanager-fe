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
import {
  fetchAllLocations,
  searchLocationByName,
} from "../../../lib/features/locations/locationActions";
import "../../styles.css";
import {
  fetchAllParts,
  searchPartByName,
} from "../../../lib/features/parts/partActions";
import MultiInput from "../common/MultiInput";
import { updateVehicle } from "../../../lib/features/vehicle/vehicleActions";
import DropDownInput from "../common/DropDownInput";
import ImageDropzone from "../common/ImageDropzone";
import { resetLocationSearchData } from "../../../lib/features/locations/locationSlice";
import { resetPartSearchData } from "../../../lib/features/parts/partSlice";
import {
  variantList,
  makeList,
  modelList,
  colorList,
} from "../../constants/index";
const InventorySideMenu = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { locationSearchData } = useSelector((state) => state.locations);
  const { partSearchData } = useSelector((state) => state.parts);

  const { toastMsg } = useSelector((state) => state.vehicle);
  const { user } = useSelector((state) => state.auth);

  const [priceToggle, setPriceToggle] = React.useState(false);
  const [imageToggle, setImageToggle] = React.useState(false);
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
  const [formState, setFormState] = React.useState({
    name: "",
    model: [],
    make: [],
    variant: [],
    notes: "",
    color: [],
    price: "",
    startYear: "",
    lastYear: "",
  });
  const [locId, setLocId] = React.useState(null);
  const [colorToggle, setColorToggle] = React.useState(false);
  const [variantData, setVariantData] = React.useState([]);

  const [partId, setPartId] = React.useState(null);

  // To check during form submit
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // console.log('price', user)
    setPriceToggle(user?.company?.price ?? false)
    setImageToggle(user?.company?.image ?? false)
  }, [user])
  
  const yearsArray = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
    (1950 + i).toString()
  );
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
    // console.log(formState);

    if (partId === null || partId === "" || !partId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please Select Name from List",
          red: true,
        })
      );
    } else if (locId === null || locId === "" || !locId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please Select Location from List",
          red: true,
        })
      );
    } else if (formState.startYear === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill in Valid Start Year ",
          red: true,
        })
      );
    } else if (formState.lastYear === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill in Valid Last Year",
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
    } 
    // else if (formState.variant.length === 0) {
    //   return dispatch(
    //     setShowToast({
    //       value: true,
    //       msg: "Please fill the Variant field",
    //       red: true,
    //     })
    //   );
    // }
    if (priceToggle === true) {
      // if (formState.price === "" || formState.price <= 0) {
      //   return dispatch(
      //     setShowToast({
      //       value: true,
      //       msg: "Please fill the Price field",
      //       red: true,
      //     })
      //   );
      // }
    }
    if (colorToggle === true) {
      // console.log("color", formState.color);
      // if (
      //   formState.color === "" ||
      //   formState.color === null ||
      //   formState.color === "undefined" ||
      //   formState.color.length === 0
      // ) {
      //   return dispatch(
      //     setShowToast({
      //       value: true,
      //       msg: "Please fill the Color field",
      //       red: true,
      //     })
      //   );
      // }
    }
    if (Number(formState.lastYear) < Number(formState.startYear)) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Start Year cannot be greater than Last Year",
          red: true,
        })
      );
    }
    formData.append("name", formState.name);
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
            formData.append(`newImage`, imgArray[i]);
          } else {
            formData.append(`images`, imgArray[i]);
          }
        }
      } else {
        // formData.append("images", []);
      }
    }

    if (colorToggle) {
      if (formState.color.length === 1) {
        formData.append("color", formState.color[0]);
      } else {
        formState.color.forEach((color, index) => {
          formData.append(`color`, color);
        });
      }
    } else {
      formData.append("color", []);
    }

    if (priceToggle) {
      formData.append("price", formState.price);
    }

    if (showSideMenu.mode === "edit") {
      dispatch(
        updateVehicle({
          formData: formData,
          id: selectedItem._id,
          isAdmin: user?.userType === "admin",
        })
      );
    }
  };

  useEffect(() => {
    if (toastMsg?.red === false) {
      setFormState({
        name: "",
        model: [],
        make: [],
        variant: [],
        notes: "",
        price: "",
        color: [],
        startYear: "",
        lastYear: "",
      });
      setLocId("");
      setPartId("");
      setLocValue(null);
      setPartValue(null);
      setDateType1(false);
      setDateType2(false);
      dispatch(resetLocationSearchData());
      dispatch(resetPartSearchData());
      dispatch(setShowSideMenu({ value: false }));

      formData.forEach((value, key) => {
        formData.delete(key);
      });
    }
  }, [toastMsg]);

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

  const removeColorFromList = (index) => {
    setFormState({
      ...formState,
      color: formState.color.filter((_, i) => i !== index),
    });
    // console.log(index);
  };

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        // console.log(selectedItem);
        setFormState({
          name: selectedItem.name,
          model: selectedItem.model,
          make: selectedItem.make,
          color: selectedItem.color,
          variant: selectedItem.variant,
          price: selectedItem.price > 0 ? selectedItem.price : "",
          notes: selectedItem.notes ? selectedItem.notes : "",
          startYear: new Date(selectedItem.startYear).getFullYear(),
          lastYear: new Date(selectedItem.lastYear).getFullYear(),
        });
        setLocValue(selectedItem.location?.location);
        setPartValue(selectedItem.part?.name);
        setVariantData(selectedItem?.part?.variant);

        setImgArray(selectedItem?.images);
        setLocId(selectedItem.location?._id);
        setPartId(selectedItem.part?._id);
        if (selectedItem?.part?.color) {
          setColorToggle(true);
        } else {
          setColorToggle(false);
        }
        // console.log("color toggle", selectedItem);
      }
    } else {
      setFormState({
        name: "",
        model: [],
        make: [],
        variant: [],
        notes: "",
        price: "",
        startYear: "",
        lastYear: "",
        color: [],
      });
      setImgArray(null);
      setLocValue("");
      setPartValue("");
      setLocId(null);
      setPartId(null);
      dispatch(resetLocationSearchData());
      dispatch(resetPartSearchData());
    }
  }, [selectedItem, showSideMenu]);

  const onCloseMenu = () => {
    dispatch(setShowSideMenu({ value: false }));
    dispatch(resetLocationSearchData());
    dispatch(resetPartSearchData());
    setFormState({
      name: "",
      model: [],
      make: [],
      variant: [],
      notes: "",
      price: "",
      color: [],
      startYear: "",
      lastYear: "",
    });
    setImgArray(null);
    setLocValue("");
    setPartValue("");
    setVariantData([]);
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
            <DropDownInput
              inputValue={partValue}
              keyToShow={"name"}
              onSearch={searchPartByName}
              fetchAllFunc={fetchAllParts}
              placeholder={"Name"}
              searchData={partSearchData}
              setIdFunc={(val) => {
                setPartId(val);
                setFormState({ ...formState, variant: [] });
              }}
              setColorToggle={setColorToggle}
              setVariantData={setVariantData}
              setInputValue={setPartValue}
              key={"part"}
            />
            <div className="flex w-full gap-4">
              {/* Vehicle Location input */}

              <DropDownInput
                inputValue={locValue}
                keyToShow={"location"}
                onSearch={searchLocationByName}
                fetchAllFunc={fetchAllLocations}
                placeholder={"Location"}
                searchData={locationSearchData}
                setIdFunc={(val) => {
                  setLocId(val);
                }}
                setInputValue={setLocValue}
                key={"location"}
              />
              {/* Inventory Part input */}
            </div>

            {/* Inventory Dates input */}
            <div className="flex w-full space-x-4">
              <DropDownInput
                inputValue={formState.startYear}
                setInputValue={(val) => {
                  setFormState({ ...formState, startYear: val });
                }}
                typeDate={true}
                placeholder={"Start Year"}
              />
              <DropDownInput
                inputValue={formState.lastYear}
                setInputValue={(val) => {
                  setFormState({ ...formState, lastYear: val });
                }}
                typeDate={true}
                placeholder={"Last Year"}
              />
            </div>

            {/* Inventory Make input */}
            <MultiInput
              dataToMap={formState.make}
              placeholder="Make"
              name="variant"
              dataList={makeList.filter((item) => {
                if (!formState.make.includes(item)) {
                  return item;
                } else {
                  return null;
                }
              })}
              onPressEnter={(e) => {
                if (e.length < 1) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Make should be at least 1 character",
                      red: true,
                    })
                  );
                } else if (e.length > 25) {
                  return dispatch(
                    setShowToast({
                      value: true,
                      msg: "Make must be less than 25 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    make: [...formState.make, e],
                  });
                }
              }}
              removeItemFunction={removeMakeFromList}
            />
            {/* Inventory Model input */}
            <MultiInput
              dataToMap={formState.model}
              placeholder="Model"
              name="variant"
              dataList={modelList.filter((item) => {
                if (!formState.model.includes(item)) {
                  return item;
                } else {
                  return null;
                }
              })}
              onPressEnter={(e) => {
                if (e.length < 1) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Model should be at least 1 character",
                      red: true,
                    })
                  );
                } else if (e.length > 25) {
                  return dispatch(
                    setShowToast({
                      value: true,
                      msg: "Model must be less than 25 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    model: [...formState.model, e],
                  });
                }
              }}
              removeItemFunction={removeModelFromList}
            />
            {/* Inventory Variant input */}
            <MultiInput
              dataToMap={formState.variant}
              placeholder="Variant"
              name="variant"
              stopOnChange={true}
              dataList={variantData.filter((item) => {
                if (!formState.variant.includes(item)) {
                  return item;
                } else {
                  return null;
                }
              })}
              onPressEnter={(e) => {
                if (e.length < 1) {
                  dispatch(
                    setShowToast({
                      value: true,
                      msg: "Variant should be at least 1 character",
                      red: true,
                    })
                  );
                } else if (e.length > 25) {
                  return dispatch(
                    setShowToast({
                      value: true,
                      msg: "Variant must be less than 25 characters",
                      red: true,
                    })
                  );
                } else {
                  setFormState({
                    ...formState,
                    variant: [...formState.variant, e],
                  });
                }
              }}
              removeItemFunction={removeVariantFromList}
            />
            {/* Color input based on toggle */}
            {/* {console.log('toggle ', colorToggle, formState.color)} */}
            {colorToggle && (
              <MultiInput
                dataToMap={formState.color}
                placeholder="Color"
                dataList={colorList.filter((item) => {
                  if (!formState.color.includes(item)) {
                    return item;
                  } else {
                    return null;
                  }
                })}
                name="variant"
                onPressEnter={(e) => {
                  if (e.length < 1) {
                    dispatch(
                      setShowToast({
                        value: true,
                        msg: "Color should be at least 1 character",
                        red: true,
                      })
                    );
                  } else if (e.length > 25) {
                    return dispatch(
                      setShowToast({
                        value: true,
                        msg: "Color must be less than 25 characters",
                        red: true,
                      })
                    );
                  } else {
                    setFormState({
                      ...formState,
                      color: [...(formState.color ? formState.color : []), e],
                    });
                  }
                }}
                removeItemFunction={removeColorFromList}
              />
            )}
            {priceToggle || showSideMenu.mode === "preview" ? (
                <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                  <input
                    className="w-full outline-none"
                    type="number"
                    placeholder="Price"
                    name="price"
                    min={0}
                    value={formState.price}
                    onChange={onInputChange}
                  />
                </div>
              ) : null}
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
          </div>
          {/* Inventory Image input */}
          {/* <ImageDropzone
            previewMode={showSideMenu.mode === "preview"}
            imgArray={imgArray}
            setImgArray={setImgArray}
            onImageChange={onImageChange}
            placeholder="Upload Vehicle Image"
          /> */}
          {imageToggle || showSideMenu.mode === "preview" ? (
            <ImageDropzone
              previewMode={showSideMenu.mode === "preview"}
              imgArray={imgArray}
              setImgArray={setImgArray}
              onImageChange={onImageChange}
            />
          ) : null}
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
            {showSideMenu.mode === "edit" ? "Edit Part" : "Add Vehicle"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySideMenu;
