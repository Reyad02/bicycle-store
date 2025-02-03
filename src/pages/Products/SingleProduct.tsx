import { useParams } from "react-router-dom";
import { useGetSingleBicycleQuery } from "../../redux/features/bicycles/bicycleApi";
import PayFrom from "../../components/CustomForm/CustomFrom";
import PayInput from "../../components/CustomInput/CustomInput";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product } = useGetSingleBicycleQuery(id);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    if (Number(product?.data?.quantity) <= 0) {
      setDisableBtn(true);
    }
  }, [product]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOrderFrom = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto py-20">
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
            <p className="text-lg ">{product?.data?.description}</p>
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
                {Number(product?.data?.quantity) <= 0 && (
                  <div className="badge badge-error text-black">
                    Out Of Stock
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 border border-[#555555] p-8 ">
              <p className="text-xl font-semibold pb-2">Place Your Order</p>
              <PayFrom onSubmit={handleOrderFrom}>
                <p className="mb-1">
                  Your Name<span className="text-red-600">*</span>
                </p>
                <PayInput
                  name={"name"}
                  type={"text"}
                  placeholder={"Name"}
                  disabled={disableBtn}
                ></PayInput>
                <p className="mb-1">
                  Your Email<span className="text-red-600">*</span>
                </p>
                <PayInput
                  name={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  disabled={disableBtn}
                ></PayInput>
                <p className="mb-1">
                  Quantity<span className="text-red-600">*</span>
                </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
