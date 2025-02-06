// import React from 'react';
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";

export const Layout = () => {
  return (
    <div>
      navbar
      <ToastContainer/>
      
     <Outlet/>
    </div>
  );
};

