import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  CartItem,
  removeAllFromCart,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useMakeOrderMutation } from "../../redux/features/order/orderApi";
import { ToastContainer, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../types/error.type";

const Cart = () => {
  const itemsInCart = useSelector((state: RootState) => state?.cart?.items);
  const totalPrice = useSelector((state: RootState) => state?.cart?.totalPrice);
  const token = useSelector((state: RootState) => state.auth.token);
  const userEmail = useSelector((state: RootState) => state.auth.user);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [makeOrder] = useMakeOrderMutation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const deleteItem = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const clearCart = () => {
    dispatch(removeAllFromCart());
  };

  const handleCheckOut = async () => {
    if (!token || !userEmail) {
      // console.log(location.pathname);
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const payload = {
      user: userId,
      status: "Pending",
      paymentStatus: "Unpaid",
      items: itemsInCart?.map((item) => ({
        bicycle: item.id,
        quantity: Number(item.quantity),
      })),
    };

    const isFetchBaseQueryError = (
      error: unknown
    ): error is FetchBaseQueryError => {
      return typeof error === "object" && error !== null && "data" in error;
    };

    const res = await makeOrder(payload);
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
    }
    const paymentUrl = res?.data?.data?.response?.GatewayPageURL;
    // const orderId = res?.data?.data?.insertedOrder?._id;

    if (paymentUrl) {
      if (paymentUrl === "https://bicycle-store-nine-flame.vercel.app/cart") {
        navigate(paymentUrl);
      } else {
        window.location.href = paymentUrl;
      }
    }
  };

  return (
    <div className="bg-[#F5F5F5] font-inter">
      <ToastContainer />
      {itemsInCart.length > 0 ? (
        <div className="flex flex-col max-w-7xl py-6  mx-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className=" text-base text-black text-center">
                  <th></th>
                  <th className="font-orbitron">Name</th>
                  <th className="font-orbitron">Quantity</th>
                  <th className="font-orbitron">Unit Price</th>
                  <th className="font-orbitron">Total Price</th>
                  <th>
                    <Button
                      onClick={clearCart}
                      className="text-black bg-transparent border border-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                      Clear Cart
                    </Button>
                  </th>
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
                <tr className=" font-orbitron text-black text-center font-semibold text-lg">
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>${Number(totalPrice).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-8">
            <Button
              onClick={handleCheckOut}
              className="bg-[#0BBA48] text-white w-fit "
            >
              Order Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <h2 className="text-xl font-semibold text-gray-600">
            Your cart is empty!
          </h2>
          <Link
            to="/products"
            className="mt-4 bg-[#0BBA48] text-white px-4 py-2 rounded"
          >
            Go to Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
