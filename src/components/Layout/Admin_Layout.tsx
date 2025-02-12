import { Outlet } from "react-router-dom";
import Footer from "../../pages/Home/Footer/Footer";
import Drawer from "../Drawer/Drawer";
import Navbar from "../Navbar/Navbar";

const Admin_Layout = () => {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="bg-[#F5F5F5] ">
        <div className="max-w-7xl mx-auto  py-10 flex justify-between">
          <Drawer></Drawer>
          <div className="w-[75%] mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Admin_Layout;
