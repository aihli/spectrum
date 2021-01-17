import { navigate } from "@reach/router";
import React, { useEffect } from "react";

const SignoutScreen = ({ setEmail }) => {
  useEffect(() => {
    setEmail("");
    navigate("/");
  });
  return <></>;
};

export default SignoutScreen;
