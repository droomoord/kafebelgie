import React from "react";
import "./Alert.css";

const Alert = (props) => {
  return (
    <div className="alert">
      <div className="x" onClick={props.clicked}>
        X
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: props.children,
        }}
      ></div>
    </div>
  );
};

export default Alert;
