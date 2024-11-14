// pages/LoginPage.js
import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginUser = () => {
  const {
    email,
    password,
    errorMessage,
    emailError, // Menyertakan error email untuk validasi
    passwordError, // Menyertakan error password untuk validasi
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
      handleOAuthLogin={handleOAuthLogin}
      handleEmailLogin={handleEmailLogin}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      setErrorMessage={setErrorMessage}
    />
  );
};

export default LoginUser;
