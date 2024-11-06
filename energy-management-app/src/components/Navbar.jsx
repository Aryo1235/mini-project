// src/components/Navbar.js

import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";

export default function Navbars() {
  return (
    <Navbar
      fluid
      className="sticky top-0 shadow-md z-20 border-b border-gray-200 dark:border-gray-700"
    >
      <Navbar.Brand as={Link} to="/">
        {" "}
        {/* Ubah href menjadi to untuk Link React Router */}
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {/* Link Navigasi */}
        <Navbar.Link as={Link} to="/" active={window.location.pathname === "/"}>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/landing">
          Landing
        </Navbar.Link>
        <Navbar.Link as={Link} to="/add">
          Add
        </Navbar.Link>

        {/* DarkThemeToggle di navbar */}
        <div className="ml-auto">
          <DarkThemeToggle />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
