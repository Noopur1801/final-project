import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "../Pages/Footer";
import { Navbar } from "react-bootstrap";

const Layout = () => {
  const location = useLocation();

  // Array of paths where footer should be rendered
  const showFooterPaths = ["/home", "/collections", "/contactus", "/aboutus"];

  // Function to check if current path should show footer
  const shouldShowFooter = showFooterPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default Layout;
