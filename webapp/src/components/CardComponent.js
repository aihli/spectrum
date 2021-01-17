import React from "react";

const CardComponent = ({ article, alignment }) => {
  return (
    <div className="card mt-6">
      <header className="card-header">
        <p className="card-header-title">
          <a href={article}>Article</a>
        </p>
      </header>
      <div className="card-content">
        <div className="is-flex is-justify-content-center">
          <div className="dark-blue-box" />
          <div className="blue-box" />
          <div className="light-blue-box" />
          <div className="neutral-box" />
          <div className="light-red-box" />
          <div className="red-box" />
          <div className="dark-red-box" />
        </div>
        <span class={`icon mv-arrow-${alignment}`}>
          <i class="fas fa-arrow-up"></i>
        </span>
      </div>
    </div>
  );
};

export default CardComponent;
