import React, { useEffect, useContext, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import HistoryCardComponent from "../components/HistoryCardComponent";
import SessionContext from "../session";
import { url } from "../constants";

const HistoryScreen = () => {
  const session = useContext(SessionContext);
  const [history, setHistory] = useState(null);
  useEffect(() => {
    const formData = new FormData();
    formData.append("username", session.email);
    fetch(`${url}/history/`, {
      method: "POST",
      mode: "cors",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const historyArray = [];
        for (let historyPoint of data.history) {
          historyArray.push(
            <HistoryCardComponent
              article={historyPoint.article}
              rebuttals={historyPoint.rebuttals}
            />
          );
        }
        setHistory(historyArray);
      });
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className="flex-container is-flex is-justify-content-center">
        <div className="form">{history}</div>
      </div>
    </>
  );
};

export default HistoryScreen;
