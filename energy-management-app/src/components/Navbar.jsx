"use client";

import { Link } from "react-router-dom";
import { Navbar } from "flowbite-react";

export default function Navbars() {
  return (
    <Navbar fluid rounded className="sticky top-0 shadow-md z-20">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
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
        <Navbar.Link></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
