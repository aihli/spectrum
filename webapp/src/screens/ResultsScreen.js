import React, { useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import CardComponent from "../components/CardComponent";

const ResultsScreen = ({ location }) => {
  useEffect(() => {
    if (location && location.state) {
      console.log(location.state.search);
      const article = location.state.search;
    }
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center form-container">
        <div className="cards">
          <CardComponent
            article={
              "https://www.cbc.ca/news/politics/american-capitol-hill-violence-wherry-1.5873775"
            }
            alignment={5}
          />
          <CardComponent alignment={0} />
        </div>
      </div>
    </>
  );
};

export default ResultsScreen;
