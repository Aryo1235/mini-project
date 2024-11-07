import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient"; // pastikan ini mengarah ke file supabaseClient.js
import { useNavigate } from "react-router-dom";
export default function NavbarsSupa() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize navigate
  useEffect(() => {
    // Mengambil session secara asinkron
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setUsername(session.user.email); // Mengatur username dengan email pengguna
      }
    };

    getSession(); // Panggil fungsi getSession saat komponen di-render

    // Subscribing to auth state changes
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

  // Fungsi logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setUsername(""); // Hapus username saat logout
      navigate("/loginuser"); // Redirect ke halaman login
    }
  };

  return (
    <Navbar
      fluid
      className="sticky top-0 shadow-md z-20 border-b border-gray-200 dark:border-gray-700"
    >
      <Navbar.Brand as={Link} to="/">
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
        <div className="ml-auto flex items-center space-x-4">
          {/* Menampilkan DarkThemeToggle */}
          <DarkThemeToggle />

          {/* Jika user login, tampilkan email dan tombol logout */}
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
            // Jika user belum login, tampilkan link ke halaman Login
            <Link
              to="/loginuser"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
