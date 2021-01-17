import React, { useEffect, useState } from "react";

const HistoryCardComponent = ({ article, rebuttals }) => {
  const [rebuttalsArray, setRebuttalsArray] = useState(null);
  useEffect(() => {
    const tempArray = [];
    for (const rebuttal of rebuttals) {
      tempArray.push(<a href={rebuttal}>{rebuttal}</a>);
    }
    setRebuttalsArray(tempArray);
  }, []);
  return (
    <div className="card mt-6">
      <header className="card-header">
        <p className="card-header-title">
          You searched for this&nbsp;<a href={article}>article</a>:
        </p>
      </header>
      <div className="card-content is-flex is-flex-direction-column">
        The following search results were given:
        {rebuttalsArray}
      </div>
    </div>
  );
};

export default HistoryCardComponent;
