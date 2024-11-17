import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { FaSignInAlt } from "react-icons/fa";

export default function NavbarLanding() {
  return (
    <Navbar
      fluid
      className="sticky top-0 shadow-md z-20 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          <img src="/logo.png" className="h-8 sm:h-9 mr-2" alt="Logo" />
          <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
            Eco-Watt
          </span>
        </Navbar.Brand>

        {/* Right Side: DarkThemeToggle and Navbar.Toggle */}
        <div className="flex items-center ml-auto space-x-4">
          <DarkThemeToggle /> {/* Dark Mode Toggle */}
          {/* Login Button for Desktop and Mobile */}
          <Link to="/login">
            <div className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md dark:bg-green-500 dark:hover:bg-green-600">
              <FaSignInAlt className="mr-2" />
              Login
            </div>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
