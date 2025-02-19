import { useParams } from "react-router-dom";
import { useGetSingleBicycleQuery } from "../../redux/features/bicycles/bicycleApi";
import PayFrom from "../../components/CustomForm/CustomFrom";
import PayInput from "../../components/CustomInput/CustomInput";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { TUser } from "../../redux/features/auth/authSlice";
import UserRole from "../../Constants/Role";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product } = useGetSingleBicycleQuery(id);
  const [disableBtn, setDisableBtn] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const { role }: TUser = jwtDecode(token as string);

  const dispatch = useDispatch();

  // console.log(product);
  useEffect(() => {
    if (Number(product?.data?.quantity) <= 0) {
      setDisableBtn(true);
    }
  }, [product]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOrderFrom = (data: any) => {
    // console.log(data);
    if (data.quantity > 0 && data.quantity <= product!.data!.quantity) {
      dispatch(
        addToCart({
          id: product?.data?._id as string,
          quantity: data.quantity,
          name: product?.data?.name as string,
          unitPrice: product?.data?.price as number,
        })
      );
    } else if (data.quantity <= 0) {
      toast.error("Quantity can not be negative or zero", {
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
      toast.error(`Quantity can not be more than ${product?.data?.quantity}`, {
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
  };

  return (
    <div className="bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto py-4 lg:py-20">
        <ToastContainer />
        <div className="flex justify-between flex-col md:flex-row px-2 lg:px-0">
          <div className="md:w-[58%] flex flex-col gap-8">
            <div>
              <img
                src={
                  product?.data?.image ||
                  "https://i.postimg.cc/FHFYTMMS/surly-bridge-club-bike-275-black-BK01137-800x600.jpg"
                }
                alt=""
                className="w-full object-cover"
              />
            </div>
            <p className="text-lg mb-8">{product?.data?.description}</p>
          </div>

          <div className="md:w-[38%] flex flex-col gap-8">
            <div className="bg-[#0BBA48] w-full p-8">
              <p className="text-white font-semibold text-3xl">
                MRP: ${product?.data?.price}
              </p>
            </div>
            <div className="border border-[#555555] p-8 ">
              <p className="text-xl font-semibold pb-2">SPECIFICATION</p>
              <div className="flex flex-col gap-2 text-[#555555]">
                <p>Name: {product?.data?.name}</p>
                <p>Brand: {product?.data?.brand}</p>
                <p>Type: {product?.data?.type}</p>
                <p>Available Quantity: {product?.data?.quantity}</p>
                {Number(product?.data?.quantity) <= 0 && (
                  <>
                    <div className="badge badge-error text-black">
                      Out Of Stock
                    </div>
                  </>
                )}
                {role === UserRole.customer && (
                  <PayFrom onSubmit={handleOrderFrom}>
                    {/* <p className="mb-1">
                    Quantity<span className="text-red-600">*</span>
                  </p> */}
                    <PayInput
                      name={"quantity"}
                      type={"number"}
                      placeholder={"Quantity"}
                      disabled={disableBtn}
                    ></PayInput>
                    <Button
                      className="bg-[#0BBA48] text-white w-full mt-2"
                      disabled={disableBtn}
                      type="submit"
                    >
                      {" "}
                      Place Order
                    </Button>
                  </PayFrom>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
