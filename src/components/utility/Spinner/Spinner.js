import React from "react";
import icon from "./spinner.svg";
import "./spinner.css";

const Spinner = () => {
  return (
    <div>
      <img src={icon} alt="" className="spinner" />
    </div>
  );
};

export default Spinner;
