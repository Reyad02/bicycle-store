import { FieldValues } from "react-hook-form";
import PayFrom from "../../../components/CustomForm/CustomFrom";
import PayInput from "../../../components/CustomInput/CustomInput";
import CustomTextArea from "../../../components/CustomTextArea/CustomTextArea";
import { Button } from "../../../components/ui/button";
import { useRef, useState } from "react";
import { useCreateBicycleMutation } from "../../../redux/features/bicycles/bicycleApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ICustomError, IError } from "../../../types/error.type";
import { toast, ToastContainer } from "react-toastify";

const Add_Product = () => {
  const [newType, setNewType] = useState("");
  const [addBicycle] = useCreateBicycleMutation();
  const [sentImg, setSentImg] = useState(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleContactForm = async (data: FieldValues) => {
    // console.log(data.w);
    const bicycleInfo = {
      name: data.name,
      brand: data.brand,
      description: data.description,
      price: Number(data.price),
      quantity: Number(data.quantity),
      type: newType,
      color: data.color,
      material: data.material,
      torque: Number(data.torque),
      frameSize: Number(data.frameSize),
      seatpost: data.seatpost,
      weight: Number(data.weight),
      chain: data.chain,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(bicycleInfo));
    if (sentImg) {
      formData.append("file", sentImg);
    }
    const res = await addBicycle({ formData });
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
      setSentImg(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success(`${res?.data?.message}`, {
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
    <div>
      <ToastContainer />
      <div className="font-inter">
        <PayFrom onSubmit={handleContactForm}>
          {" "}
          <div className="flex md:gap-4 items-center flex-col md:flex-row">
            <input
              type="file"
              className="file-input file-input-sm text-sm w-full bg-transparent mb-4  shadow-sm border-[#a5a5a5] border-dashed border-2"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <div className="w-full">
              <div className="w-full h-48 flex items-center justify-center mb-4 shadow-sm border-[#a5a5a5] border-dashed border-2">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Selected Preview"
                    className="w-full h-48 object-cover mt-2 "
                  />
                ) : (
                  <p className=" w-full text-center">Plz select an image</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex  md:gap-4 w-full flex-col md:flex-row">
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Name</p>
              <PayInput
                name="name"
                type="text"
                disabled={false}
                placeholder="Bicycle Name"
              ></PayInput>
            </div>
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Brand</p>
              <PayInput
                name="brand"
                type="text"
                disabled={false}
                placeholder="Bicycle Brand"
              ></PayInput>
            </div>
          </div>
          <div className="flex  md:gap-4 w-full flex-col md:flex-row">
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Bicycle Type</p>
              <select
                name={"type"}
                className="w-full bg-transparent mb-5 px-2 py-2 rounded-md text-sm  shadow-sm border-[#a5a5a5] border-dashed border-2"
                onChange={(e) => setNewType(e.target.value)}
                defaultValue={newType}
              >
                <option disabled value="">
                  Select Type
                </option>{" "}
                <option value="Mountain">Mountain</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="BMX">BMX</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Quantity</p>
              <PayInput
                name="quantity"
                type="number"
                disabled={false}
                placeholder="Bicycle Quantity"
              ></PayInput>
            </div>
          </div>
          <div className="flex  md:gap-4 w-full flex-col md:flex-row">
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Price</p>
              <PayInput
                name="price"
                type="number"
                disabled={false}
                placeholder="Unit Price"
              ></PayInput>
            </div>
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Color</p>
              <PayInput
                name="color"
                type="text"
                disabled={false}
                placeholder="Bicycle Brand"
              ></PayInput>
            </div>
          </div>
          <div className="flex  md:gap-4 w-full flex-col md:flex-row">
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Material</p>
              <PayInput
                name="material"
                type="text"
                disabled={false}
                placeholder="Material"
              ></PayInput>
            </div>
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Seatpost</p>
              <PayInput
                name="seatpost"
                type="text"
                disabled={false}
                placeholder="Bicycle Seatpost"
              ></PayInput>
            </div>
          </div>
          <div className="flex  md:gap-4 w-full flex-col md:flex-row">
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Weight</p>
              <PayInput
                name="weight"
                type="number"
                disabled={false}
                placeholder="Bicycle Weight"
              ></PayInput>
            </div>
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Torque</p>
              <PayInput
                name="torque"
                type="number"
                disabled={false}
                placeholder="Bicycle Torque"
              ></PayInput>
            </div>
          </div>
          <div className="flex  md:gap-4 w-full flex-col md:flex-row">
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Frame Size</p>
              <PayInput
                name="frameSize"
                type="number"
                disabled={false}
                placeholder="Bicycle Frame Size"
              ></PayInput>
            </div>
            <div className="w-full">
              <p className="mb-1 pl-2 text-[#555555]">Chain</p>
              <PayInput
                name="chain"
                type="text"
                disabled={false}
                placeholder="Bicycle Chain"
              ></PayInput>
            </div>
          </div>
          <div className=" w-full ">
            <p className="mb-1 pl-2 text-[#555555]">Bicycle Description</p>
            <CustomTextArea
              name="description"
              disabled={false}
              placeholder="Bicycle Description"
            ></CustomTextArea>
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-[#0BBA48] text-white mx-auto text-center  mt-2"
              type="submit"
            >
              {" "}
              Add New Bicycle
            </Button>
          </div>
        </PayFrom>
      </div>
    </div>
  );
};

export default Add_Product;
