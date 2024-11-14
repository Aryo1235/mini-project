import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function NavbarsSupa() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setUsername(session.user.email);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setUsername(session.user.email);
        } else {
          setUsername("");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setUsername("");
      navigate("/loginuser");
    }
  };

  return (
    <Navbar
      fluid
      className="sticky top-0 shadow-md z-20 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          <img src="./public/logo.png" className="h-8 sm:h-9 mr-2" alt="Logo" />
          <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
            Eco-Watt
          </span>
        </Navbar.Brand>

        {/* Right Side: DarkThemeToggle and Navbar.Toggle */}
        <div className="flex items-center ml-auto space-x-4">
          <DarkThemeToggle />
          <Navbar.Toggle />

          {/* Login/logout links for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/chat"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Chat Bot
            </Link>
            {username ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/loginuser"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible menu items for mobile */}
      <Navbar.Collapse className="md:hidden">
        {username ? (
          <>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline dark:text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/loginuser"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
