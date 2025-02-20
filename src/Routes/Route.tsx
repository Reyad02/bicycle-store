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
import Contact from "../pages/Contact/Contact";
import Admin_Home from "../pages/Admin/Admin_Home/Admin_Home";
import Admin_Order from "../pages/Admin/Admin_Order/Admin_Order";
import Admin_Layout from "../components/Layout/Admin_Layout";
import AdminPrivateRoute from "./AdminPrivaterRoute";
import Admin_Poducts from "../pages/Admin/Admin_Poducts/Admin_Poducts";
import Add_Product from "../pages/Admin/Add_Product/Add_Product";
import Customers from "../pages/Admin/Customers/Customers";
import Registration from "../pages/Registration/Registration";
import Profile from "../pages/Profile/Profile";

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
        path: "/sign-up",
        element: <Registration />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin_Layout />,
    children: [
      {
        path: "/admin",
        element: (
          <AdminPrivateRoute>
            <Admin_Home />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <AdminPrivateRoute>
            <Admin_Poducts />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/admin/add-product",
        element: (
          <AdminPrivateRoute>
            <Add_Product />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/admin/customers",
        element: (
          <AdminPrivateRoute>
            <Customers />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/admin/products/product-id/:id",
        element: (
          <AdminPrivateRoute>
            <SingleProduct />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminPrivateRoute>
            <Admin_Order />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
