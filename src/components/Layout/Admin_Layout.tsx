import { Outlet } from "react-router-dom";
import Footer from "../../pages/Home/Footer/Footer";
import Drawer from "../Drawer/Drawer";

const Admin_Layout = () => {
  return (
    <>
      <div className="bg-[#F5F5F5] ">
        <div className="max-w-7xl mx-auto pt-0 lg:pt-8 pb-10 flex flex-col lg:flex-row justify-between">
          <Drawer></Drawer>
          <div className="w-full lg:w-[75%] px-4 lg:px-0 mx-auto">
            <Outlet></Outlet>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Admin_Layout;
