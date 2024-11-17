// src/layouts/LandingLayout.jsx

import { Outlet } from "react-router-dom";

import NavbarLanding from "../components/LandingPage/NavbarLanding";

const LandingLayout = () => {
  return (
    <div>
      <NavbarLanding />

      <Outlet />
    </div>
  );
};

export default LandingLayout;
