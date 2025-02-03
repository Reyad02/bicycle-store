import { useDispatch } from "react-redux";
import PayFrom from "../../components/CustomForm/CustomFrom";
import PayInput from "../../components/CustomInput/CustomInput";
import { Button } from "../../components/ui/button";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleOrderFrom = async (data: FieldValues) => {
    try {
      const res = await login(data);
      const token = res?.data?.data;
      localStorage.setItem("token", token);
      const { email, role, iat, exp }: TUser = jwtDecode(token);
      dispatch(setUser({ user: { email, role, iat, exp }, token: token }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="py-20 flex max-w-7xl mx-auto justify-between items-center">
      <div className="md:w-[40%] mx-auto border p-8">
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
      </div>
      {/* <div className="md:w-[48%]">
        <img
          src="https://i.postimg.cc/VvzwZFnR/about-us-2-qaspjptn4b9uv65e7i8w305i4xynzq6t441tw9wcwo.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Login;
