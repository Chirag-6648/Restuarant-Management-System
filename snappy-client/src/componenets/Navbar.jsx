import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const { cart, refetch } = useCart();
  // console.log(cart);

  const [isSticky, setisSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setisSticky(true);
      } else {
        setisSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a className="text-white hover:bg-yellow" href="/">
          Home
        </a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="text-white hover:bg-yellow">Menu</summary>
          <ul className="p-2 bg-gray-950">
            <li>
              <a href="/menu" className="text-white hover:bg-yellow">
                All
              </a>
            </li>
            <li>
              <a className="text-white hover:bg-yellow" href="/menu">
                Salad
              </a>
            </li>
            <li>
              <a className="text-white hover:bg-yellow" href="/menu">
                Pizza
              </a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="text-white hover:bg-yellow">Services</summary>
          <ul className="p-2 bg-gray-950">
            <li>
              <a className="text-white hover:bg-yellow">Online Order</a>
            </li>
            <li>
              <a className="text-white hover:bg-yellow">Table Booking</a>
            </li>
            <li>
              <a className="text-white hover:bg-yellow">Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a className="text-white hover:bg-yellow">Offers</a>
      </li>
    </>
  );
  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}>
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-gray-950 transition-all duration-300 ease-in-out p-4"
            : ""
        }`}>
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3">
              {navItems}
            </ul>
          </div>
          <a href="" className="text-kg text-yellow font-bold sm:text-4xl">
            Snappy Snackes
          </a>
          {/* <img src={logo} alt="" className="w-[270px] h-[80px]" /> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end ">
          <button className="btn btn-ghost btn-circle hidden lg:flex text-white hover:bg-yellow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* cart items */}
          <Link to="cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle hidden lg:flex items-center justify-center mr-3 text-white hover:bg-yellow">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </label>
          </Link>
          {/* login btn */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white bg-yellow">
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
