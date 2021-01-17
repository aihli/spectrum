import React, { useState } from "react";
import { Link } from "@reach/router";
import NavbarComponent from "../components/NavbarComponent";
import SearchBarComponent from "../components/SearchBarComponent";

const SearchScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <NavbarComponent />
      <div className="is-flex is-justify-content-center is-align-items-center form-container">
        <div className="form is-flex is-flex-direction-column is-align-items-center">
          <SearchBarComponent setSearch={setSearch} />
          <button className="button is-primary mt-2 is-rounded">
            <Link to="/results" state={{ search: search }}>
              Search
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
