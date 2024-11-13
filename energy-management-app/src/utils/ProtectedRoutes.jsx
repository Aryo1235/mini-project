import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkUser();
  }, []);

  if (isLoading) {
    // Kamu bisa menampilkan pesan loading di sini atau null
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/loginuser" />;
};

export default ProtectedRoute;
