import React, { useContext } from "react";
import { Link } from "@reach/router";
import SessionContext from "../session";
import logo from "../logo.png";

const NavbarComponent = () => {
  const session = useContext(SessionContext);

  return (
    <nav className="navbar is-primary navbar-container" role="navigation">
      <div className="navbar-brand ml-2 image is-64x64">
          <img src={logo}/>
      </div>

      {session && session.email !== "" && (
        <div className="navbar-end mr-2">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{session.email}</a>
            <div className="navbar-dropdown">
              <Link to="/search" className="navbar-item">
                Search
              </Link>
              <Link to="/history" className="navbar-item">
                History
              </Link>
              <Link to="/signout" className="navbar-item">
                Signout
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
