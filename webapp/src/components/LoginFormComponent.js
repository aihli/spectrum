import React, { useContext, useEffect } from "react";
import { navigate } from "@reach/router";
import SessionContext from "../session";

const LoginFormComponent = ({ setEmail }) => {
  const session = useContext(SessionContext);

  useEffect(() => {
    if (session.email && session.email !== "") {
      navigate("/search");
    }
  }, [session]);

  const login = (event) => {
    event.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    setEmail(email);
  };

  return (
    <div className="is-flex is-justify-content-center is-align-items-center form-container">
      <form className="form">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input
            id="email-input"
            className="input"
            type="email"
            placeholder="abc@gmail.com"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        <label className="label mt-3">Password</label>
        <div className="control has-icons-left">
          <input
            id="password-input"
            className="input"
            type="password"
            placeholder="Password"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        <button className="button is-primary mt-6" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginFormComponent;
