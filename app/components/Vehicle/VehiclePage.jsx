"use client";
import Image from "next/image";
import React, { useEffect } from "react";
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

  const [pagePermission, setPagePermission] = React.useState(null);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [dataFromServer, setDataFromServer] = React.useState([]);

  const [searchInputValue, setSearchInputValue] = React.useState("");

  const [dataLimit, setDataLimit] = React.useState(10);

  // Vin input state
  const [vinVal, setVinVal] = React.useState("");

  // For add vehicle
  const formData = new FormData();
  // Get page permission
  useEffect(() => {
    if (user) {
      if (user.userType === "user" || user.userType === "admin") {
        return setPagePermission({
          read: true,
          write: true,
          update: true,
          delete: true,
        });
      }
      setPagePermission(
        user.data.role.privileges.find(
          (privilege) => privilege.name === "vehicles"
        )?.permissions
      );
    }
    console.log(user);
  }, [user]);
  useEffect(() => {
    dispatch(setCurrentPage("Vehicle"));
    dispatch(
      fetchVehiclesByPage({ page: pageNumber, limit: dataLimit, isAdmin })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (error) {
      console.log(error);
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
        // if vin decode failed close the menu
        if (toastMsg?.red === true) {
          // reset data fields
          setImgArray2([]);
          setVinVal("");
          dispatch(setVinDecodedData(null));
          setShowDecodeMenu(false);
        } else {
          setShowDecodeMenu(true);
        }
        dispatch(setShowToast({ value: true, ...toastMsg, isAdmin }));
        dispatch(resetVehicleToast());
      }
    }
  }, [toastMsg]);

  useEffect(() => {
    if (vehicleAddedToast) {
      dispatch(setShowToast({ value: true, ...vehicleAddedToast }));
      if (vehicleAddedToast?.red === false) {
        // reset data fields
        setImgArray2([]);
        setVinVal("");
        dispatch(setVinDecodedData(null));
        setShowDecodeMenu(false);
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
    dispatch(fetchVehiclesByPage({ search: e.target.value, isAdmin }));
  };

  // Decode Btn CLick
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
    dispatch(vinDecode({ number: vinVal, isAdmin }));
    // setShowDecodeMenu(true);
  };

  useEffect(() => {
    if (vinDecodedData) {
      console.log(vinDecodedData);
    }
  }, [vinDecodedData]);

  // Create vehicle from VIN
  const handleCreateBtnClick = () => {
    formData.append("vin", vinVal);
    formData.append("startYear", vinDecodedData?.year);
    formData.append("make[0]", vinDecodedData?.make);
    formData.append("model[0]", vinDecodedData?.model);
    // in add mode
    if (imgArray2?.length > 0) {
      for (let i = 0; i < imgArray2.length; i++) {
        // formDataRef.current.set("images", files[i]);
        formData.append(`images`, imgArray2[i]);
      }
    }
    dispatch(addVehicle({ data: formData, isAdmin }));
  };

  const onImageChange2 = (e) => {
    const files2 = Array.from(e.target.files);
    setImgArray2([...imgArray2, ...files2]);
  };

  // useEffect(() => {
  //   console.log(imgArray2);
  // }, [imgArray2]);

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
                  placeholder="Enter VIN Number"
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
              </div>
              {/* Vehicle Image input */}
              <ImageDropzone
                htmlName="image2"
                imgArray={imgArray2}
                setImgArray={setImgArray2}
                onImageChange={onImageChange2}
              />
              <div className="flex justify-center items-center gap-2">
                <WhiteBtn
                  onClick={() => {
                    setVinVal("");
                    dispatch(setVinDecodedData(null));
                    setShowDecodeMenu(false);
                    setImgArray2([]);
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
            </div>
          </div>
          {/* Table Container */}
          <div className="overflow-x-auto sm:overflow-visible">
            {/* Head */}
            <TableHead
              titles={[
                "SKU",
                "Part",
                "Year",
                "Model",
                "Make",
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
                  new Date(data.startYear).getFullYear(),
                  data.model,
                  data.make,
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
