// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          Energy Manager
        </Link>
        <div>
          <Link to="/" className="text-white mr-4 hover:text-blue-200">
            Home
          </Link>
          <Link to="/add" className="text-white hover:text-blue-200">
            Add Energy
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
