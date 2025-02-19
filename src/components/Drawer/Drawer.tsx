import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import blackclr from "@/assets/B_rcelle__1_-removebg-preview.png";
import { Button } from "../ui/button";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { IoIosLogOut } from "react-icons/io";


const Drawer = () => {
  const [productActive, setProductActive] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <div className="drawer lg:drawer-open w-full lg:w-[20%] lg:border lg:border-black auto-cols-auto ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex items-center px-6 gap-4 w-full mb-4 lg:mb-0 py-2 lg:py-0 lg:hidden col-span-1 bg-white">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-[#0BBA48] text-white border-none outline-none drawer-button lg:hidden "
        >
          <GiHamburgerMenu />
        </label>
        <NavLink to={"/admin"}>
          <img src={blackclr} alt="" className="w-60" />
        </NavLink>
        <div className=" w-full flex items-center justify-end">
          <Button
            onClick={() => handleLogout()}
            className="bg-[#0BBA48] text-white w-fit mt-2"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="bg-slate-100 lg:bg-transparent h-full lg:w-full flex flex-col">
          <ul className="menu flex flex-col border items-start min-w-full text-black p-4 gap-1 h-full">
            <li>
              <NavLink
                to={"/admin"}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "transparent" : "transparent",
                })}
              >
                <img src={blackclr} alt="" className="w-40" />
              </NavLink>
            </li>
            <li className="w-full rounded-lg hover:bg-[#0BBA48] hover:text-white">
              <NavLink
                onClick={() => {
                  setProductActive(false);
                }}
                end
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#1C1C1C",
                  backgroundColor: isActive ? "#0BBA48" : "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                })}
                className={"hover:text-white"}
                to={"/admin"}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="w-full ">
              <details className="">
                <summary
                  className={`${
                    productActive
                      ? "bg-[#0BBA48] text-white font-bold"
                      : "bg-transparent text-[#1C1C1C] font-normal"
                  } hover:bg-[#0BBA48]`}
                >
                  Products Management
                </summary>
                <ul>
                  <li className="hover:bg-[#0BBA48] hover:text-white mt-1 rounded-lg">
                    <NavLink
                      onClick={() => {
                        setProductActive(true);
                      }}
                      style={({ isActive }) => ({
                        color: isActive ? "white" : "#1C1C1C",
                        backgroundColor: isActive ? "#0BBA48" : "transparent",
                        fontWeight: isActive ? "bold" : "normal",
                      })}
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="hover:bg-[#0BBA48] hover:text-white mt-1 rounded-lg">
                    <NavLink
                      onClick={() => {
                        setProductActive(true);
                      }}
                      to="add-product"
                      style={({ isActive }) => ({
                        color: isActive ? "white" : "#1C1C1C",
                        backgroundColor: isActive ? "#0BBA48" : "transparent",
                        fontWeight: isActive ? "bold" : "normal",
                      })}
                    >
                      Add Product
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li className="w-full rounded-lg hover:bg-[#0BBA48] hover:text-white">
              <NavLink
                onClick={() => {
                  setProductActive(false);
                }}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#1C1C1C",
                  backgroundColor: isActive ? "#0BBA48" : "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                })}
                className={"hover:text-white"}
                to="customers"
              >
                Customers
              </NavLink>
            </li>
            <li className="w-full rounded-lg hover:bg-[#0BBA48] hover:text-white">
              <NavLink
                onClick={() => {
                  setProductActive(false);
                }}
                style={({ isActive }) => ({
                  color: isActive ? "white" : "#1C1C1C",
                  backgroundColor: isActive ? "#0BBA48" : "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                })}
                className={"hover:text-white"}
                to="orders"
              >
                Orders
              </NavLink>
            </li>
            <li className="w-full rounded-lg hover:bg-[#0BBA48] hover:text-white lg:mt-auto hidden lg:block ">
              <NavLink
                onClick={() => {
                  handleLogout();
                }}
                className={"hover:text-white"}
                to="/login"
              >
                <IoIosLogOut className="text-base"/>
                Logout
              </NavLink>
            </li>           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
