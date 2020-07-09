import React from "react";
import "./App.css";
import Departments from "./components/departments";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Departments />
      </div>
    </React.Fragment>
  );
}

export default App;
