import blackclr from "@/assets/B_rcelle__3_-removebg-preview.png";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#222222] text-[#d9d9d9]">
      <footer className="footer  p-10 text-base ">
        <aside>
          <Link to={"/"}>
            <img src={blackclr} alt="" className="w-36" />
          </Link>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
          <div className="flex gap-4 items-center mt-2 text-lg">
            <FaFacebookF className="hover:text-[#0BBA48] link" />
            <FaXTwitter className="hover:text-[#0BBA48] link" />
            <FaInstagram className="hover:text-[#0BBA48] link" />
            <FaTiktok className="hover:text-[#0BBA48] link" />
          </div>
        </aside>
        <nav className="">
          <h6 className="footer-title ">Services</h6>
          <a className="link link-hover hover:text-[#0BBA48]">Branding</a>
          <a className="link link-hover hover:text-[#0BBA48]">Design</a>
          <a className="link link-hover hover:text-[#0BBA48]">Marketing</a>
          <a className="link link-hover hover:text-[#0BBA48]">Advertisement</a>
        </nav>
        <nav className="">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover hover:text-[#0BBA48]">About us</a>
          <a className="link link-hover hover:text-[#0BBA48]">Contact</a>
          <a className="link link-hover hover:text-[#0BBA48]">Jobs</a>
          <a className="link link-hover hover:text-[#0BBA48]">Press kit</a>
        </nav>
        <nav className="">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover hover:text-[#0BBA48]">Terms of use</a>
          <a className="link link-hover hover:text-[#0BBA48]">Privacy policy</a>
          <a className="link link-hover hover:text-[#0BBA48]">Cookie policy</a>
        </nav>
      </footer>
      <hr />
      <footer className="footer footer-center bg-[#222222] text-[#d9d9d9] p-4 text-base">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Al-Momen Reyad
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
