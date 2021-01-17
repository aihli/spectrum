import React, { useState } from "react";
import "./App.scss";
import { Router } from "@reach/router";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import ResultsScreen from "./screens/ResultsScreen";
import SessionContext from "./session";

function App() {
  const [email, setEmail] = useState("");

  return (
    <SessionContext.Provider value={{ email: email }}>
      <Router className="main">
        <LoginScreen path="/" setEmail={setEmail} default />
        <SearchScreen path="/search" />
        <ResultsScreen path="/results" />
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
