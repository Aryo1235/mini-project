import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient"; // Adjust this path as needed

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (isRegistering) {
      // Register new user
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage(
          "Registration successful! Please check your email to confirm your account."
        );
      }
    } else {
      // Log in existing user
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Login successful!");
        // Redirect to dashboard or another page
        // window.location.href = "/dashboard";
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col gap-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
          {isRegistering ? "Register New Account" : "Login"}
        </h2>

        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            shadow
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">
          {isRegistering ? "Register New Account" : "Log In"}
        </Button>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegistering(false)}
                className="text-cyan-600 cursor-pointer hover:underline dark:text-cyan-500"
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Dont have an account?{" "}
              <span
                onClick={() => setIsRegistering(true)}
                className="text-cyan-600 cursor-pointer hover:underline dark:text-cyan-500"
              >
                Register
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
