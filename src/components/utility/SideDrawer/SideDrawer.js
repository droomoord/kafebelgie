import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  let titles;
  if (props.titles) {
    titles = props.titles.map((title, index) => {
      return (
        <Link
          onClick={props.clicked}
          to={title.split(" ").join("-")}
          key={index}
        >
          {title}
        </Link>
      );
    });
  }
  return <div className="side-drawer">{titles}</div>;
};

export default SideDrawer;
