import { createBrowserRouter } from "react-router-dom";
import Customer_Layout from "../components/Layout/Customer_Layout";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import SingleProduct from "../pages/Products/SingleProduct";
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import Payment_Success from "../pages/Payment_Success/Payment_Success";
import Payment_Failed from "../pages/Payment_Failed/Payment_Failed";
import MyOrders from "../pages/MyOrders/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Customer_Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders/success",
        element: (
          <PrivateRoute>
            <Payment_Success />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders/fail",
        element: (
          <PrivateRoute>
            <Payment_Failed />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-account",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
