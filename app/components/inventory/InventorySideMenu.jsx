import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import UploadIcon from "../../assets/main/44-upload.svg";
import {
  setPrevImage,
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
import DropDownInput from "../common/DropDownInput";
import { getCookie, getLocalStorage } from "../../helpers/storage";
import PlusIcon from "../../assets/main/82-plus.svg";
import ImageDropzone from "../common/ImageDropzone";
import useLoadAuthState from "../../helpers/authHook";
import { usePathname } from "next/navigation";
import { resetLocationSearchData } from "../../../lib/features/locations/locationSlice";
import { resetPartSearchData } from "../../../lib/features/parts/partSlice";
import InventoryModal from "./InventoryModal";
import carData from "../../constants/car_data.json";

import {
  variantList,
  makeList,
  modelList,
  colorList,
} from "../../constants/index";
import axios from "axios";

const InventorySideMenu = () => {
  // useLoadAuthState(); // for updating image and price fields
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { locationSearchData } = useSelector((state) => state.locations);
  const { partSearchData } = useSelector((state) => state.parts);
  const { toastMsg } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.auth);
  const [imgArray, setImgArray] = React.useState([]);
  const [showLocDropDown, setShowLocDropDown] = React.useState(false);
  const [showPartDropDown, setShowPartDropDown] = React.useState(false);
  const [locId, setLocId] = React.useState(null);
  const [partId, setPartId] = React.useState(null);
  // Values for inputs
  const [locValue, setLocValue] = React.useState("");
  const [partValue, setPartValue] = React.useState("");
  const dispatch = useDispatch();
  // for date input change types
  const [dateType1, setDateType1] = React.useState(false);
  const [dateType2, setDateType2] = React.useState(false);

  // useref is used to prevent adding new key on every character change
  // const formDataRef = useRef(new FormData());
  const formData = new FormData();
  const [formState, setFormState] = React.useState({
    name: "",
    sku: "",
    year: "",
    model: [],
    make: [],
    variant: [],
    notes: "",
    color: [],
    startYear: "",
    lastYear: "",
    price: "",
  });

  // Price Toggle for inventory
  const [priceToggle, setPriceToggle] = React.useState(false);

  // Color toggle for inventory
  const [colorToggle, setColorToggle] = React.useState(false);

  // Image toggle for inventory
  const [imageToggle, setImageToggle] = React.useState(false);

  const [variantData, setVariantData] = React.useState([]);

  // To check during form submit
  const currentYear = new Date().getFullYear();

  const yearsArray = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
    (1950 + i).toString()
  );
  const pathName = usePathname();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://yardmanager-be.vercel.app/api/users/info",
          {
            headers: {
              Authorization: `Bearer ${
                getCookie("token") || window?.sessionStorage.getItem("token")
              }`,
            },
          }
        );

        setImageToggle(response.data?.data?.company?.image);
        setPriceToggle(response.data?.data?.company?.price);
      } catch (error) {
        // console.log("Error fetching user info in settings:", error);
      }
    };
    if (user?.userType === "admin") {
      setImageToggle(true);
      setPriceToggle(true);
      return;
    } else {
      fetchUserInfo();
    }
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     if (user.userType === "admin") {
  //       setImageToggle(true);
  //       setPriceToggle(true);
  //       return;
  //     }
  //   }
  // }, [user]);

  // Function to handle input change
  const onInputChange = (e) => {
    // formDataRef.current.set(e.target.name, e.target.value);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onLocInputChange = (e) => {
    setLocValue(e.target.value);
    if (e.target.value.length >= 1) {
      setShowLocDropDown(true);
      dispatch(
        searchLocationByName({
          val: e.target.value,
          isAdmin: user?.userType === "admin",
          totalOverview:
            pathName === "/admin/inventory-overview"
              ? {
                  value: true,
                  id: selectedItem.company,
                }
              : false,
        })
      );
    } else {
      dispatch(
        fetchAllLocations({
          isAdmin: user?.userType === "admin",
          totalOverview:
            pathName === "/admin/inventory-overview"
              ? {
                  value: true,
                  id: selectedItem.company,
                }
              : false,
        })
      );
    }
  };

  const onLocNameClick = (loc) => {
    setLocId(loc._id);
    setLocValue(loc.location);
    setShowLocDropDown(false);
  };

  const onPartNameClick = (part) => {
    // formDataRef.current.set("part", part._id);
    // formData.set("part", part._id);
    setPartId(part._id);
    setFormState({ ...formState, variant: [] });
    setPartValue(part.name);
    setColorToggle(part.color);
    setVariantData(part.variant);
    setShowPartDropDown(false);
  };

  const onPartInputChange = (e) => {
    setPartValue(e.target.value);
    setVariantData([]);
    if (e.target.value.length >= 1) {
      setShowPartDropDown(true);
      dispatch(
        searchPartByName({
          val: e.target.value,
          isAdmin: user?.userType === "admin",
          totalOverview:
            pathName === "/admin/inventory-overview"
              ? {
                  value: true,
                  id: selectedItem.company,
                }
              : false,
        })
      );
    } else {
      fetchAllParts({
        isAdmin: user?.userType === "admin",
        totalOverview:
          pathName === "/admin/inventory-overview"
            ? {
                value: true,
                id: selectedItem.company,
              }
            : false,
      });
    }
  };
  // Function to handle image change
  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImgArray([...imgArray, ...files]);
  };

  function getDate(date) {
    return new Date(date);
  }
  // Function to handle form submit
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (partId === null || partId === "" || !partId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please select the Name field",
          red: true,
        })
      );
    } else if (locValue === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the Location field",
          red: true,
        })
      );
    } else if (locId === null || locId === "" || !locId) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please select the Location field",
          red: true,
        })
      );
    } else if (
      formState.startYear === "" ||
      !yearsArray.includes(formState.startYear)
    ) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill in Valid Start Year",
          red: true,
        })
      );
    } else if (
      formState.lastYear === "" ||
      !yearsArray.includes(formState.lastYear)
    ) {
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
          msg: "Please fill the model field",
          red: true,
        })
      );
    } else if (formState.make.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please fill the make field",
          red: true,
        })
      );
    }
    // else if (formState.variant.length === 0) {
    //   return dispatch(
    //     setShowToast({
    //       value: true,
    //       msg: "Please fill the variant field",
    //       red: true,
    //     })
    //   );
    // }
    // if (priceToggle === true) {
    //   if (formState.price === "" || formState.price <= 0) {
    //     return dispatch(
    //       setShowToast({
    //         value: true,
    //         msg: "Please fill the Price field",
    //         red: true,
    //       })
    //     );
    //   }
    // }
    // if (colorToggle === true) {
    //   if (
    //     formState.color === "" ||
    //     formState.color === null ||
    //     formState.color === "undefined" ||
    //     formState.color.length === 0
    //   ) {
    //     return dispatch(
    //       setShowToast({
    //         value: true,
    //         msg: "Please fill the Color field",
    //         red: true,
    //       })
    //     );
    //   }
    // }
    // if (imageToggle === true) {
    //   if (imgArray.length === 0) {
    //     return dispatch(
    //       setShowToast({
    //         value: true,
    //         msg: "Please select at least one Image",
    //         red: true,
    //       })
    //     );
    //   }
    // }
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
    formData.append("year", formState.year);
    if (formState.model.length === 1) {
      formData.append("model", formState.model[0]);
    } else {
      formState.model.forEach((model, index) => {
        formData.append(`model`, model);
      });
    }

    if (formState.make.length === 1) {
      formData.append("make", formState.make[0]);
    } else {
      formState.make.forEach((make, index) => {
        formData.append(`make`, make);
      });
    }

    if (formState.variant.length === 1) {
      formData.append("variant", formState.variant[0]);
    } else {
      formState.variant.forEach((variant, index) => {
        formData.append(`variant`, variant);
      });
    }

    // In edit mode:
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
    } else {
      // in add mode
      if (imgArray.length > 0) {
        // console.log("here 1");
        for (let i = 0; i < imgArray.length; i++) {
          // formDataRef.current.set("images", files[i]);
          formData.append(`images`, imgArray[i]);
        }
      } else {
        // console.log("here 2");

        formData.delete("images");
      }
    }
    formData.append("notes", formState.notes);
    // // console.log(
    //   "startYear",
    //   getDate(formState.startYear),
    //   "lastYear",
    //   getDate(formState.lastYear)
    // );
    formData.append("startYear", formState.startYear);

    formData.append("lastYear", formState.lastYear);

    formData.append("part", `${partId}`); // partId);
    formData.append("location", `${locId}`);
    if (priceToggle) {
      formData.append("price", formState.price);
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
    if (showSideMenu.mode === "edit") {
      if (user?.userType === "admin") {
        dispatch(
          updateInventory({
            formData: formData,
            id: selectedItem._id,
            isAdmin: true,
            totalOverview:
              pathName === "/admin/inventory-overview"
                ? {
                    value: true,
                    id: selectedItem.company[0]._id,
                  }
                : false,
          })
        );
      } else {
        dispatch(updateInventory({ formData: formData, id: selectedItem._id }));
      }
    } else {
      if (user?.userType === "admin") {
        dispatch(addInventory({ data: formData, isAdmin: true }));
      } else {
        dispatch(addInventory({ data: formData }));
      }
    }
  };

  // Close the form if no error
  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(resetLocationSearchData());
      dispatch(resetPartSearchData());
      dispatch(setShowSideMenu({ value: false }));

      setDateType1(false);
      setDateType2(false);
    }
  }, [toastMsg]);

  const removeModelFromList = (index) => {
    setFormState({
      ...formState,
      model: formState.model.filter((_, i) => i !== index),
    });
    // // console.log(index);
  };
  const removeMakeFromList = (index) => {
    setFormState({
      ...formState,
      make: formState.make.filter((_, i) => i !== index),
    });
    // // console.log(index);
  };
  const removeVariantFromList = (index) => {
    setFormState({
      ...formState,
      variant: formState.variant.filter((_, i) => i !== index),
    });
    // // console.log(index);
  };

  const removeColorFromList = (index) => {
    setFormState({
      ...formState,
      color: formState.color.filter((_, i) => i !== index),
    });
    // // console.log(index);
  };

  // When in edit mode  Update formData when selectedItem selected otherwise empty
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        // console.log(selectedItem);
        setFormState({
          ...selectedItem,
          startYear: selectedItem.startYear,
          lastYear: selectedItem.lastYear,
        });
        setLocValue(selectedItem.location?.location);
        setPartValue(selectedItem?.part?.name);
        setVariantData(selectedItem?.part?.variant);
        setImgArray(selectedItem?.images);
        setLocId(selectedItem.location?._id);
        setPartId(selectedItem?.part?._id);
        if (selectedItem?.color) {
          setColorToggle(true);
        } else {
          setColorToggle(false);
        }
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
        color: [],
      });
      setImgArray([]);
      setLocValue("");
      setColorToggle(false);
      setDateType1(false);
      setDateType2(false);
      setPartValue("");
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
      sku: "",
      year: "",
      model: [],
      make: [],
      variant: [],
      notes: "",
      color: [],
      startYear: "",
      lastYear: "",
      price: "",
    });
    setImgArray([]);
    setVariantData([]);
    setLocValue("");
    setPartValue("");
    setDateType1(false);
    setDateType2(false);
  };
  return (
    <>
      <div
        className={`fixed flex w-full ${
          showSideMenu.value && showSideMenu.mode !== "preview"
            ? "flex"
            : "hidden"
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
            <div className={`flex flex-col space-y-4  items-center w-full `}>
              {/* Inventory name input */}
              {/* <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Inventory Name"
                name="name"
                value={formState.name}
                onChange={onInputChange}
              />
            </div> */}
              {/* Inventory Part input */}
              <div className="w-full relative p-3 flex justify-between items-center hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  value={partValue}
                  placeholder="Name"
                  name="location"
                  onChange={onPartInputChange}
                  autoComplete="off"
                  onFocus={() => {
                    setShowPartDropDown(true);
                    dispatch(
                      fetchAllParts({
                        isAdmin: user?.userType === "admin",
                        totalOverview:
                          pathName === "/admin/inventory-overview"
                            ? {
                                value: true,
                                id: selectedItem.company,
                              }
                            : false,
                      })
                    );
                  }}
                  onBlur={() =>
                    setTimeout(() => {
                      setShowPartDropDown(false);
                    }, 300)
                  }
                />
                <Image src={DownArrow} alt="downarrow" />
                {/* Dropdown */}
                <div
                  className={`${
                    showPartDropDown ? "block" : "hidden"
                  } bg-white overflow-auto  z-50 absolute top-[110%] w-full left-0  rounded-lg border shadow-md p-3 flex flex-col justify-start max-h-40`}
                >
                  {partSearchData.length === 0 && (
                    <p className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg">
                      No results
                    </p>
                  )}
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
                    onFocus={() => {
                      setShowLocDropDown(true);
                      dispatch(
                        fetchAllLocations({
                          isAdmin: user?.userType === "admin",
                          totalOverview:
                            pathName === "/admin/inventory-overview"
                              ? {
                                  value: true,
                                  id: selectedItem.company,
                                }
                              : false,
                        })
                      );
                    }}
                    onBlur={
                      () =>
                        setTimeout(() => {
                          setShowLocDropDown(false);
                        }, 300) // timeout for dropdown to close because to let the onNameClick (dropdown functions) run before closing
                    }
                  />
                  <Image src={DownArrow} alt="downarrow" />
                  {/* Dropdown */}
                  <div
                    className={`${
                      showLocDropDown ? "block" : "hidden"
                    } bg-white overflow-auto z-50  absolute top-[110%] w-full left-0  rounded-lg border shadow-md p-3 flex flex-col justify-start max-h-40`}
                  >
                    {locationSearchData.length === 0 && (
                      <p className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg">
                        No results
                      </p>
                    )}
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
                dataList={carData.map(({make}) => {
                  if (!formState.make.includes(make)) {
                    return make;
                  }
                }).filter((item) => item)}
                name="variant"
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
                dataList={[...new Set(carData.flatMap((item) => {
                  if (formState.make.includes(item.make)) {
                    return item.models.map((model) => !formState.model.includes(model.model) && model.model);
                  }
                }))].filter((item) => item)}
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
              {variantData.length > 0 && (
                <MultiInput
                  dataToMap={formState.variant}
                  placeholder="Variant"
                  dataList={variantData.filter((item) => {
                    if (!formState.variant.includes(item)) {
                      return item;
                    } else {
                      return null;
                    }
                  })}
                  name="variant"
                  stopOnChange={true}
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
              )}
              {/* Color input based on toggle */}
              {colorToggle && (
                // <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                //   <input
                //     className="w-full outline-none"
                //     type="text"
                //     placeholder="Color"
                //     name="color"
                //     value={formState.color}
                //     onChange={onInputChange}
                //   />
                // </div>
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
              <div className="flex w-full gap-4">
                {/* Inventory Price input */}
                {priceToggle ? (
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
                ) : null}

                {/* Inventory SKU input
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="number"
                  placeholder="SKU"
                  name="sku"
                  value={formState.sku}
                  onChange={onInputChange}
                />
              </div> */}
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
            </div>
            {/* Inventory Image input */}
            {imageToggle ? (
              <ImageDropzone
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
              className={`flex-1 flex justify-center items-center px-4 py-3 rounded-lg bg-[#78FFB6] hover:bg-[#37fd93] font-semibold cursor-pointer select-none`}
            >
              {showSideMenu.mode === "edit"
                ? "Edit Inventory"
                : "Add Inventory"}
            </div>
          </div>
        </div>
      </div>
      {showSideMenu.value && showSideMenu.mode === "preview" && (
        <InventoryModal />
      )}
    </>
  );
};

export default InventorySideMenu;
