import { Button } from "../../../components/ui/button";
import {
  useDeleteBicycleMutation,
  useGetAllBicyclesQuery,
  useUpdateBicycleMutation,
} from "../../../redux/features/bicycles/bicycleApi";
import { useState } from "react";
import { IBicycle } from "../../../types/Bicycle.type";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import PayFrom from "../../../components/CustomForm/CustomFrom";
import PayInput from "../../../components/CustomInput/CustomInput";
import { FieldValues } from "react-hook-form";
import CustomTextArea from "../../../components/CustomTextArea/CustomTextArea";
import { ICustomError, IError } from "../../../types/error.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const Admin_Poducts = () => {
  const [bicycleInfo, setBicycleInfo] = useState<IBicycle | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBicycle] = useDeleteBicycleMutation();
  const [newType, setNewType] = useState("");
  const [updateBicycle] = useUpdateBicycleMutation();

  const { data: products } = useGetAllBicyclesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: 14 },
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteItem = (bicycle: IBicycle) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete it?",
      confirmButtonColor: "#DC2626",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBicycle(bicycle._id);
        if (res.data) {
          toast.success("Your message deleted successfully", {
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
      }
    });
  };

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  const handleOrderFrom = async (data: FieldValues) => {
    const updatedBicycleInfo = {
      name: data.name || bicycleInfo!.name,
      brand: data.brand || bicycleInfo!.brand,
      description: data.description || bicycleInfo!.description,
      price: Number(data.price ?? bicycleInfo!.price),
      quantity: Number(data.quantity ?? bicycleInfo!.quantity),
      type: newType || bicycleInfo!.type,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedBicycleInfo));
    const res = await updateBicycle({ productId: bicycleInfo?._id, formData });
    setOpenModal(false);
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
    <>
      <div className="mx-auto z-10">
        <ToastContainer />

        <div className="flex justify-end items-center gap-2 mb-2">
          <p>Page: </p>
          <div className=" flex items-center w-fit gap-2">
            <button
              className=" btn btn-sm btn-outline hover:border-[#0BBA48] hover:bg-white text-black"
              disabled={currentPage == 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <GrPrevious className="hover:text-[#0BBA48]" />
            </button>
            <p className="border rounded-full px-2 py-1 border-[#0BBA48] ">
              {currentPage}
            </p>
            <button
              className=" btn btn-sm btn-outline hover:border-[#0BBA48] hover:bg-white text-black"
              disabled={currentPage == products?.meta?.totalPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <GrNext className="hover:text-[#0BBA48]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table border border-black">
            <thead>
              <tr className="text-base text-black text-center">
                <th className="text-left">Product</th>
                <th>Brand</th>
                <th className="">Type</th>
                <th className="">Quantity</th>
                <th className="">Unit Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((item, idx) => (
                <tr
                  key={idx}
                  className="text-base text-black text-center items-center hover:bg-gray-100 "
                >
                  <td className="flex items-center gap-4">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          item.image ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                    <p>
                      {item.name}
                    </p>
                  </td>
                  <td>{item.brand}</td>
                  <td>{item.type}</td>
                  <td>
                    {item.quantity > 0 ? (
                      item.quantity
                    ) : (
                      <div className="badge badge-error text-white badge-sm bg-red-600">
                        Out Of Stock
                      </div>
                    )}
                  </td>
                  <td>${item.price}.00</td>
                  <td >
                    <div className="flex gap-4 ">
                      <Link to={`product-id/${item._id}`}>
                        <IoEye className="text-xl hover:text-[#0BBA48]" />
                      </Link>

                      <div
                        className="hover:cursor-pointer"
                        onClick={() => {
                          setBicycleInfo(item);
                          setOpenModal(true);
                        }}
                      >
                        <BsPencilSquare className="text-xl hover:text-[#0BBA48]" />
                      </div>
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => deleteItem(item)}
                      >
                        <MdDelete className="text-xl hover:text-red-600" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg lg:w-1/3 relative">
            <h2 className="text-2xl mb-4">Update Bicycle</h2>
            <p>Name:</p>
            <PayFrom onSubmit={handleOrderFrom}>
              <PayInput
                name={"name"}
                type={"text"}
                placeholder={bicycleInfo?.name}
                disabled={false}
              />
              <div>
                <p>Type:</p>
                <select
                  name={"type"}
                  className="w-full bg-transparent mb-5 border-[#E5E5E5] border px-2 py-1 rounded-md"
                  defaultValue={bicycleInfo?.type}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="Mountain">Mountain</option>
                  <option value="Road">Road</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="BMX">BMX</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <p>Brand:</p>
              <PayInput
                name={"brand"}
                type={"text"}
                placeholder={bicycleInfo?.brand}
                disabled={false}
              />
              <p>Quantity:</p>
              <PayInput
                name={"quantity"}
                type={"number"}
                placeholder={String(bicycleInfo?.quantity)}
                disabled={false}
              />
              <p>Price:</p>
              <PayInput
                name={"price"}
                type={"number"}
                placeholder={String(bicycleInfo?.price)}
                disabled={false}
              />
              <p>Description:</p>
              <CustomTextArea
                name="description"
                disabled={false}
                placeholder={bicycleInfo?.description}
              ></CustomTextArea>
              <Button
                className="bg-[#0BBA48] text-white w-full mt-2"
                type="submit"
              >
                Update
              </Button>
              <Button
                className="bg-gray-300 text-black w-full mt-2"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </PayFrom>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin_Poducts;
