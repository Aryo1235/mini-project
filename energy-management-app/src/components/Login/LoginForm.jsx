import { Button, Label, TextInput, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { RiDiscordFill } from "react-icons/ri";

const LoginForm = ({
  email,
  password,
  errorMessage,
  emailError,
  passwordError,
  isProcessing,
  setErrorMessage,
  handleOAuthLogin,
  handleEmailLogin,
  handleEmailChange,
  handlePasswordChange,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-full max-w-xl p-10 pb-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="container max-w-sm">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-10">
            Login to Your Account
          </h2>

          {errorMessage && (
            <Alert color="failure" onDismiss={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}

          <Button
            size="lg"
            gradientMonochrome="purple"
            onClick={handleOAuthLogin}
            isProcessing={isProcessing}
            disabled={isProcessing} // Tombol disabled saat isProcessing
            className="w-full mb-4 flex items-center justify-center gap-2"
          >
            <RiDiscordFill size={26} className="mr-2" />
            <span>Login with Discord</span>
          </Button>

          <div className="text-gray-500 flex items-center p-4">
            <hr className="w-full border-gray-300 dark:border-gray-700 mx-3" />
            <span>or</span>
            <hr className="w-full border-gray-300 dark:border-gray-700 mx-3" />
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" value="Your Email" className="text-sm" />
              <TextInput
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                shadow
                className="mt-1"
                disabled={isProcessing} // Nonaktifkan input saat isProcessing
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
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
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                shadow
                className="mt-1"
                disabled={isProcessing} // Nonaktifkan input saat isProcessing
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            <Button
              size="lg"
              type="submit"
              gradientMonochrome="cyan"
              isProcessing={isProcessing} // Indikator isProcessing untuk tombol submit
              disabled={isProcessing} // Nonaktifkan tombol saat isProcessing
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-cyan-500 hover:underline dark:text-cyan-400"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
