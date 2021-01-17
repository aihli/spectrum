import React, { useEffect, useState, useContext } from "react";
import SessionContext from "../session";
import { url } from "../constants";
import NavbarComponent from "../components/NavbarComponent";
import CardComponent from "../components/CardComponent";

const ResultsScreen = ({ location }) => {
  const [cards, setCards] = useState(null);
  const session = useContext(SessionContext);
  useEffect(() => {
    if (location && location.state) {
      console.log(location.state.search);
      const article = location.state.search;
      const formData = new FormData();
      formData.append("email", session.email);
      formData.append("article", article);
      fetch(`${url}/getRebuttalArticles/`, {
        method: "POST",
        mode: "cors",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const cardsArray = [];
          for (let rebuttal of data.rebuttals) {
            console.log(rebuttal);
            let alignment;
            switch (rebuttal.leaning) {
              case "extreme_left":
                alignment = 0;
                break;
              case "left":
                alignment = 1;
                break;
              case "center_left":
                alignment = 2;
                break;
              case "neutral":
                alignment = 3;
                break;
              case "center_right":
                alignment = 4;
                break;
              case "right":
                alignment = 5;
                break;
              default:
                alignment = 6;
            }
            cardsArray.push(
              <CardComponent
                article={rebuttal.url}
                title={rebuttal.title}
                alignment={alignment}
                sentiment={rebuttal.sentimentScore}
              />
            );
          }
          setCards(cardsArray);
        });
    }
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center form-container">
        <div className="cards">{cards}</div>
      </div>
    </>
  );
};

export default ResultsScreen;
