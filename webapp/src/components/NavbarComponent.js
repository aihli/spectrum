import React from "react";
import { Link } from "@reach/router";

const NavbarComponent = () => {
  return (
    <nav className="navbar is-primary" role="navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/search">
          s
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Mm</a>
          <div className="navbar-dropdown">
            <a className="navbar-item">Profile</a>
            <a className="navbar-item">History</a>
            <a className="navbar-item">Statistics</a>
            <a className="navbar-item">Settings</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
