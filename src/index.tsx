import React from "react";
import ReactDOM from "react-dom";
import Clock from "./Clock";
import "./style.css";

ReactDOM.render(

    <div>
        <h1>International Clocks</h1>
        <div className={"container"}>
            <Clock city={"Sydney"} />
            <Clock city={"Perth"} />
            <Clock city={"New York"} />
            <Clock city={"London"} />
            <Clock city={"Melbourne"} />
            <Clock city={"Wuhan"} />
            <Clock city={"Milan"} />
        </div>
    </div>,
  document.querySelector("#root")
);
