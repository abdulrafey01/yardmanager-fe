"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setShowToast,
} from "../../../../../lib/features/shared/sharedSlice";
import Image from "next/image";
import ProfileHeaderImg from "../../../../assets/main/48-img.svg";
import EditImg from "../../../../assets/main/50-editimg.svg";
import WhiteBtn from "../../../../abstracts/WhiteBtn";
import GreenBtn from "../../../../abstracts/GreenBtn";

import PWDIcon from "../../../../assets/auth/2-AdornmentEnd.svg";

import PwdHideIcon from "../../../../assets/main/66-hideeye.png";
import ProfileImg from "../../../../assets/main/51-profileimg.svg";
import { useRouter } from "next/navigation";
import { updatePersonal } from "../../../../../lib/features/profile/profileActions";
import { resetToast } from "../../../../../lib/features/profile/profileSlice";
import { getCookie, getLocalStorage } from "../../../../helpers/storage";
import axios from "axios";

const page = ({}) => {
  const dispatch = useDispatch();
  const [marginTop, setMarginTop] = useState("70px");
  const { user } = useSelector((state) => state.auth);
  const { personalData, toastMsg } = useSelector((state) => state.profile);

  const [imageToggle, setImageToggle] = useState(0);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const formData = new FormData();

  const [personalFormState, setPersonalFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  // Password eye toggle
  const [togglePWD, setTogglePWD] = React.useState(false);
  const [togglePWDC, setTogglePWDC] = React.useState(false);

  // for adding margin top to block 2 bcz due to absolute container tailwind is not working
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMarginTop("30px"); // Adjust this value for small screens
      } else {
        setMarginTop("50px"); // Adjust this value for medium screens and above
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch(setCurrentPage("MyProfile"));
  }, [dispatch]);

  // set personal form state
  const onPersonalInputChange = (event) => {
    setPersonalFormState({
      ...personalFormState,
      [event.target.name]: event.target.value,
    });
  };

  // // If not user then can't access this page
  // useEffect(() => {
  //   const routePage = async () => {
  //     if (user?.userType !== "employee") {
  //       return router.push("/profile");
  //     }
  //     setPersonalFormState({
  //       firstName: user?.data.name.first,
  //       lastName: user?.data.name.last,
  //       email: user?.data.email,
  //       username: user?.data.username,
  //       password: user?.data.password,
  //     });
  //   };
  //   routePage();
  // }, []);

  useEffect(() => {
    const routePage = async () => {
      if (
        (await JSON.parse(getLocalStorage("user"))?.userType) !== "employee"
      ) {
        return router.push("/profile");
      }
    };
    routePage();
  }, []);

  useEffect(() => {
    setPersonalFormState({
      firstName: user?.data.name.first,
      lastName: user?.data.name.last,
      email: user?.data.email,
      username: user?.data.username,
      password: user?.data.password,
    });
  }, [user]);

  useEffect(() => {
    if (personalData) {
      setPersonalFormState({
        firstName: personalData?.name.first,
        lastName: personalData?.name.last,
        email: personalData?.email,
        username: personalData?.username,
        password: personalData?.password,
      });
    }
  }, [personalData]);

  // Best solution for toast
  useEffect(() => {
    if (toastMsg) {
      dispatch(setShowToast({ value: true, msg: toastMsg }));
    }
    dispatch(resetToast());
  }, [toastMsg]);

  const onPersonalFormSubmit = (event) => {
    event.preventDefault();

    // check password
    if (personalFormState.password !== personalFormState.confirmPassword) {
      return dispatch(
        setShowToast({ value: true, msg: "Password don't match" })
      );
    }
    // submit personal form
    formData.append("name[first]", personalFormState.firstName);
    formData.append("name[last]", personalFormState.lastName);
    formData.append("email", personalFormState.email);
    formData.append("username", personalFormState.username);
    formData.append("password", personalFormState.password);
    // formData.append;

    // submit personal form
    dispatch(updatePersonal(formData));

    // reset form
    setPersonalFormState({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };
  const uploadImage = async (n) => {
    if (!image) {
      return;
    }
    const imageForm = new FormData();
    imageForm.append("profile", image);

    let token = await getCookie("token");
    axios
      .put("https://yardmanager-be.vercel.app/api/users/update", imageForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setImageToggle(0);
        setImage(null);
      })
      .catch((err) => {
        console.log(err);
        setImage(null);
        dispatch(
          setShowToast({ value: true, msg: "Something went wrong", red: true })
        );
      });
  };
  return (
    // Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
    // pr-6 for small devices to make content away from scrollbar due to screen width
    <div className="p-4 pr-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col  space-y-4  w-screen md:w-full ">
      {/* Header Imgs container */}
      <div className="flex relative w-full p-2">
        <Image src={ProfileHeaderImg} className="rounded-lg w-full" />
        <div className="hidden sm:block absolute top-5 right-5 p-2 bg-[#E6F2F9] rounded-lg text-xs text-black font-semibold cursor-pointer">
          Edit display Image
        </div>
        <div className="sm:hidden absolute top-3 right-3 sm:top-5 sm:right-5 p-1 sm:p-2 bg-[#E6F2F9] rounded-lg text-xs text-black font-semibold">
          Edit
        </div>
      </div>
      <div className="w-full relative flex flex-col p-6 space-y-4">
        {/* ProfileImg container */}
        <div className="absolute w-20 h-14 sm:w-28 sm:h-28 p-1 top-[-46px] sm:top-[-70px] flex justify-center items-center bg-white rounded-full  object-cover">
          <Image src={ProfileImg} />
          <Image
            onClick={() => setImageToggle(1)}
            className="absolute bottom-[-5px] right-[5px] cursor-pointer"
            src={EditImg}
          />
        </div>
        {/* Block 2 */}
        <div className="w-full bg-white p-4 space-y-4 rounded-lg">
          <p className="font-bold text-[#344054] text-xl">
            Personal Information
          </p>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={personalFormState.firstName}
                onChange={onPersonalInputChange}
              />
            </div>
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD]">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Last Name"
                value={personalFormState.lastName}
                name="lastName"
                onChange={onPersonalInputChange}
              />
            </div>
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD] ">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Email Address"
                name="email"
                value={personalFormState.email}
                onChange={onPersonalInputChange}
              />
            </div>
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD] ">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="User Name"
                value={personalFormState.username}
                name="username"
                onChange={onPersonalInputChange}
              />
            </div>
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD] flex justify-between items-center">
              <input
                className="w-full outline-none"
                type={togglePWD ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={personalFormState.password}
                onChange={onPersonalInputChange}
              />
              <Image
                src={togglePWD ? PWDIcon : PwdHideIcon}
                onClick={() => setTogglePWD(!togglePWD)}
                alt="logo"
              />
            </div>
            <div className="w-full p-3 hover:border-gray-400 rounded-lg border border-[#D0D5DD] flex justify-between items-center">
              <input
                className="w-full outline-none"
                type={togglePWDC ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={personalFormState.confirmPassword}
                onChange={onPersonalInputChange}
              />
              <Image
                src={togglePWDC ? PWDIcon : PwdHideIcon}
                onClick={() => setTogglePWDC(!togglePWDC)}
                alt="logo"
              />
            </div>
          </div>
          <div className="flex w-full justify-end items-center space-x-4">
            <WhiteBtn
              onClick={() => {
                setPersonalFormState({
                  firstName: "",
                  lastName: "",
                  email: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              title={"Discard"}
            />
            <GreenBtn onClick={onPersonalFormSubmit} title={"Save Changes"} />
          </div>
        </div>
      </div>
      {/* Image upload modal */}
      <div
        className={`${
          imageToggle > 0 ? "fixed" : "hidden"
        } top-0 left-0 w-full h-full z-50 bg-black/60 flex justify-center items-center`}
      >
        <div className="bg-white p-4 rounded-lg w-[500px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Upload Image</h3>
            <div className="cursor-pointer" onClick={() => setImageToggle(0)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          <div className="mt-4 space-y-4">
            <div className="flex justify-center items-center">
              <label
                htmlFor="image"
                className="bg-gray-200 px-4 py-2 rounded-lg flex justify-center items-center hover:bg-gray-300"
              >
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    width={100}
                    height={100}
                    alt="profile"
                    className="w-40 h-40"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2.828-2.828l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <div className="flex justify-center items-center">
                <button
                  className="bg-[#78FFB6] text-black font-medium px-4 py-2 rounded-lg hover:bg-[#3FFB97]"
                  onClick={uploadImage}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
