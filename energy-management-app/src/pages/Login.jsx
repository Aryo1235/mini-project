import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (event) => {
    event.preventDefault();

    // Hardcoded dummy credentials
    const dummyUser = { username: "user", password: "user" };
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username === username && user.password === password) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(dummyUser));
      navigate("/"); // Redirect to home
    } else if (
      username === dummyUser.username &&
      password === dummyUser.password
    ) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      localStorage.setItem("isLoggedIn", true);
      navigate("/"); // Redirect to home
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <form
        className="flex w-full max-w-lg flex-col gap-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
        onSubmit={handleLogin}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            shadow
            helperText={
              errorMessage && (
                <span className="text-red-500">{errorMessage}</span>
              )
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            shadow
          />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
