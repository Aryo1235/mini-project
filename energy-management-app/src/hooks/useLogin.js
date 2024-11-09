// hooks/useLogin.js
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

  // Validasi email secara langsung ketika input berubah
  const handleEmailChange = (value) => {
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Kosongkan error jika valid
    }
  };

  // Validasi password secara langsung ketika input berubah
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
    } else {
      setPasswordError(""); // Kosongkan error jika valid
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    // Cek validasi terakhir saat submit
    if (emailError || passwordError) return;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Email login error:", error.message);
      setErrorMessage("Invalid email or password");
    } else {
      navigate("/"); // Redirect ke halaman utama jika login berhasil
    }
  };

  return {
    email,
    password,
    errorMessage,
    emailError,
    passwordError,
    setErrorMessage,
    handleOAuthLogin,
    handleEmailLogin,
    handleEmailChange, // Teruskan fungsi handleEmailChange
    handlePasswordChange, // Teruskan fungsi handlePasswordChange
  };
};
