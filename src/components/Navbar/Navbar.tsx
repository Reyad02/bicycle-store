import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import blackclr from "@/assets/B_rcelle__1_-removebg-preview.png";
import { useEffect, useRef, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout, TUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import UserRole from "../../Constants/Role";

interface ICustomNavLink {
  to: string;
  children: string;
  onClick?: () => void;
}

export const CustomNavLink = ({ to, children, onClick }: ICustomNavLink) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? "#0BBA48" : "#1C1C1C",
        backgroundColor: "transparent",
        fontWeight: isActive ? "bold" : "normal",
      })}
      className="text-base lg:hover:border-b-2 border-[#0BBA48] rounded-none	 "
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};
const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const itemsInCart = useSelector((state: RootState) => state?.cart?.items);
  const userEmail = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isProfileDropDown, setIsProfileDropDown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  let role = "";
  if (token) {
    const decodedToken: TUser = jwtDecode(token as string);
    role = decodedToken.role;
  }

  const closeDropdown = () => {
    setIsDropDown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="navbar bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={() => setIsDropDown(!isDropDown)}
            >
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

            {isDropDown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow font-inter"
              >
                <li>
                  <CustomNavLink to="/" onClick={closeDropdown}>
                    Home
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/products" onClick={closeDropdown}>
                    Products
                  </CustomNavLink>
                </li>
                <li>
                  <CustomNavLink to="/about" onClick={closeDropdown}>
                    About
                  </CustomNavLink>
                </li>
              </ul>
            )}
          </div>
          <Link to={"/"}>
            {" "}
            <img src={blackclr} alt="" className="w-36" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-inter">
            <li>
              <CustomNavLink to="/">Home</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/products">Products</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/about">About</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/contact">Contact</CustomNavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-6">
          <Link to={"/cart"} className="text-3xl text-[#0BBA48] font-bold ">
            <div className="relative">
              <CiShoppingCart></CiShoppingCart>
              {itemsInCart?.length > 0 && (
                <div className="absolute top-0 right-0 text-xs">
                  <div className="badge badge-secondary p-0 px-1 text-xs bg-red-500 text-white">
                    {itemsInCart?.length}
                  </div>
                </div>
              )}
            </div>
          </Link>

          {userEmail ? (
            <>
              {/* <Link
                to={`/my-account`}
                className="text-3xl text-[#0BBA48] font-bold "
              >
                <CiUser></CiUser>
              </Link> */}
              <div
                ref={profileDropdownRef}
                className="dropdown dropdown-end z-40"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                  onClick={() => setIsProfileDropDown(!isProfileDropDown)}
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                {isProfileDropDown && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 font-inter shadow"
                  >
                    <li
                      onClick={() => setIsProfileDropDown(!isProfileDropDown)}
                    >
                      <Link to={"/my-profile"} className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li
                      onClick={() => setIsProfileDropDown(!isProfileDropDown)}
                    >
                      <Link to={"/my-account"}>Orders</Link>
                    </li>
                    {role === UserRole.admin && (
                      <li
                        onClick={() => setIsProfileDropDown(!isProfileDropDown)}
                      >
                        <Link to={"/admin"}>Admin</Link>
                      </li>
                    )}
                  </ul>
                )}
              </div>
              <Button
                onClick={() => handleLogout()}
                className="bg-[#0BBA48] text-white w-fit mt-2"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to={"/login"}>
              <Button className="bg-[#0BBA48] text-white w-fit mt-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
