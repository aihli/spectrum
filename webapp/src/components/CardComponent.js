import React from "react";

const CardComponent = ({ article, children }) => {
  return (
    <div className="card mt-6">
      <header className="card-header">
        <p className="card-header-title">
          <a href={article}>Article</a>
        </p>
      </header>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default CardComponent;
