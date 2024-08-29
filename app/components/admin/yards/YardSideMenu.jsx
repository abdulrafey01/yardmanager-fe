import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSideMenu,
  setShowToast,
} from "../../../../lib/features/shared/sharedSlice";
import FancyInput from "../../common/FancyInput";
import WhiteBtn from "../../../abstracts/WhiteBtn";
import GreenBtn from "../../../abstracts/GreenBtn";
import CrossIcon from "../../../assets/main/80-cross.svg";
import Image from "next/image";
import SingleImageDropzone from "../../common/SingleImageDropzone";
import {
  addYard,
  fetchYardsByPage,
  updateYard,
} from "../../../../lib/features/yards/yardActions";

const YardSideMenu = () => {
  const dispatch = useDispatch();

  const { showSideMenu, selectedItem } = useSelector((state) => state.shared);
  const { toastMsg } = useSelector((state) => state.yards);

  const [yardDateType, setYardDateType] = React.useState("text");
  const [companyImage, setCompanyImage] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const [coverImage, setCoverImage] = React.useState(null);

  const [formState, setFormState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    companyPhone: "",
    companyAddress: "",
  });

  // To do: edit useffect, show data and  update form submit
  useEffect(() => {
    if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
      if (selectedItem) {
        console.log("item", selectedItem);
        setFormState({
          firstName: selectedItem?.owner?.name?.first,
          lastName: selectedItem?.owner?.name?.last,
          email: selectedItem?.owner?.email,
          companyName: selectedItem?.name,
          companyPhone: selectedItem?.phone,
          companyAddress: selectedItem?.address,
          password: "",
        });
        setCoverImage(selectedItem?.images?.cover);
        setCompanyImage(selectedItem?.images?.profile);
        setProfileImage(selectedItem?.owner?.profile);
      }
    } else {
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        companyPhone: "",
        companyAddress: "",
      });
      setCoverImage(null);
      setCompanyImage(null);
      setProfileImage(null);
    }
  }, [selectedItem, showSideMenu]);

  // OnInput Change
  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  // on form submit
  const onFormSubmit = async () => {
    console.log("Yard data", formState, companyImage, profileImage, coverImage);

    const formData = new FormData();

    if (!formState.firstName || formState.firstName === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter First name",
          red: true,
        })
      );
    }
    if (!formState.lastName || formState.lastName === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter Last name",
          red: true,
        })
      );
    }
    if (!formState.email || formState.email === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter Email",
          red: true,
        })
      );
    }
    if (!formState.password || formState.password === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter Password",
          red: true,
        })
      );
    }
    if (!formState.companyName || formState.companyName === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter Company name",
          red: true,
        })
      );
    }
    if (!formState.companyPhone || formState.companyPhone === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter Company Phone",
          red: true,
        })
      );
    }
    if (!formState.companyAddress || formState.companyAddress === "") {
      return dispatch(
        setShowToast({
          value: true,
          msg: "Please enter Company Address",
          red: true,
        })
      );
    }
    if (showSideMenu.mode === "add") {
      if (!profileImage) {
        return dispatch(
          setShowToast({
            value: true,
            msg: "Please select Profile Image",
            red: true,
          })
        );
      }
      if (!companyImage) {
        return dispatch(
          setShowToast({
            value: true,
            msg: "Please select Company Image",
            red: true,
          })
        );
      }

      if (!coverImage) {
        return dispatch(
          setShowToast({
            value: true,
            msg: "Please select Cover Image",
            red: true,
          })
        );
      }
    }

    if (showSideMenu.mode === "edit") {
      // submit personal form
      formData.append("name[first]", formState.firstName);
      formData.append("name[last]", formState.lastName);
      formData.append("email", formState.email);
      formData.append("password", formState.password);

      dispatch(
        updateYard({
          id: selectedItem?._id,
          userId: selectedItem?.owner?._id,
          companyData: {
            name: formState.companyName,
            address: formState.companyAddress,
            phone: formState.companyPhone,
          },
          userData: formData,
        })
      );
      // .unwrap()
      // .then(() => {
      //   dispatch(fetchYardsByPage({ page: 1, limit: 10 }));
      // })
      // .catch((err) => {});
    } else {
      formData.append("user[name][first]", formState.firstName);
      formData.append("user[name][last]", formState.lastName);
      formData.append("user[email]", formState.email);
      formData.append("user[password]", formState.password);
      formData.append("company[name]", formState.companyName);
      formData.append("company[phone]", formState.companyPhone);
      formData.append("company[address]", formState.companyAddress);
      formData.append("companyImage", companyImage);
      formData.append("profile", profileImage);
      formData.append("cover", coverImage);
      dispatch(addYard(formData));
      // .unwrap()
      // .then(() => {
      //   dispatch(fetchYardsByPage({ page: 1, limit: 10 }));
      // })
      // .catch((err) => {});
    }
  };

  useEffect(() => {
    if (toastMsg?.red === false) {
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        companyPhone: "",
        companyAddress: "",
      });
      setCompanyImage(null);
      setProfileImage(null);
      setCoverImage(null);
      dispatch(setShowSideMenu({ value: false }));
      dispatch(setShowSideMenu({ value: false }));
    }
  }, [toastMsg]);

  return (
    <div
      className={`fixed ${
        showSideMenu.value ? "flex" : "hidden"
      } w-full  h-full  z-20 overflow-y-clip`}
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
                ? "Edit Yard"
                : showSideMenu.mode === "preview"
                ? "Preview Yard"
                : "Add New Yard"}
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
            }  flex flex-col space-y-4   w-full `}
          >
            {/* User name input */}
            <div className="flex w-full gap-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={onInputChange}
                  name="firstName"
                />
              </div>
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Last Name"
                  onChange={onInputChange}
                  value={formState.lastName}
                  name="lastName"
                />
              </div>
            </div>

            {/* User Email and Password input */}
            <div className="flex w-full gap-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  onChange={onInputChange}
                  placeholder="User Email"
                  value={formState.email}
                  name="email"
                />
              </div>
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  onChange={onInputChange}
                  placeholder="User Password"
                  value={formState.password}
                  name="password"
                />
              </div>
            </div>

            {/* Company name & number input */}
            <div className="flex w-full gap-4">
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Company Name"
                  value={formState.companyName}
                  onChange={onInputChange}
                  name="companyName"
                />
              </div>
              <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
                <input
                  className="w-full outline-none"
                  type="number"
                  placeholder="Company Phone"
                  value={formState.companyPhone}
                  onChange={onInputChange}
                  name="companyPhone"
                />
              </div>
            </div>

            {/* Company Address input */}
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Company Address"
                value={formState.companyAddress}
                onChange={onInputChange}
                name="companyAddress"
              />
            </div>
            <div
              className={`flex flex-col gap-4 ${
                showSideMenu.mode === "edit" ? "hidden" : "flex"
              }`}
            >
              {/* Profile  Image Personal */}
              <SingleImageDropzone
                htmlName="profileImage"
                img={profileImage}
                onImageChange={(e) => setProfileImage(e.target.files[0])}
                setImg={setProfileImage}
                placeholder={"Upload Profile Image"}
              />
              {/*Company Profile and Cover Image */}
              <div className="flex w-full gap-4">
                <SingleImageDropzone
                  htmlName="companyImage"
                  img={companyImage}
                  onImageChange={(e) => setCompanyImage(e.target.files[0])}
                  setImg={setCompanyImage}
                  placeholder={"Upload Company Image"}
                />
                <SingleImageDropzone
                  htmlName="coverImage"
                  img={coverImage}
                  onImageChange={(e) => setCoverImage(e.target.files[0])}
                  setImg={setCoverImage}
                  placeholder={"Upload Cover Image"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex w-full p-4  justify-center  gap-4 flex-1 items-end">
          <div className="flex-1">
            <WhiteBtn
              onClick={() => dispatch(setShowSideMenu({ value: false }))}
              title={"Cancel"}
              textCenter={true}
            />
          </div>
          <div
            className={`flex-1 ${
              showSideMenu.mode === "preview" ? "hidden" : ""
            }`}
          >
            <GreenBtn onClick={onFormSubmit} title={"Save"} textCenter={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YardSideMenu;
