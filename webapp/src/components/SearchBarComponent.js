import React from "react";

const SearchBarComponent = ({ setSearch }) => {
  return (
    <input
      className="input is-primary is-rounded"
      type="url"
      placeholder="What article do you want to find opposing viewpoints for?"
      onChange={(event) => {
        setSearch(event.target.value);
      }}
    />
  );
};

export default SearchBarComponent;
