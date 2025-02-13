import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Drawer = () => {
  const [productActive, setProductActive] = useState(false);
  // const [userActive, setUserActive] = useState(false);

  return (
    <div className="drawer lg:drawer-open w-fit lg:w-[20%] lg:border lg:border-black auto-cols-auto ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start  pl-2  lg:hidden col-span-1	">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-[#0BBA48] text-white border-none outline-none drawer-button lg:hidden "
        >
          <GiHamburgerMenu />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="bg-slate-100 lg:bg-transparent h-full lg:w-full ">
          <ul className="menu items-center min-w-full text-black  p-4 gap-1">
            <li className="w-full ">
              <details className="">
                <summary className={`${productActive ? "bg-[#0BBA48] text-white font-bold":"bg-transparent text-[#1C1C1C] font-normal"} hover:bg-[#0BBA48]`}>Products Management</summary>
                <ul>
                  <li className="hover:bg-[#0BBA48] hover:text-white mt-1 rounded-lg">
                    <NavLink
                      onClick={() => {
                        setProductActive(true);
                        // setUserActive(false);
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
                        // setUserActive(false);
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
                  // setUserActive(true);
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
