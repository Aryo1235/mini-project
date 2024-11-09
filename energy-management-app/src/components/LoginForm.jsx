// components/LoginUser.js
import { Button, Label, TextInput, Alert } from "flowbite-react";

const LoginForm = ({
  email,
  password,
  errorMessage,
  setEmail,
  setPassword,
  setErrorMessage,
  handleOAuthLogin,
  handleEmailLogin,
}) => {
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

export default LoginForm;
