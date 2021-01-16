import React from "react";

const LoginFormComponent = () => {
  return (
    <div className="is-flex is-justify-content-center is-align-content-center">
      <div className="form">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input className="input" type="email" placeholder="abc@gmail.com" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input className="input" type="password" placeholder="Password" />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginFormComponent;
