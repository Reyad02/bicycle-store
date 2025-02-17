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
  const [openModal, setOpenModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState<IDataTransform | null>(null);

  const dataTransform: IDataTransform[] = [];

  if ((orders?.data as IOrder[])?.length > 0) {
    (orders?.data as IOrder[]).forEach((order: IOrder) => {
      const date = new Date(order.createdAt);
      const orderDate = date.toISOString().split("T")[0];
      const orderId = order._id;
      const customerName = order.user?.name;

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
            customerName,
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
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataTransform.map((bicycle, index: number) => (
                  <tr className="text-base text-black text-center" key={index}>
                    <td className="flex items-center gap-4 justify-center">
                      {" "}
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
                    <td className="flex items-center gap-2 justify-center">
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
                        <p>-</p>
                      )}
                      <Button size={"sm"}
                        onClick={() => {
                          setOrderInfo(bicycle);
                          setOpenModal(true);
                        }}
                        className={`text-black bg-transparent border border-gray-600 hover:text-white hover:bg-[#0BBA48] hover:border-[#0BBA48]`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 relative">
            <h2 className="text-2xl mb-4 text-center">Order</h2>
            <div className="flex flex-col gap-2">
              <p>Customer: {orderInfo?.customerName}</p>
              <p>Product: {orderInfo?.bicycleName}</p>
              <p>Quantity: {orderInfo?.bicycleQuantity}</p>
              <p>Unit Price: {orderInfo?.bicycleUnitPrice}</p>
              <p>Total Price: {orderInfo?.currentBicycleTotalPrice}</p>
            </div>
            
            <Button
              className="bg-gray-300 text-black w-full mt-2"
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
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
