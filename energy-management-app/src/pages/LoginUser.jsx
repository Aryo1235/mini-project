// pages/LoginPage.js
import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const {
    email,
    password,
    errorMessage,
    setEmail,
    setPassword,
    setErrorMessage,
    handleOAuthLogin,
    handleEmailLogin,
  } = useLogin();

  return (
    <LoginForm
      email={email}
      password={password}
      errorMessage={errorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      setErrorMessage={setErrorMessage}
      handleOAuthLogin={handleOAuthLogin}
      handleEmailLogin={handleEmailLogin}
    />
  );
};

export default LoginPage;
