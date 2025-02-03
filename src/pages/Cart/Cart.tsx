import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CartItem, removeFromCart } from "../../redux/features/cart/cartSlice";

const Cart = () => {
  const itemsInCart = useSelector((state: RootState) => state?.cart?.items);
  const totalPrice = useSelector((state: RootState) => state?.cart?.totalPrice);
  const dispatch = useDispatch();
  const deleteItem = (item:CartItem) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="bg-[#F5F5F5]">
      <div className="flex flex-col max-w-7xl py-6  mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className=" text-base text-black text-center">
                <th></th>
                <th className="">Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsInCart?.map((item, idx) => (
                <tr className=" text-base text-black text-center" key={idx}>
                  <th>{idx + 1}</th>
                  <td className="">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>${Number(item.quantity) * Number(item.unitPrice)}</td>
                  <td>
                    <Button
                      onClick={() => deleteItem(item)}
                      className="text-black bg-transparent border border-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              <tr className=" text-base text-black text-center font-semibold text-lg">
                <td >Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td >${totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link to="/checkout" className=" mt-6 text-center">
          <Button className="bg-[#0BBA48] text-white ">Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
