import React from "react";

const SearchComponent = () => {
  return (
    <div className="is-flex is-justify-content-center is-align-items-center form-container">
      <div className="form is-flex is-flex-direction-column is-align-items-center">
        <input
          className="input is-primary is-rounded"
          type="url"
          placeholder="What article do you want to find opposing viewpoints for?"
        />
        <button className="button is-primary mt-2">Search</button>
      </div>
    </div>
  );
};

export default SearchComponent;
