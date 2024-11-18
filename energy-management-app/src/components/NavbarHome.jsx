import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/ServiceSupabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaHome, FaComments, FaSignOutAlt } from "react-icons/fa";
import { getDisplayName } from "../utils/ServiceSupabase/userUtils"; // Import fungsi utilitas

export default function NavbarHome() {
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  console.log(username);

  useEffect(() => {
    const getSession = async () => {
      const response = await supabase.auth.getSession();
      const session = response.data?.session;

      if (session?.user) {
        const displayName = getDisplayName(session.user); // Gunakan fungsi utilitas
        setUsername(displayName);
      }
    };

    getSession();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setUsername("");
      setIsDropdownOpen(false); // Close dropdown after logout
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Navbar
      fluid
      className="sticky top-0 shadow-md z-20 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Navbar.Brand as={Link} to="/home">
          <img src="/logo.png" className="h-8 sm:h-9 mr-2" alt="Logo" />
          <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
            Eco-Watt
          </span>
        </Navbar.Brand>

        {/* Right Side: DarkThemeToggle and Navbar.Toggle */}
        <div className="flex items-center ml-auto space-x-4">
          <DarkThemeToggle />
          <Navbar.Toggle />

          {/* Login/logout links with username beside the icon */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <Link
              to="/home"
              className="flex items-center text-sm text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
            >
              <FaHome className="mr-2" />
              Home
            </Link>
            <Link
              to="/home/chat"
              className="flex items-center text-sm text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
            >
              <FaComments className="mr-2" />
              Chat Bot
            </Link>

            <div className="flex items-center space-x-2 relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
              >
                <FaUserCircle className="w-6 h-6" />
                <span className="text-sm">{username}</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-10 -left-2 mt-2 w-36 bg-white dark:bg-gray-800 shadow-md rounded-lg py-2 z-50 ">
                  <div
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-gray-700 rounded-sm cursor-pointer"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible menu items for mobile */}
      <Navbar.Collapse className="md:hidden">
        <Link
          to="/home"
          className="flex items-center text-sm text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
        >
          <FaHome className="mr-2" />
          Home
        </Link>
        <Link
          to="/home/chat"
          className="flex items-center text-sm text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
        >
          <FaComments className="mr-2" />
          Chat Bot
        </Link>

        <div
          onClick={handleLogout}
          className="flex items-center text-sm text-red-500 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 cursor-pointer"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
