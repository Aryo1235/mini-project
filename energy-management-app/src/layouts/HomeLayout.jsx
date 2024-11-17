// src/layouts/HomeLayout.jsx

import { Outlet } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";

const HomeLayout = () => {
  return (
    <div>
      <NavbarHome />

      <Outlet />
    </div>
  );
};

export default HomeLayout;
