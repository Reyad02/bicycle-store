/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetLast30ProductsQuery,
  useGetTopSellingProductsQuery,
  useGetTotalDeliveredQuery,
  useGetTotalIncomeQuery,
  useGetTotalPendingQuery,
} from "../../../redux/features/order/orderApi";
import { FaDollarSign } from "react-icons/fa";
import { IoIosBicycle } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { Chart } from "react-google-charts";
import "./Admin_Home_Style.css";

const Admin_Home = () => {
  const { data: totalIncome } = useGetTotalIncomeQuery(undefined);
  const { data: totalDelivered } = useGetTotalDeliveredQuery(undefined);
  const { data: totalPending } = useGetTotalPendingQuery(undefined);
  const { data: topSellingProducts } = useGetTopSellingProductsQuery(undefined);
  const { data: recentSoldProducts } = useGetLast30ProductsQuery(undefined);

  const data = [
    ["Year", "Sales"],
    ...(recentSoldProducts?.data?.map((item: any) => [
      item._id,
      item.totalSold,
    ]) || []),
  ];

  const options = {
    colors: ["#0BBA48"],
  };
  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <div className="card  bg-[#C4EFD4] text-neutral-content py-8 shadow-md">
          <div className="flex justify-center items-center h-full gap-6">
            <div className="p-4 bg-[#0BBA48] clip-pentagon flex justify-center items-center">
              <FaDollarSign className="font-semibold text-3xl text-white" />
            </div>
            <div>
              <p className="text-[#0BBA48] font-inter">Total Income</p>
              <p className="text-2xl font-semibold text-black font-orbitron">
                ${totalIncome?.data}.00
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-[#FFC2A4] text-neutral-content py-8 shadow-md">
          <div className=" flex justify-center items-center  h-full  gap-6">
            <div className="p-4 bg-[#FF5200] clip-pentagon flex justify-center items-center">
              <IoIosBicycle className="font-semibold text-6xl text-white" />
            </div>
            <div>
              <p className="text-[#FF5200]  font-inter">Total Delivered Bicycle</p>
              <p className="text-2xl font-semibold text-black font-orbitron">
                {totalDelivered?.data}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-[#AFCDFD] text-neutral-content py-8 shadow-md">
          <div className=" flex justify-center items-center  h-full  gap-6">
            <div className="p-4 bg-[#2377FC] clip-pentagon flex justify-center items-center">
              <MdOutlinePending className="font-semibold text-6xl  text-white" />
            </div>
            <div>
              <p className="text-[#2377FC]   font-inter">Total Pending Bicycle</p>
              <p className="text-2xl font-semibold text-black font-orbitron">
                {totalPending?.data}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row justify-between mt-4 lg:mt-8 ">
        <div className="w-full lg:w-[48%] bg-white pb-4 rounded-xl shadow-md">
          <p className="px-6 py-4 text-xl font-semibold font-orbitron">Top Products</p>
          <div className="overflow-x-auto px-4 ">
            <table className="table  rounded-lg text-center">
              {/* head */}
              <thead>
                <tr className="border border-gray-300 border-x-0 border-t-0 font-orbitron">
                  <th className="text-sm text-black text-left">Product</th>
                  <th className="text-sm text-black">Quantity</th>
                  <th className="text-sm text-black">Price</th>
                </tr>
              </thead>
              <tbody className=" ">
                {topSellingProducts?.data?.map((item: any, idx: number) => (
                  <tr
                    className={`${
                      idx !== topSellingProducts?.data?.length - 1
                        ? "border border-gray-300 border-x-0 border-t-0 "
                        : ""
                    }`}
                    key={idx}
                  >
                    <td className="">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                item?.bicycleDetails?.image ||
                                "https://img.daisyui.com/images/profile/demo/2@94.webp"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <p className=" font-inter">{item?.bicycleDetails?.name}</p>
                      </div>
                    </td>
                    <td className=" font-inter">{item?.totalQuantity}</td>
                    <td className=" font-inter">${item?.bicycleDetails?.price}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-[48%] bg-white  rounded-xl shadow-md border-none">
          <p className="border text-xl  px-6 py-4 font-semibold border-none font-orbitron">
            Recent Orders
          </p>
          <Chart
            chartType="AreaChart"
            width="100%"
            height="90%"
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin_Home;
