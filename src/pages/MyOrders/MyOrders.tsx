import { Link } from "react-router-dom";
import { useMyOrdersQuery } from "../../redux/features/order/orderApi";
import { IUser } from "../../types/User.type";
export interface IOrder {
  _id: string;
  user: IUser;
  status: string;
  totalPrice: number;
  paymentStatus: string;
  items: IItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IItem {
  bicycle: Bicycle;
  quantity: number;
  _id: string;
}

export interface Bicycle {
  _id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IDataTransform {
  bicycleImage?: string;
  bicycleName: string;
  bicycleQuantity: number;
  bicycleUnitPrice: number;
  currentBicycleTotalPrice: number;
  orderDate: string;
  orderStatus?: string;
  orderId?: string;
  customerName?: string;
}

const MyOrders = () => {
  const { data: orders } = useMyOrdersQuery(undefined);

  const dataTransform: IDataTransform[] = [];

  if (orders?.data?.length > 0) {
    orders.data.forEach((order: IOrder) => {
      const date = new Date(order.createdAt);
      const orderDate = date.toISOString().split("T")[0];

      order.items.forEach((item: IItem) => {
        const bicycleName = item.bicycle.name;
        const bicycleUnitPrice = item.bicycle.price;
        const bicycleQuantity = item.quantity;
        const currentBicycleTotalPrice =
          Number(bicycleUnitPrice) * Number(bicycleQuantity);

        dataTransform.push({
          bicycleName,
          bicycleUnitPrice,
          bicycleQuantity,
          currentBicycleTotalPrice,
          orderDate,
        });
      });
    });
  }
  const totalOrderPrice = dataTransform.reduce(
    (sum, order) => sum + order.currentBicycleTotalPrice,
    0
  );

  return orders?.data?.length > 0 ? (
    <div className="bg-[#F5F5F5] font-inter">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex flex-col max-w-7xl py-6 mx-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base text-black text-center font-orbitron">
                  <th>Order Date</th>
                  <th>Bicycle Name</th>
                  <th>Unit Price</th>
                  <th>Total Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {dataTransform.map((bicycle, index: number) => (
                  <tr className="text-base text-black text-center" key={index}>
                    <td>{bicycle.orderDate}</td>
                    <td>{bicycle.bicycleName}</td>
                    <td>${bicycle.bicycleUnitPrice}</td>
                    <td>{bicycle.bicycleQuantity}</td>
                    <td>${bicycle.currentBicycleTotalPrice}</td>
                  </tr>
                ))}
                <tr className=" font-orbitron text-black text-center font-semibold text-lg">
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>${totalOrderPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-10 bg-[#F5F5F5]">
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

export default MyOrders;
