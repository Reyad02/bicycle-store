import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let role = "";
  if (token) {
    const decodedToken: TUser = jwtDecode(token as string);
    role = decodedToken.role;
  }

  useEffect(() => {
    if (Number(product?.data?.quantity) <= 0) {
      setDisableBtn(true);
    }
  }, [product]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOrderFrom = (data: any) => {
    if(data.quantity){

      const isInteger = !Number.isInteger(Number(data.quantity));
    
    if (isInteger) {
      toast.error("Quantity must be a integer number", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  }

    if (data.quantity > 0 && data.quantity <= product!.data!.quantity) {
      dispatch(
        addToCart({
          id: product?.data?._id as string,
          quantity: data.quantity,
          name: product?.data?.name as string,
          unitPrice: product?.data?.price as number,
        })
      );

      navigate("/cart", {
        replace: true,
      });
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
            <p className="text-base mb-8 font-inter">
              Description: {product?.data?.description}
            </p>
          </div>

          <div className="md:w-[38%] flex flex-col gap-8">
            <div className="bg-[#0BBA48] w-full p-8">
              <p className="text-white font-semibold text-3xl font-orbitron">
                MRP: ${product?.data?.price}
              </p>
            </div>
            <div className="border border-[#d2d2d2] p-8 ">
              <p className="text-xl font-semibold pb-2 font-orbitron">
                SPECIFICATION
              </p>
              <div className="flex flex-col gap-2 font-inter text-[#555555]">
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Name:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Brand:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.brand}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Type:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Color:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.color}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Material:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.material}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Seat post:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.seatpost}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Weight:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.weight} kg</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Torque:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.torque} Nm</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Frame Size:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.frameSize} cm</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Chain:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.chain}</span>
                </div>
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Available Quantity:</span>
                  <span className="flex-grow border-dashed  border-t-2 border-[#a5a5a5] mx-2 text-center "></span>
                  <span className="">{product?.data?.quantity}</span>
                </div>
                {Number(product?.data?.quantity) <= 0 && (
                  <>
                    <div className="badge badge-error text-black">
                      Out Of Stock
                    </div>
                  </>
                )}
                {role !== UserRole.admin && (
                  <PayFrom onSubmit={handleOrderFrom}>
                    {/* <p className="mb-1">
                    Quantity<span className="text-red-600">*</span>
                  </p> */}
                    <p className="text-xl font-semibold pb-2 text-black mt-8 font-orbitron">
                      Choose Quantity
                    </p>

                    <PayInput
                      name={"quantity"}
                      type={"number"}
                      placeholder={"How many you need..."}
                      disabled={disableBtn}
                    ></PayInput>
                    <Button
                      className="bg-[#0BBA48] text-white w-full mt-4"
                      disabled={disableBtn}
                      type="submit"
                    >
                      {" "}
                      Buy Now
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
