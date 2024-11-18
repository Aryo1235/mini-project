// pages/LoginPage.js
import LoginForm from "../components/Login/LoginForm";
import ToastNotification from "../components/ToastNotification";
import { useLogin } from "../hooks/useLogin";

const LoginUser = () => {
  const {
    email,
    password,
    errorMessage,
    emailError, // Menyertakan error email untuk validasi
    passwordError, // Menyertakan error password untuk validasi
    isProcessing, // Menyertakan status loading,
    showToast,
    setErrorMessage,
    handleOAuthLogin,
    handleEmailLogin,
    handleEmailChange, // Tambahkan fungsi handleEmailChange
    handlePasswordChange, // Tambahkan fungsi handlePasswordChange
  } = useLogin();

  return (
    <LoginForm
      email={email}
      password={password}
      errorMessage={errorMessage}
      emailError={emailError}
      passwordError={passwordError}
      isProcessing={isProcessing}
      handleOAuthLogin={handleOAuthLogin}
      handleEmailLogin={handleEmailLogin}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      setErrorMessage={setErrorMessage}
    />
  );
};

export default LoginUser;
