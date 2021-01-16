import React from "react";

const LoginFormComponent = () => {
  return (
    <div className="is-flex is-justify-content-center is-align-items-center form-container">
      <div className="form">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input className="input" type="email" placeholder="abc@gmail.com" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        <label className="label mt-3">Password</label>
        <div className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        <button className="button is-primary mt-6">Login</button>
      </div>
    </div>
  );
};

export default LoginFormComponent;
