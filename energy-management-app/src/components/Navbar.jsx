import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Navbars() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  return (
    <Navbar
      fluid
      className="sticky top-0 shadow-md z-20 border-b border-gray-200 dark:border-gray-700"
    >
      <Navbar.Brand as={Link} to="/home">
        <img src="./public/logo.png" className="mr-1 h-9 sm:h-9 " alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Eco-Watt
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {/* Username Display */}
        {username && (
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-200">
              Hello, {username}
            </span>
            <DarkThemeToggle />
          </div>
        )}

        {/* DarkThemeToggle if no user */}
        {!username && (
          <div className="ml-auto">
            <DarkThemeToggle />
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
