import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { setShowSideMenu } from "../../../lib/features/shared/sharedSlice";
import Header from "../common/Header";

const InventoryModal = () => {
  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { locationSearchData } = useSelector((state) => state.locations);
  const { partSearchData } = useSelector((state) => state.parts);
  const { toastMsg } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.auth);
  // Values for inputs
  const dispatch = useDispatch();
  // for date input change types
  const [dateType1, setDateType1] = React.useState(false);
  const [dateType2, setDateType2] = React.useState(false);

  // useref is used to prevent adding new key on every character change
  // const formDataRef = useRef(new FormData());

  // To check during form submit
  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://yardmanager-be.vercel.app/api/users/info",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${
  //               getCookie("token") || window?.sessionStorage.getItem("token")
  //             }`,
  //           },
  //         }
  //       );

  //       setImageToggle(response.data?.data?.company?.image);
  //       setPriceToggle(response.data?.data?.company?.price);
  //     } catch (error) {
  //       // console.log("Error fetching user info in settings:", error);
  //     }
  //   };
  //   if (user?.userType === "admin") {
  //     setImageToggle(true);
  //     setPriceToggle(true);
  //     return;
  //   } else {
  //     fetchUserInfo();
  //   }
  // }, []);

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

  const onCloseMenu = () => {
    dispatch(setShowSideMenu({ value: false }));
  };

  const {
    location: { location = {} } = {},
    part: { part = {} } = {},
    images = [],
    ...item
  } = selectedItem || locationSearchData || partSearchData || {};

  const { name: yardName = "", _id: yardId = "" } = location || {};

  const { name: partName = "", _id: partId = "", variant = [] } = part || {};

  return (
    <Transition
      appear
      show={showSideMenu.mode === "preview"}
      as={React.Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={showSideMenu.mode === "preview"}
        onClose={() => {
          onCloseMenu();
          // resetState();
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <div
            className="fixed inset-0 bg-gray-800/40 transition-opacity"
            onClick={onCloseMenu}
          />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {console.log("selected item", selectedItem)};
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-screen-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex w-full justify-between items-start">
                <Header darkType={true} company={user?.company?.name} />
                <div className="flex flex-col items-end gap-2 mt-2 space-y-2">
                  <p className="text-xl font-bold">
                    {selectedItem?.part?.name}
                  </p>
                  <p className="text-sm">
                    SKU:{" "}
                    <span className="font-bold"># {selectedItem.sku}</span>
                  </p>
                  <p className="text-sm font-medium">
                    Date Added{" "}
                    <p className="font-bold">
                      {selectedItem?.createdAt &&
                        new Date(selectedItem.createdAt).toLocaleDateString()}
                    </p>
                  </p>
                  <p className="text-sm font-medium">
                    <p>Created By</p>
                    <p className="font-bold">
                      {item.createdBy?.name && item.createdBy?.name.first + " " + item.createdBy?.name.last}</p>
                    </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <p className="font-medium">Model</p>
                  <div className="my-1 gap-1">
                    {selectedItem.model ? selectedItem.model.map((item, index) => (<p key={index} className="bg-gray-300 rounded-full max-w-fit px-3 py-0.5">{item}</p>)): <p className="bg-gray-300/50 rounded-full max-w-fit px-3 py-0.5">No Model</p>}
                  </div>
                </p>
                <p className="text-sm">
                  <p className="font-medium">Make</p>
                  <div className="my-1 gap-1">
                    {selectedItem.make ? selectedItem.make.map((item, index) => (<p key={index} className="bg-gray-300 rounded-full max-w-fit px-3 py-0.5">{item}</p>)): <p className="bg-gray-300/50 rounded-full max-w-fit px-3 py-0.5">No Make</p>}
                  </div>
                </p>
                <p className="text-sm">
                  <p className="font-medium">Variant</p>
                  <div className="my-1 gap-1">
                    {selectedItem.variant ? selectedItem.variant.map((item, index) => (<p key={index} className="bg-gray-300 rounded-full max-w-fit px-3 py-0.5">{item}</p>)): <p className="bg-gray-300/50 rounded-full max-w-fit px-3 py-0.5">No Variant</p>}
                  </div>
                </p>
                <p className="text-sm">
                  <p className="font-medium">Color</p>
                  <div className="my-1 gap-1">
                    {selectedItem.color ? selectedItem.color.map((item, index) => (<p key={index} className="bg-gray-300 rounded-full max-w-fit px-3 py-0.5">{item}</p>)): <p className="bg-gray-300/50 rounded-full max-w-fit px-3 py-0.5">No Color</p>}
                  </div>
                </p>
              </div>

              <div className="flex space-x-5 mt-4">
                <p className="text-sm">
                  <p className="font-medium">Year</p>
                  <p>
                    {item.startYear}-{item.lastYear}
                  </p>
                </p>
                <p className="text-sm">
                  <p className="font-medium">Location</p>
                  <p>{selectedItem?.location?.location}</p>
                </p>
                <p className="text-sm">
                  <p className="font-medium">Price</p>
                  <p>${selectedItem.price}</p>
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm">
                  <p className="font-medium">Notes</p>
                  <p>{selectedItem?.notes}</p>
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Images:</p>
                <div className="flex flex-wrap mt-2">
                  {selectedItem.images &&
                    selectedItem.images.map((image, index) => (
                      <div key={index} className="pr-2 mb-2">
                        <Image
                          src={image}
                          alt="vehicle image"
                          className="rounded-lg"
                          width={160}
                          height={150}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="absolute -top-5 -right-5">
              <div
                style={{ backgroundColor: "white", borderRadius: "50%" }}
                className="p-1 cursor-pointer"
                onClick={onCloseMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InventoryModal;
