import { toast, ToastContainer } from "react-toastify";
import PayFrom from "../../components/CustomForm/CustomFrom";
import PayInput from "../../components/CustomInput/CustomInput";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { useCreateUserMutation } from "../../redux/features/users/users";
import { ICustomError, IError } from "../../types/error.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

const Registration = () => {
  const [pass, setPass] = useState<string | null>(null);
  const [confirmPass, setConfirmPass] = useState<string | null>(null);
  const [createUser] = useCreateUserMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sentImg, setSentImg] = useState(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSentImg(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  const handleOrderFrom = async (data: FieldValues) => {
    if (!data?.name) {
      toast.error("Provide Name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPass("");
      setConfirmPass("");
    } else if (!data?.email) {
      toast.error("Provide Email", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPass("");
      setConfirmPass("");
    } else if (!pass || !confirmPass) {
      toast.error("Password field can not be empty", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPass("");
      setConfirmPass("");
    } else if (pass !== confirmPass) {
      toast.error("Password don't match", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPass("");
      setConfirmPass("");
    }

    const loginInfo = {
      email: data?.email,
      password: pass,
    };

    const userInfo = {
      name: data?.name,
      email: data?.email,
      password: pass,
      userType: "Customer",
    };
    // console.log(userInfo);
    const formData = new FormData();
    formData.append("data", JSON.stringify(userInfo));
    if (sentImg) {
      formData.append("file", sentImg);
    }
    const res = await createUser({ formData });
    setPass("");
    setConfirmPass("");
    if (isFetchBaseQueryError(res?.error)) {
      if ((res?.error?.data as IError)?.message === "Validation failed") {
        const errorData = res.error.data as ICustomError;
        const errorMessage = errorData.err?.issues?.[0]?.message;
        toast.error(errorMessage, {
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
      }
    } else {
      toast.success("Registration Successful", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(async () => {
        const result = await login(loginInfo);
        if (isFetchBaseQueryError(result?.error)) {
          toast.error(`${(result?.error?.data as IError)?.message}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        const token = result?.data?.data?.token;
        localStorage.setItem("token", token);
        const { email, role, iat, exp }: TUser = jwtDecode(token);
        dispatch(
          setUser({
            user: { email, role, iat, exp },
            token: token,
            userId: result?.data?.data?.isUserExist?._id,
          })
        );
        navigate("/products", {
          replace: true,
        });
      }, 1000);
    }
  };
  return (
    <div className="py-20 flex max-w-7xl mx-auto justify-between items-center">
      <ToastContainer />
      <div className=" w-[80%] md:w-[60%] lg:w-[40%] mx-auto border p-8">
        <PayFrom onSubmit={handleOrderFrom}>
          <div className="flex flex-col items-center mb-4">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Uploaded"
                className="w-24 h-24 rounded-full object-cover mb-2 border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <PayInput
            name={"name"}
            type={"text"}
            placeholder={"Name"}
            disabled={false}
          ></PayInput>
          <PayInput
            name={"email"}
            type={"text"}
            placeholder={"Email"}
            disabled={false}
          ></PayInput>
          <Input
            className="mb-5"
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            disabled={false}
            value={pass || ""}
            onChange={(e) => {
              setPass(e.target?.value);
            }}
          ></Input>
          <Input
            className=""
            name={"confirm-password"}
            type={"password"}
            placeholder={"Confirm Password"}
            disabled={false}
            value={confirmPass || ""}
            onChange={(e) => setConfirmPass(e.target?.value)}
          ></Input>
          <p
            className={`${
              pass !== confirmPass
                ? "block text-xs text-red-600 pl-2 pt-1"
                : "hidden"
            }`}
          >
            Password don't match
          </p>
          <Button className="bg-[#0BBA48] text-white w-full mt-4" type="submit">
            {" "}
            Registration
          </Button>
        </PayFrom>
        <p className="mt-4 text-center text-base">
          If you already have an account then{" "}
          <Link className="text-[#0BBA48]" to="/login">
            login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Registration;
