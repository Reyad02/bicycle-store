import { useMyOrdersQuery } from "../../redux/features/order/orderApi";
export interface IOrder {
  _id: string;
  user: string;
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
  bicycleName: string;
  bicycleQuantity: number;
  bicycleUnitPrice: number;
  currentBicycleTotalPrice: number;
  orderDate: string;
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

  console.log(dataTransform);
  return (
    orders?.data?.length > 0 && (
      <div className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex flex-col max-w-7xl py-6 mx-auto">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-base text-black text-center">
                    <th>Order Date</th>
                    <th>Bicycle Name</th>
                    <th>Unit Price</th>
                    <th>Total Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTransform.map((bicycle, index: number) => (
                    <tr
                      className="text-base text-black text-center"
                      key={index}
                    >
                      <td>{bicycle.orderDate}</td>
                      <td>{bicycle.bicycleName}</td>
                      <td>${bicycle.bicycleUnitPrice}</td>
                      <td>{bicycle.bicycleQuantity}</td>
                      <td>${bicycle.currentBicycleTotalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyOrders;
