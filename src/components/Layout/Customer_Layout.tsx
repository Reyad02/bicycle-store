import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Customer_Layout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white">
        <Navbar />
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Customer_Layout;
