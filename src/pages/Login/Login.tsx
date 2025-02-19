import { useDispatch } from "react-redux";
import PayFrom from "../../components/CustomForm/CustomFrom";
import PayInput from "../../components/CustomInput/CustomInput";
import { Button } from "../../components/ui/button";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { FieldValues } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../types/error.type";
import { ToastContainer, toast } from "react-toastify";
import UserRole from "../../Constants/Role";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  const handleOrderFrom = async (data: FieldValues) => {
    try {
      const res = await login(data);
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
      }
      const token = res?.data?.data?.token;
      localStorage.setItem("token", token);
      const { email, role, iat, exp }: TUser = jwtDecode(token);
      dispatch(
        setUser({
          user: { email, role, iat, exp },
          token: token,
          userId: res?.data?.data?.isUserExist?._id,
        })
      );
      if (role === UserRole.admin) {
        navigate("/admin", {
          replace: true,
        });
      } else {
        navigate(location.state?.from || "/products", {
          replace: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="py-20 flex max-w-7xl mx-auto justify-between items-center">
      <ToastContainer />
      <div className=" w-[80%] md:w-[60%] lg:w-[40%] mx-auto border p-8">
        <PayFrom onSubmit={handleOrderFrom}>
          <PayInput
            name={"email"}
            type={"text"}
            placeholder={"Email"}
            disabled={false}
          ></PayInput>
          <PayInput
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            disabled={false}
          ></PayInput>
          <Button className="bg-[#0BBA48] text-white w-full mt-2" type="submit">
            {" "}
            Login
          </Button>
        </PayFrom>
        <p className="mt-4 text-center text-base">You don't have any account then <Link className="text-[#0BBA48]" to="/sign-up">Sign Up</Link> first</p>
      </div>
    </div>
  );
};

export default Login;
