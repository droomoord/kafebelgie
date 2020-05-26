import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div onClick={props.clicked} className="backdrop"></div>;
};

export default Backdrop;
