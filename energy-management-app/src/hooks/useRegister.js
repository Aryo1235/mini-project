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
  const [isProcessing, setisProcessing] = useState(false); // Tambahkan state isProcessing
  const [showToast, setShowToast] = useState(false); // Tambahkan state showToast
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

    setisProcessing(true); // Set isProcessing saat proses registrasi dimulai

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName, // Kirim displayName sebagai bagian dari metadata
        },
      },
    });

    setisProcessing(false); // Reset isProcessing setelah proses selesai

    if (error) {
      console.error("Registration error:", error.message);
      setErrorMessage(error.message);
    } else {
      // Panggil Toast Notification di komponen
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false); // Sembunyikan toast setelah beberapa detik
        navigate("/login");
      }, 3000); // 3 detik sebelum pindah ke halaman login
    }
  };

  return {
    email,
    password,
    displayName,
    errorMessage,
    emailError,
    passwordError,
    isProcessing, // Tambahkan state isProcessing
    showToast, // Tambahkan state showToast
    setErrorMessage,
    handleRegister,
    handleEmailChange,
    handlePasswordChange,
    handleDisplayNameChange,
  };
};
