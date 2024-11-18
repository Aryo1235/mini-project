import { useState } from "react";
import { supabase } from "../utils/ServiceSupabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { getRedirectURL } from "../utils/ServiceSupabase/getRedirectsURL";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isProcessing, setisProcessing] = useState(false); // State untuk isProcessing
  const navigate = useNavigate();

  console.log(email, password);

  const handleOAuthLogin = async () => {
    setisProcessing(true); // Mulai isProcessing
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: getRedirectURL("home"), // Redirect ke halaman /home setelah login berhasil
      },
    });
    setisProcessing(false); // Selesai isProcessing

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
    if (emailError || passwordError) return;

    setisProcessing(true); // Mulai isProcessing
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setisProcessing(false); // Selesai isProcessing

    if (error) {
      console.error("Email login error:", error.message);
      setErrorMessage("Invalid email or password");
    } else {
      console.log("Session data after email/password login:", data);
      navigate("/home"); // Redirect ke halaman utama jika login berhasil
    }
  };

  return {
    email,
    password,
    errorMessage,
    emailError,
    passwordError,
    isProcessing, // Sertakan isProcessing di return
    setErrorMessage,
    handleOAuthLogin,
    handleEmailLogin,
    handleEmailChange,
    handlePasswordChange,
  };
};
