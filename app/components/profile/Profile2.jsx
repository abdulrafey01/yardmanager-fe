"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setShowToast,
} from "../../../lib/features/shared/sharedSlice";
import Image from "next/image";
import ProfileHeaderImg from "../../assets/main/48-img.svg";
import EditImg from "../../assets/main/50-editimg.svg";
import WhiteBtn from "../../abstracts/WhiteBtn";
import GreenBtn from "../../abstracts/GreenBtn";
import UploadIcon from "../../assets/main/44-upload.svg";

import PWDIcon from "../../assets/auth/2-AdornmentEnd.svg";

import PwdHideIcon from "../../assets/main/66-hideeye.png";
import ProfileImg from "../../assets/main/51-profileimg.svg";
import { useRouter } from "next/navigation";
import { updatePersonal } from "../../../lib/features/profile/profileActions";
import { resetToast } from "../../../lib/features/profile/profileSlice";
import { getCookie, getLocalStorage } from "../../helpers/storage";
import axios from "axios";
import { setUser } from "../../../lib/features/auth/authSlice";

import PrfIcon from "../../assets/main/87-avatar2.svg";

const Profile2 = ({ isAdmin = false }) => {
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
  const [userId, setUserId] = React.useState(null);
  const [empImg, setEmpImg] = React.useState("");
  const [coverImg, setCoverImg] = React.useState("");

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

  useEffect(() => {
    const routePage = async () => {
      if ((await JSON.parse(getLocalStorage("user"))?.userType) === "user") {
        return router.push("/profile");
      }
    };
    routePage();
  }, []);

  useEffect(() => {
    setPersonalFormState({
      firstName: user?.data?.name?.first,
      lastName: user?.data.name.last,
      email: user?.data.email,
      username: user?.data.username,
      password: "",
    });
    setUserId(user?.data._id);
    setEmpImg(user?.data?.profile);
    setCoverImg(user?.company?.images?.cover);
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    if (personalData) {
      setPersonalFormState({
        firstName: personalData?.name.first,
        lastName: personalData?.name.last,
        email: personalData?.email,
        username: personalData?.username,
        password: "",
      });
      setEmpImg(personalData?.profile);
    }
  }, [personalData]);

  // Best solution for toast
  useEffect(() => {
    if (toastMsg) {
      dispatch(setShowToast({ value: true, ...toastMsg }));
    }
    dispatch(resetToast());
  }, [toastMsg]);

  const onPersonalFormSubmit = (event) => {
    event.preventDefault();

    if (
      personalFormState.firstName === "" ||
      personalFormState.firstName.length <= 0
    ) {
      return dispatch(
        setShowToast({ value: true, msg: "First name is required", red: true })
      );
    } else if (
      personalFormState.lastName === "" ||
      personalFormState.lastName.length <= 0
    ) {
      return dispatch(
        setShowToast({ value: true, msg: "Last name is required", red: true })
      );
    }
    // check password
    if (personalFormState.password !== personalFormState.confirmPassword) {
      return dispatch(
        setShowToast({ value: true, msg: "Password don't match", red: true })
      );
    }
    // submit personal form

    formData.append("name[first]", personalFormState.firstName);
    formData.append("name[last]", personalFormState.lastName);
    formData.append("email", personalFormState.email);
    formData.append("username", personalFormState.username);
    formData.append("password", personalFormState.password);

    // Url
    let url;
    if (isAdmin) {
      url = `https://yardmanager-be.vercel.app/api/admin/update`;
    } else {
      url = `https://yardmanager-be.vercel.app/api/employees/s/${userId}`;
    }

    // submit personal form
    let token;
    if (isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }

    axios
      .put(
        url,
        isAdmin
          ? {
              name: {
                first: personalFormState.firstName,
                last: personalFormState.lastName,
              },
              email: personalFormState.email,
              password: personalFormState.password,
            }
          : formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        dispatch(setShowToast({ value: true, msg: res.data.message }));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        dispatch(
          setShowToast({ value: true, msg: "Something went wrong", red: true })
        );
      });
  };

  const uploadImage = async (n) => {
    if (!image) {
      return;
    }
    const imageForm = new FormData();

    if (isAdmin) {
      if (imageToggle === 1) {
        imageForm.append("profile", image);
      } else if (imageToggle === 2) {
        imageForm.append("cover", image);
      }
    } else {
      imageForm.append("profile", image);
    }

    // Url
    let url;
    if (isAdmin) {
      url = `https://yardmanager-be.vercel.app/api/admin/update/images`;
    } else {
      url = `https://yardmanager-be.vercel.app/api/employees/s/${userId}`;
    }

    // submit image form
    let token;
    if (isAdmin) {
      token =
        getCookie("adminToken") || window?.sessionStorage.getItem("adminToken");
    } else {
      token = getCookie("token") || window?.sessionStorage.getItem("token");
    }
    axios
      .put(url, imageForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setImageToggle(0);
        setImage(null);
        setEmpImg(res?.data?.data?.profile);
        setCoverImg(res?.data?.data?.company?.images?.cover);
        dispatch(
          setShowToast({ value: true, msg: "Image uploaded successfully" })
        );
        dispatch(setUser({ ...user, data: res.data?.data }));
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
      <div className="flex relative w-full h-28 p-2">
        <Image src={coverImg} layout="fill" className="rounded-lg w-full" />
        {isAdmin && (
          <>
            <div
              onClick={() => setImageToggle(2)}
              className="hidden sm:block absolute top-5 right-5 p-2 bg-[#E6F2F9] rounded-lg text-xs text-black font-semibold cursor-pointer"
            >
              Edit display Image
            </div>
            <div
              onClick={() => setImageToggle(2)}
              className="sm:hidden absolute top-3 right-3 sm:top-5 sm:right-5 p-1 sm:p-2 bg-[#E6F2F9] rounded-lg text-xs text-black font-semibold"
            >
              Edit
            </div>
          </>
        )}
      </div>
      <div className="w-full relative flex flex-col p-6 space-y-4">
        {/* ProfileImg container */}
        <div className="absolute w-14 h-14  sm:w-24 sm:h-24 p-1 top-[-46px] sm:top-[-70px] flex justify-center items-center bg-white rounded-full ">
          <Image
            className="object-cover  rounded-full"
            src={empImg ? empImg : PrfIcon}
            alt="User Profile"
            layout="fill"
          />

          <Image
            onClick={() => setImageToggle(1)}
            className="absolute w-5 h-5 sm:w-10 sm:h-10 bottom-[-5px] right-[5px] cursor-pointer"
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
                className="w-full outline-none bg-white text-gray-500"
                type="text"
                placeholder="Email Address"
                name="email"
                value={personalFormState.email}
                onChange={onPersonalInputChange}
                disabled
              />
            </div>
            {/* <div className="w-full p-3  hover:border-gray-400 rounded-lg border border-[#D0D5DD] ">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="User Name"
                value={personalFormState.username}
                name="username"
                onChange={onPersonalInputChange}
              />
            </div> */}
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
                  ...personalFormState,
                  firstName: "",
                  lastName: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              title={"Reset"}
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
            <div
              className="cursor-pointer"
              onClick={() => {
                setImageToggle(0);
                setImage(null);
              }}
            >
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
                  <div className="flex justify-center items-center flex-col gap-2">
                    <Image src={UploadIcon} alt="UploadIcon" />
                    <p className="text-[#01E268] font-bold">
                      Upload Image
                    </p>{" "}
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
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

export default Profile2;
