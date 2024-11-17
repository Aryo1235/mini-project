// hooks/useRegister.js
import { useState } from "react";
import { supabase } from "../utils/ServiceSupabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // Display Name
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Reset error jika valid
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length < 5) {
      setPasswordError("Password must be at least 5 characters long.");
    } else {
      setPasswordError(""); // Reset error jika valid
    }
  };

  const handleDisplayNameChange = (value) => {
    setDisplayName(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi input sebelum submit
    if (emailError || passwordError || !displayName) {
      setErrorMessage("All fields must be filled correctly.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName, // Kirim displayName sebagai bagian dari metadata
        },
      },
    });

    if (error) {
      console.error("Registration error:", error.message);
      setErrorMessage("Failed to register. Please try again.");
    } else {
      navigate("/login"); // Redirect ke halaman login
    }
  };

  return {
    email,
    password,
    displayName,
    errorMessage,
    emailError,
    passwordError,
    setErrorMessage,
    handleRegister,
    handleEmailChange,
    handlePasswordChange,
    handleDisplayNameChange,
  };
};
