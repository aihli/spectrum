import React from "react";
import LoginFormComponent from "../components/LoginFormComponent";
import NavbarComponent from "../components/NavbarComponent";

const LoginScreen = ({ setEmail }) => {
  return (
    <>
      <NavbarComponent />
      <LoginFormComponent setEmail={setEmail} />
    </>
  );
};

export default LoginScreen;
