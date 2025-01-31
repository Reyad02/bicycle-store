import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import blackclr from "@/assets/B_rcelle__1_-removebg-preview.png";

interface ICustomNavLink {
  to: string;
  children: string;
}

const CustomNavLink = ({ to, children }: ICustomNavLink) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? "#0BBA48" : "#1C1C1C",
        backgroundColor: "transparent",
        fontWeight: isActive ? "bold" : "normal",
      })}
      className="text-base hover:border-b-2 border-[#0BBA48] rounded-none	 "
    >
      {children}
    </NavLink>
  );
};
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
              className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <CustomNavLink to="/">Home</CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/about">About</CustomNavLink>
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
              <CustomNavLink to="/">Home</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/about">About</CustomNavLink>
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
