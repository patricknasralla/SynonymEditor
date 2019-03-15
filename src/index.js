import React from "react";
import ReactDOM from "react-dom";
import SynonymEditor from "./SynonymEditor";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <SynonymEditor />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
