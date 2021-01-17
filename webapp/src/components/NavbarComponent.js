import React, { useContext } from "react";
import { Link } from "@reach/router";
import SessionContext from "../session";

const NavbarComponent = () => {
  const session = useContext(SessionContext);

  return (
    <nav className="navbar is-primary" role="navigation">
      <div className="navbar-brand ml-2">
        <Link className="navbar-item" to="/search">
          s
        </Link>
      </div>

      {session && session.email !== "" && (
        <div className="navbar-end mr-2">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Mm</a>
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
