// pages/RegisterPage.js
import RegisterForm from "../components/Register/RegisterForm";
import { useRegister } from "../hooks/useRegister";
import ToastNotification from "../components/ToastNotification";
const RegisterPage = () => {
  const {
    email,
    password,
    displayName,
    errorMessage,
    emailError,
    passwordError,
    showToast,
    setErrorMessage,
    handleRegister,
    handleEmailChange,
    handlePasswordChange,
    handleDisplayNameChange,
  } = useRegister();

  return (
    <>
      <RegisterForm
        email={email}
        password={password}
        displayName={displayName}
        errorMessage={errorMessage}
        emailError={emailError}
        passwordError={passwordError}
        showToast={showToast}
        setErrorMessage={setErrorMessage}
        handleRegister={handleRegister}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleDisplayNameChange={handleDisplayNameChange}
      />
    </>
  );
};

export default RegisterPage;
