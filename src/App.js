import React from "react";
import CurrencyConverter from "./component/CurrencyConverter"
import './App.css';

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>환율 변환기</h1>
      <CurrencyConverter />
    </div>
  );
}

export default App;