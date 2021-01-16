import "./App.scss";
import { Router } from "@reach/router";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import ResultsScreen from "./screens/ResultsScreen";

function App() {
  return (
    <Router className="main">
      <LoginScreen path="/" />
      <SearchScreen path="/search" />
      <ResultsScreen path="/results" />
    </Router>
  );
}

export default App;
