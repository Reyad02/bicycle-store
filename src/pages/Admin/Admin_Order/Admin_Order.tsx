import { Link } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useUpdateBicycleStatusMutation,
} from "../../../redux/features/order/orderApi";
import { IDataTransform, IItem, IOrder } from "../../MyOrders/MyOrders";
import { Button } from "../../../components/ui/button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast, ToastContainer } from "react-toastify";
import { IError } from "../../../types/error.type";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const Admin_Order = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: orders } = useGetAllOrdersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: 14 },
  ]);
  const [updateBicycleStatus] = useUpdateBicycleStatusMutation();

  const dataTransform: IDataTransform[] = [];

  if ((orders?.data as IOrder[])?.length > 0) {
    (orders?.data as IOrder[]).forEach((order: IOrder) => {
      const date = new Date(order.createdAt);
      const orderDate = date.toISOString().split("T")[0];
      const orderId = order._id;

      order.items.forEach((item: IItem) => {
        const bicycleImage = item.bicycle.image;
        const bicycleName = item.bicycle.name;
        const bicycleUnitPrice = item.bicycle.price;
        const bicycleQuantity = item.quantity;
        const currentBicycleTotalPrice =
          Number(bicycleUnitPrice) * Number(bicycleQuantity);
        const orderStatus = order.status;

        if (order?.paymentStatus !== "Unpaid") {
          dataTransform.push({
            bicycleImage,
            bicycleName,
            bicycleUnitPrice,
            bicycleQuantity,
            currentBicycleTotalPrice,
            orderDate,
            orderStatus,
            orderId,
          });
        }
      });
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "data" in error;
  };

  const updateOrderInfo = async (orderId: string) => {
    const res = await updateBicycleStatus({
      orderId: orderId,
      data: { status: "Delivered" },
    });
    console.log(res);
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
      toast.success("Delivery Successful", {
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

  return (orders?.data as IOrder[])?.length > 0 ? (
    <div className="bg-[#F5F5F5]">
      <ToastContainer />
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col max-w-7xl mx-auto">
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
                disabled={currentPage == orders?.meta?.totalPage}
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
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Total Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {dataTransform.map((bicycle, index: number) => (
                  <tr className="text-base text-black text-center" key={index}>
                    <td className="flex items-center gap-4 justify-center">
                      {" "}
                      <div className="mask flex items-center h-12 w-12">
                        <img
                          src={
                            bicycle.bicycleImage ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                      {bicycle.bicycleName}
                    </td>
                    <td>${bicycle.bicycleUnitPrice}</td>
                    <td>{bicycle.bicycleQuantity}</td>
                    <td>${bicycle.currentBicycleTotalPrice}</td>
                    <td>
                      {bicycle.orderStatus === "Pending" ? (
                        <p className="badge badge-sm badge-outline text-red-600">
                          Pending
                        </p>
                      ) : (
                        <p className="badge badge-sm badge-outline text-[#0BBA48] ">
                          Delivered
                        </p>
                      )}
                    </td>
                    <td>{bicycle.orderDate}</td>
                    <td>
                      {bicycle.orderStatus === "Pending" ? (
                        <Button
                          onClick={() =>
                            updateOrderInfo(bicycle?.orderId as string)
                          }
                          className={`text-black bg-transparent border border-gray-600 hover:text-white hover:bg-[#0BBA48] hover:border-[#0BBA48]`}
                        >
                          Deliver
                        </Button>
                      ) : (
                        <p>Delivered</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-xl font-semibold text-gray-600">
        Your order history is empty!
      </h2>
      <Link
        to="/products"
        className="mt-4 bg-[#0BBA48] text-white px-4 py-2 rounded"
      >
        Go to Products
      </Link>
    </div>
  );
};

export default Admin_Order;
