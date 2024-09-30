"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import GreenBtn from "../../abstracts/GreenBtn";
import SearchIcon from "../../assets/main/30-search.svg";
import MenuIcon from "../../assets/main/37-menu.svg";
import { calcTotalPage, displayData } from "../../helpers/pagination";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../components/common/TableHead";
import TableRow from "../../components/common/TableRow";
import "../../styles.css";
import {
  setCurrentPage,
  setShowSideMenu,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import {
  addVehicle,
  fetchVehiclesByPage,
  vinDecode,
} from "../../../lib/features/vehicle/vehicleActions";
import WhiteBtn from "../../abstracts/WhiteBtn";
import {
  resetAddedToInv,
  resetVehicleAddedToast,
  resetVehicleToast,
  setVinDecodedData,
} from "../../../lib/features/vehicle/vehicleSlice";
import Footer from "../../components/common/Footer";
import ImageDropzone from "../../components/common/ImageDropzone";
import DropDownInput from "../common/DropDownInput";
import {
  fetchAllParts,
  searchPartByName,
} from "../../../lib/features/parts/partActions";
import MultiInput from "../common/MultiInput";
import { getCookie } from "../../helpers/storage";
import axios from "axios";

const VehiclePage = ({ isAdmin = false }) => {
  const {
    error,
    vehicleData,
    toastMsg,
    vehicleAddedToast,
    addedToInv,
    totalDataLength,
    vinDecodedData,
  } = useSelector((state) => state.vehicle);
  const [showDecodeMenu, setShowDecodeMenu] = React.useState(false);

  const [imgArray2, setImgArray2] = React.useState([]);

  const { user } = useSelector((state) => state.auth);
  const { partSearchData } = useSelector((state) => state.parts);
  const [partValues, setPartValues] = React.useState([]);
  const [partIds, setPartIds] = React.useState([]);
  // THese 2 wont be used here. Declared just for not getting error
  const [variantData, setVariantData] = React.useState([]);
  const [colorToggle, setColorToggle] = React.useState(false);

  const [pagePermission, setPagePermission] = React.useState(null);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState([]);

  const [searchInputValue, setSearchInputValue] = React.useState("");

  const [dataLimit, setDataLimit] = React.useState(10);

  // Vin input state
  const [vinVal, setVinVal] = React.useState("");

  // Get page permission
  useEffect(() => {
    // console.log("user", user);

    if (user) {
      if (user?.userType === "admin") {
        setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      } else {
        if (user?.subscription) {
          if (user?.userType === "user") {
            setPagePermission({
              read: true,
              write: true,
              update: true,
              delete: true,
            });
          } else {
            setPagePermission(
              user?.data?.role?.privileges?.find(
                (privilege) => privilege.name === "vehicles"
              )?.permissions
            );
          }
        } else {
          setPagePermission({
            read: false,
            write: false,
            update: false,
            delete: false,
          });
        }
      }
    }
  }, [user]);
  const temp = useRef(false);
  useEffect(() => {
    if (temp.current && !partSearchData) return
    temp.current = true

    setPartIds(partSearchData.map((value) => value.id));
    setPartValues(partSearchData);
  }, [partSearchData]);

  useEffect(() => {
    dispatch(setCurrentPage("Vehicle"));
    dispatch(
      fetchVehiclesByPage({
        page: pageNumber,
        limit: dataLimit,
        search: searchInputValue,
        isAdmin,
      })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      // console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (addedToInv) {
      dispatch(fetchVehiclesByPage({ page: 1, limit: dataLimit, isAdmin }));
      dispatch(resetAddedToInv());
      setPageNumber(1);
    }
  }, [addedToInv]);
  useEffect(() => {
    if (toastMsg) {
      if (pagePermission?.read) {
        dispatch(setShowToast({ value: true, ...toastMsg, isAdmin }));
        dispatch(resetVehicleToast());
      }
    }
  }, [toastMsg]);

  useEffect(() => {
    if (vehicleAddedToast) {
      // dispatch(setShowToast({ value: true, ...vehicleAddedToast }));
      if (vehicleAddedToast?.red === false) {
        // reset data fields and fetch fresh data
        dispatch(fetchVehiclesByPage({ page: 1, limit: dataLimit, isAdmin }));
        setPageNumber(1);
        setImgArray2([]);
        setVinVal("");
        dispatch(setVinDecodedData(null));
        setShowDecodeMenu(false);
        setPartIds([]);
        setPartValues([]);
      }
      dispatch(resetVehicleAddedToast());
    }
  }, [vehicleAddedToast]);

  useEffect(() => {
    // When part data has come, set total pages
    if (vehicleData) {
      setDataFromServer(vehicleData);
      let { totalPage } = calcTotalPage(totalDataLength, dataLimit);
      setTotalPage(totalPage);
    }
  }, [vehicleData, dataLimit]);
  // Search function
  const handleSearch = (e) => {
    setPageNumber(1);

    setSearchInputValue(e.target.value);
    dispatch(
      fetchVehiclesByPage({
        page: 1,
        limit: dataLimit,
        search: e.target.value,
        isAdmin,
      })
    );
  };

  // Decode Btn Click
  const handleDecodeBtnClick = () => {
    if (vinVal.length !== 17) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Exact 17 characters required for VIN",
          red: true,
        })
      );
    }
    dispatch(vinDecode({ number: vinVal, isAdmin }))
      .unwrap()
      .then((res) => {
        setShowDecodeMenu(true);
        dispatch(
          fetchAllParts({
            isAdmin: user?.userType === "admin",
            totalOverview: false,
          })
        );
      })
      .catch((err) => {
        // reset data fields
        setImgArray2([]);
        setVinVal("");
        dispatch(setVinDecodedData(null));
        setShowDecodeMenu(false);
      });
    // setShowDecodeMenu(true);
  };

  useEffect(() => {
    if (vinDecodedData) {
      console.log(vinDecodedData);
    }
  }, [vinDecodedData]);

  // Create vehicle from VIN
  const handleCreateBtnClick = () => {
    if (partIds.length === 0) {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please select a part",
          red: true,
        })
      );
    }
    const delayedPromises = partIds.map(
      (partId, index) =>
        new Promise((resolve) =>
          setTimeout(() => {
            let formData = new FormData();
            formData.append("vin", vinVal);
            formData.append("startYear", vinDecodedData?.year);
            formData.append("make[0]", vinDecodedData?.make);
            formData.append("model[0]", vinDecodedData?.model);
            formData.append("part", partId);

            // If there are images, append them to formData
            if (imgArray2?.length > 0) {
              imgArray2.forEach((image) => {
                formData.append("images", image);
              });
            }

            // Dispatch the action for each partId
            resolve(dispatch(addVehicle({ data: formData, isAdmin })));
          }, 100 * index)
        )
    );

    Promise.all(delayedPromises)
      .then(() => {
        dispatch(
          setShowToast({
            value: true,
            msg: `${partValues.length} Vehicle created Successfully`,
            red: false,
          })
        );
      })
      .catch((error) => {
        dispatch(
          setShowToast({
            value: true,
            msg: "Vehicle creation failed",
            red: true,
          })
        );
      });
  };

  const onImageChange2 = (e) => {
    const files2 = Array.from(e.target.files);
    setImgArray2([...imgArray2, ...files2]);
  };

  // useEffect(() => {
  //   console.log(imgArray2);
  // }, [imgArray2]);

  const deleteAll = async () => {
    try {
      let token;
      let companyId;

      // role based token
      if (isAdmin) {
        token =
          getCookie("adminToken") ||
          window?.sessionStorage.getItem("adminToken");
        companyId = JSON.parse(localStorage.getItem("companyId"));
      } else {
        token = getCookie("token") || window?.sessionStorage.getItem("token");
      }
      const response = await axios.delete(
        // `https://yardmanager-be.vercel.app/api/vehicles/all${
        `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/all${
          isAdmin ? `?company=${companyId}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response");
      console.log(response.data);
      dispatch(setShowToast({ value: true, msg: response.data.message }));
      setDataFromServer([]);

      // dispatch(
      //   fetchDeletedItemsByPage({ page: pageNumber, limit: dataLimit, isAdmin })
      // );
    } catch (error) {
      console.log(error);
      dispatch(
        setShowToast({
          value: true,
          msg: error.response.message,
          red: true,
        })
      );
    }
  };

  const addAllToInventory = async () => {
    try {
      let token;
      let companyId;

      // role based token
      if (isAdmin) {
        token =
          getCookie("adminToken") ||
          window?.sessionStorage.getItem("adminToken");
        companyId = JSON.parse(localStorage.getItem("companyId"));
      } else {
        token = getCookie("token") || window?.sessionStorage.getItem("token");
      }
      const response = await axios.get(
        // `https://yardmanager-be.vercel.app/api/vehicles/all${
        `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/all/inventory${
          isAdmin ? `?company=${companyId}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response");
      console.log(response.data);
      dispatch(setShowToast({ value: true, msg: response.data.message }));
      setDataFromServer([]);

      // dispatch(
      //   fetchDeletedItemsByPage({ page: pageNumber, limit: dataLimit, isAdmin })
      // );
    } catch (error) {
      console.log(error);
      dispatch(
        setShowToast({
          value: true,
          msg: error.response.data.message,
          red: true,
        })
      );
    }
  };

  const removePartFromList = (index) => {
    setPartValues(partValues.filter((_, i) => i !== index));
    setPartIds(partIds.filter((_, i) => i !== index));
    // console.log(index);
  };
  const handleRadioClick = (e) => {
    if (e.target.value == 25) {
      dispatch(fetchVehiclesByPage({ page: 1, limit: 25, isAdmin }));
      setDataLimit(25);
      setPageNumber(1);
    } else if (e.target.value == 50) {
      dispatch(fetchVehiclesByPage({ page: 1, limit: 50, isAdmin }));
      setDataLimit(50);
      setPageNumber(1);
    } else {
      dispatch(fetchVehiclesByPage({ page: 1, limit: 10, isAdmin }));
      setDataLimit(10);
      setPageNumber(1);
    }
    setSearchInputValue("");
  };

  // on Close menu if no error
  useEffect(() => {
    if (toastMsg?.red === false) {
      dispatch(fetchVehiclesByPage({ page: 1, limit: dataLimit, isAdmin }));
      setPageNumber(1);
    }
  }, [toastMsg]);
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    pagePermission?.read && (
      <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col space-y-4 w-screen md:w-full ">
        {pagePermission?.write && (
          <div className="flex flex-col items-start  bg-white border-gray-300 rounded-xl border w-full p-4 space-y-2">
            <p className="font-semibold text-lg">Add inventory using VIN</p>
            <p className="text-base text-gray-500">
              Create inventory by entering the vehicles VIN{" "}
            </p>
            <div className="flex w-full space-x-2 sm:space-x-4">
              <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <input
                  type="text"
                  placeholder="Enter VIN"
                  className="w-full outline-none bg-transparent"
                  value={vinVal}
                  onChange={(e) => setVinVal(e.target.value)}
                />
              </div>
              <GreenBtn onClick={handleDecodeBtnClick} title={"Decode"} />
            </div>

            <div
              className={`${
                showDecodeMenu ? "flex" : "hidden"
              } flex flex-col space-y-4 w-full `}
            >
              <p className="text-lg font-semibold">Vehicle Information</p>
              <div className="flex  justify-between space-x-4">
                <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                  <input
                    type="text"
                    placeholder="Year"
                    className="w-full cursor-default outline-none bg-transparent"
                    value={vinDecodedData?.year ? vinDecodedData.year : ""}
                    readOnly
                  />
                </div>
                <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                  <input
                    type="text"
                    placeholder="Make"
                    className="w-full cursor-default outline-none bg-transparent"
                    value={vinDecodedData?.make ? vinDecodedData.make : ""}
                    readOnly
                  />
                </div>
                <div className="flex p-2 w-full rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                  <input
                    type="text"
                    placeholder="Model"
                    className="w-full cursor-default outline-none bg-transparent"
                    value={vinDecodedData?.model ? vinDecodedData.model : ""}
                    readOnly
                  />
                </div>
                {/* <DropDownInput
                  inputValue={partValue}
                  keyToShow={"name"}
                  onSearch={searchPartByName}
                  fetchAllFunc={fetchAllParts}
                  placeholder={"Name"}
                  searchData={partSearchData}
                  setIdFunc={(val) => {
                    setPartId(val);
                  }}
                  setColorToggle={setColorToggle}
                  setVariantData={setVariantData}
                  setInputValue={setPartValue}
                  key={"part"}
                /> */}
              </div>
              <MultiInput
                dataToMap={partValues.map((part) => part.name)}
                placeholder="Parts"
                name="variant"
                type="part"
                stopOnChange={true}
                dataList={partSearchData
                  .filter((item) => {
                    if (!partValues.some((part) => part._id === item._id)) {
                      return item;
                    } else {
                      return null;
                    }
                  })
                  .map((item) => item.name)}
                onPressEnter={(e) => {
                  if (e?.name?.length < 1) {
                    dispatch(
                      setShowToast({
                        value: true,
                        msg: "Part should be at least 1 character",
                        red: true,
                      })
                    );
                  } else if (e?.name?.length > 25) {
                    return dispatch(
                      setShowToast({
                        value: true,
                        msg: "Part must be less than 25 characters",
                        red: true,
                      })
                    );
                  } else {
                    console.log('e', e)
                    setPartValues([...partValues, partSearchData.find((item) => item.name === e && !partValues.some((part) => part._id === item._id))]);
                    // setPartIds([
                    //   ...partIds,
                    //   partSearchData.find((item) => item.name === e)?._id, // Safely access the 'id' using optional chaining
                    // ]);
                  }
                }}
                removeItemFunction={removePartFromList}
              />
              {/* Vehicle Image input */}
              <ImageDropzone
                htmlName="image2"
                imgArray={imgArray2}
                setImgArray={setImgArray2}
                onImageChange={onImageChange2}
                placeholder="Upload Vehicle Image"
              />
              <div className="flex justify-center items-center gap-2">
                <WhiteBtn
                  onClick={() => {
                    setVinVal("");
                    dispatch(setVinDecodedData(null));
                    setShowDecodeMenu(false);
                    setImgArray2([]);
                    setPartValues([]);
                    setPartIds([]);
                  }}
                  title={"Discard"}
                />
                <GreenBtn onClick={handleCreateBtnClick} title={"Create"} />
              </div>
            </div>
          </div>
        )}
        {/* Table */}
        <div className=" border rounded-xl border-gray-300 flex flex-col">
          {/* Table Title container */}
          <div className="p-4 gap-2 w-full rounded-t-lg flex justify-between items-center">
            <p className="hidden sm:block font-bold text-lg md:text-2xl">
              Parts List
            </p>
            <p className="sm:hidden font-bold text-lg md:text-2xl text-center">
              Parts List
            </p>
            {/* Search and filter input container */}
            <div className="flex  space-x-2 sm:space-x-4">
              <div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
                <Image src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInputValue}
                  className="w-full outline-none bg-transparent"
                  onChange={handleSearch}
                />
              </div>
              <GreenBtn
                onClick={addAllToInventory}
                title={"Add All to Inventory"}
              />
              <div
                onClick={deleteAll}
                className="p-1 sm:p-3 cursor-pointer hover:bg-red-700 border bg-[#D32F2F] text-white border-gray-300 rounded-lg flex justify-between items-center text-xs sm:text-sm text-center"
              >
                <p>Clear All</p>
              </div>
            </div>
          </div>
          {/* Table Container */}
          <div className="overflow-x-auto sm:overflow-visible">
            {/* Head */}
            <TableHead
              titles={[
                "SKU",
                "Name",
                "Year",
                "Make",
                "Model",
                "Variant",
                "Notes",
                "Location",
              ]}
            />
            {/* Body */}
            {dataFromServer.length == 0 && (
              <div className="text-center p-8 font-semibold">
                No Data Available
              </div>
            )}
            {dataFromServer.map((data, index) => (
              <TableRow
                titles={[
                  data.sku,
                  data.part?.name,
                  new Date(data.startYear).getFullYear() +
                    " - " +
                    new Date(data.lastYear).getFullYear(),
                  data.make,
                  data.model,
                  data.variant,
                  data.notes !== undefined ? data.notes : "",
                  data.location?.location ? data.location.location : "",
                ]}
                key={index}
                rowIndex={index}
                item={data}
                permissions={pagePermission}
              />
            ))}
          </div>
          {/* Footer */}
          <Footer
            totalPage={totalPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            handleRadioClick={handleRadioClick}
          />
        </div>
      </div>
    )
  );
};

export default VehiclePage;
