// src/LoginForm.js
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // OAuth login with Discord
  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    if (error) {
      console.error("OAuth login error:", error.message);
      setErrorMessage("Failed to login with Discord");
    }
  };

  // Login with email and password
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage("")}>
            {errorMessage}
          </Alert>
        )}

        <Button
          onClick={handleOAuthLogin}
          className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700"
        >
          Login with Discord
        </Button>

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email" value="Your Email" className="text-sm" />
            <TextInput
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              shadow
              className="mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              value="Your Password"
              className="text-sm"
            />
            <TextInput
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
