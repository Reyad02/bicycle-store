/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetLast30ProductsQuery,
  useGetTopSellingProductsQuery,
  useGetTotalDeliveredQuery,
  useGetTotalIncomeQuery,
  useGetTotalPendingQuery,
} from "../../../redux/features/order/orderApi";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoIosBicycle } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { Chart } from "react-google-charts";

const Admin_Home = () => {
  const { data: totalIncome } = useGetTotalIncomeQuery(undefined);
  const { data: totalDelivered } = useGetTotalDeliveredQuery(undefined);
  const { data: totalPending } = useGetTotalPendingQuery(undefined);
  const { data: topSellingProducts } = useGetTopSellingProductsQuery(undefined);
  const { data: recentSoldProducts } = useGetLast30ProductsQuery(undefined);
  console.log(recentSoldProducts?.data);

  const data = [
    ["Year", "Sales"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(recentSoldProducts?.data?.map((item: any) => [
      item._id,
      item.totalSold,
    ]) || []),
  ];

  const options = {
    // title: "Recent Orders",
    colors: ["#0BBA48"],
  };
  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <div className="card bg-white text-neutral-content py-8 shadow-md">
          <div className=" flex justify-center items-center  h-full  gap-6">
            <div className="bg-[#F5F5F5] rounded-full p-2">
              <LuCircleDollarSign className="font-semibold text-6xl text-[#0BBA48]" />
            </div>
            <div>
              <p className="text-[#0BBA48] ">Total Income</p>
              <p className="text-2xl font-semibold text-black">
                ${totalIncome?.data}.00
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-white text-neutral-content py-8 shadow-md">
          <div className=" flex justify-center items-center  h-full  gap-6">
            <div className="bg-[#F5F5F5] rounded-full p-2">
              <IoIosBicycle className="font-semibold text-6xl text-[#0BBA48]" />
            </div>
            <div>
              <p className="text-[#0BBA48] ">Total Delivered Bicycle</p>
              <p className="text-2xl font-semibold text-black">
                {totalDelivered?.data}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-white text-neutral-content py-8 shadow-md">
          <div className=" flex justify-center items-center  h-full  gap-6">
            <div className="bg-[#F5F5F5] rounded-full p-2">
              <MdOutlinePending className="font-semibold text-6xl text-[#0BBA48]" />
            </div>
            <div>
              <p className="text-[#0BBA48] ">Total Pending Bicycle</p>
              <p className="text-2xl font-semibold text-black">
                {totalPending?.data}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 ">
        <div className="w-[48%] bg-white pb-4 rounded-xl shadow-md">
          <p className="px-6 py-4 text-xl font-semibold">Top Products</p>
          <div className="overflow-x-auto px-4 ">
            <table className="table  rounded-lg text-center">
              {/* head */}
              <thead>
                <tr className="border border-gray-300 border-x-0 border-t-0">
                  <th className="text-sm text-black text-left">Product</th>
                  <th className="text-sm text-black">Quantity</th>
                  <th className="text-sm text-black">Price</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts?.data?.map((item: any, idx: number) => (
                  <tr
                    className={`${
                      idx !== topSellingProducts?.data?.length - 1
                        ? "border border-gray-300 border-x-0 border-t-0"
                        : ""
                    }`}
                    key={idx}
                  >
                    <td>
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
                        <p>{item?.bicycleDetails?.name}</p>
                      </div>
                    </td>
                    <td>{item?.totalQuantity}</td>
                    <td>${item?.bicycleDetails?.price}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-[48%] bg-white  rounded-xl shadow-md border-none">
          <p className="border text-xl  px-6 py-4 font-semibold border-none">
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
