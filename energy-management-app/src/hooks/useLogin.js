// hooks/useLogin.js
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    if (error) {
      console.error("OAuth login error:", error.message);
      setErrorMessage("Failed to login with Discord");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Email login error:", error.message);
      setErrorMessage("Invalid email or password");
    } else {
      navigate("/"); // Redirect to home page on successful login
    }
  };

  return {
    email,
    password,
    errorMessage,
    setEmail,
    setPassword,
    setErrorMessage,
    handleOAuthLogin,
    handleEmailLogin,
  };
};
