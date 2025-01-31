import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import blackclr from "@/assets/B_rcelle__1_-removebg-preview.png";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/about"}>About</NavLink>
              </li>
            </ul>
          </div>
          <Link to={"/"}>
            {" "}
            <img src={blackclr} alt="" className="w-36" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to={"/"}
                style={({ isActive }) => ({
                  color: isActive ? "#0BBA48" : "#1C1C1C",
                  backgroundColor: "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                style={({ isActive }) => ({
                  color: isActive ? "#0BBA48" : "#1C1C1C",
                  backgroundColor: "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
