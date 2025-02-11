import {  Outlet } from "react-router-dom";
import Footer from "../../pages/Home/Footer/Footer";
import Drawer from "../Drawer/Drawer";

const Admin_Layout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white flex">
        <Drawer></Drawer>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Admin_Layout;
