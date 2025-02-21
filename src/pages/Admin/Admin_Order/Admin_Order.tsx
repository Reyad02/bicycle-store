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

      let totalAmount = 0;

      order.items.forEach((item: IItem) => {
        const bicycleUnitPrice = item.bicycle.price;
        const bicycleQuantity = item.quantity;
        const currentBicycleTotalPrice =
          Number(bicycleUnitPrice) * Number(bicycleQuantity);
        totalAmount += currentBicycleTotalPrice;
      });

      if (order?.paymentStatus !== "Unpaid") {
        dataTransform.push({
          orderId,
          customerName,
          totalAmount,
          orderDate,
          orderStatus: order.status,
          items: order.items,
        });
      }
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
    <div className="bg-[#F5F5F5] font-inter">
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
                <tr className="text-base text-black text-center font-orbitron">
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataTransform.map((order, index: number) => (
                  <tr className="text-base text-black text-center" key={index}>
                    <td>{order.customerName}</td>
                    <td>${Number(order.totalAmount).toFixed(2)}</td>
                    <td>
                      {order.orderStatus === "Pending" ? (
                        <p className="badge badge-sm badge-outline text-red-600">
                          Pending
                        </p>
                      ) : (
                        <p className="badge badge-sm badge-outline text-[#0BBA48]">
                          Delivered
                        </p>
                      )}
                    </td>
                    <td>{order.orderDate}</td>
                    <td className="flex items-center gap-2 justify-center">
                      {order.orderStatus === "Pending" ? (
                        <Button
                          onClick={() =>
                            updateOrderInfo(order.orderId as string)
                          }
                          className={`text-black bg-transparent border border-gray-600 hover:text-white hover:bg-[#0BBA48] hover:border-[#0BBA48]`}
                        >
                          Deliver
                        </Button>
                      ) : (
                        <p>-</p>
                      )}
                      <Button
                        onClick={() => {
                          setOrderInfo(order);
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

      {openModal && orderInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3 lg:w-1/3 relative font-inter  max-h-full overflow-y-auto">
            <h2 className="text-2xl mb-4 text-center font-orbitron font-semibold">
              Order Details
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-lg">Customer: {orderInfo?.customerName}</p>
              <p className="text-lg">Order Date: {orderInfo?.orderDate}</p>
              <p className="text-lg">Status: {orderInfo?.orderStatus}</p>
              <p className="text-lg">Total Amount: ${orderInfo?.totalAmount}</p>
              <h3 className="text-lg">Items:</h3>
              {orderInfo?.items?.map((item: IItem, index: number) => (
                <div key={index} className="flex flex-col gap-1 mt-3">
                  <p>Product: {item.bicycle.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Unit Price: ${item.bicycle.price}</p>
                  <p>Total Price: ${item.bicycle.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <Button
              className="bg-gray-300 text-black w-full mt-2"
              type="button"
              onClick={() => setOpenModal(false)}
            >
              Close
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
    </div>
  );
};

export default Admin_Order;
