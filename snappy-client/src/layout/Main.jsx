import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../../src/App.css";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../componenets/LoadingSpinner";

const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="bg-gray-900">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
