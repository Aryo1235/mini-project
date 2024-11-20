import { Button, Label, TextInput, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import ToastNotification from "../ToastNotification";

const RegisterForm = ({
  email,
  password,
  displayName,
  errorMessage,
  emailError,
  passwordError,
  isProcessing,
  showToast,
  setErrorMessage,
  handleRegister,
  handleEmailChange,
  handlePasswordChange,
  handleDisplayNameChange,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-full max-w-xl p-10 pb-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="container max-w-sm">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-10">
            Create an Account
          </h2>

          {/* Display Error Message */}
          {errorMessage && (
            <Alert color="failure" onDismiss={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Display Name Input */}
            <div>
              <Label
                htmlFor="displayName"
                value="Display Name"
                className="text-sm"
              />
              <TextInput
                id="displayName"
                type="text"
                placeholder="Your display name"
                value={displayName}
                onChange={(e) => handleDisplayNameChange(e.target.value)}
                required
                shadow
                className="mt-1"
              />
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email" value="Your Email" className="text-sm" />
              <TextInput
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                shadow
                className="mt-1"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                shadow
                className="mt-1"
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {/* Register Button */}
            <Button
              size="lg"
              type="submit"
              gradientMonochrome="cyan"
              disabled={isProcessing} // Disable button while processing
            >
              {isProcessing ? "Processing..." : "Register"}
            </Button>
          </form>

          {/* Redirect to Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-500 hover:underline dark:text-cyan-400"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Toast Notification */}
          {showToast && <ToastNotification message="Registration Successful!" />}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
