import { toast, ToastContainer } from "react-toastify";
import { useGetMyProfileQuery } from "../../redux/features/users/users";
import { IUser } from "../../types/User.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useChangePassMutation } from "../../redux/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../types/error.type";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

type Inputs = {
  currentPass: string;
  newPass: string;
  newConfirmPass: string;
};

const Profile = () => {
  const { data: result } = useGetMyProfileQuery(undefined);
  const mySelf: IUser = result?.data;
  const [oldPass, setOldPass] = useState<string | null>(null);
  const [newPass, setNewPass] = useState<string | null>(null);
  const [confirmPass, setConfirmPass] = useState<string | null>(null);
  const [changePass] = useChangePassMutation();
  const dispatch = useDispatch();

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const passwords = {
      oldPass: data.currentPass,
      newPass: data.newPass,
    };
    const res = await changePass(passwords);
    if (isFetchBaseQueryError(res?.error)) {
      toast.error(`${(res?.error?.data as IError)?.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      toast.success(`${res?.data?.message}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        dispatch(logout());
      }, 1500);
    }
  };

  return (
    <div className="bg-[#F5F5F5]">
      <ToastContainer />
      <div className="max-w-7xl mx-auto flex justify-evenly py-6 ">
        <div className=" flex flex-col items-center">
          <div className="rounded-full">
            <img
              src={
                mySelf?.profileImg ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              className="h-32 w-32 object-cover rounded-full mb-2"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 items-center font-inter">
            <p className="">Name: {mySelf?.name}</p>
            <p className="">Email: {mySelf?.email}</p>
          </div>
        </div>

        <div className="font-inter">
          <p className="text-lg text-center mb-2 font-semibold font-orbitron">
            Change Password
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 bg-transparent items-center"
          >
            {/* register your input into the hook by invoking the "register" function */}
            <div className="flex  gap-2">
              <p>Password:</p>
              <input
                {...register("currentPass")}
                className="bg-transparent border border-gray-300 px-2 py-1 rounded-md"
                type="password"
                onChange={(e) => setOldPass(e.target?.value)}
                placeholder="Your Password"
                value={oldPass || ""}
              />
            </div>
            <div className="flex  gap-2">
              <p>New Password:</p>
              <input
                {...register("newPass")}
                className="bg-transparent border border-gray-300 px-2 py-1 rounded-md"
                type="password"
                onChange={(e) => setNewPass(e.target?.value)}
                placeholder="Set Your New Password"
                value={newPass || ""}
              />
            </div>
            <div className="flex  gap-2">
              <p>Confirm Password:</p>
              <input
                {...register("newConfirmPass")}
                className="bg-transparent border border-gray-300 px-2 py-1 rounded-md"
                type="password"
                onChange={(e) => setConfirmPass(e.target?.value)}
                disabled={!newPass}
                placeholder={
                  !newPass
                    ? "Firstly set your new Password"
                    : "Retype your new password"
                }
                value={confirmPass || ""}
              />
            </div>
            <p
              className={`${
                newPass !== confirmPass
                  ? "block text-xs text-red-600 pl-2 pt-1"
                  : "hidden"
              }`}
            >
              Password don't match
            </p>
            <input
              disabled={
                !oldPass || !newPass || !confirmPass || newPass !== confirmPass
              }
              className="btn w-fit bg-[#0BBA48] text-white border-none disabled:text-black mt-2"
              type="submit"
            />{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
