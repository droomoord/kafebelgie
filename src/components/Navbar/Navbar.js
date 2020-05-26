import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import brand from "./brand.jpg";
import Hamburger from "../utility/Hamburger/Hamburger";
import SideDrawer from "../utility/SideDrawer/SideDrawer";
import Backdrop from "../utility/Backdrop/Backdrop";

const Navbar = (props) => {
  const [sideDrawer, setSideDrawer] = useState(false);

  let titles;
  if (props.titles) {
    titles = props.titles.map((title, index) => {
      return (
        <Link
          onClick={(e) => {
            document
              .querySelectorAll("a")
              .forEach((a) => a.classList.remove("active"));
            e.target.classList.add("active");
          }}
          to={title.split(" ").join("-")}
          key={index}
        >
          {title}
        </Link>
      );
    });
  }

  const toggleSideDrawer = () => {
    setSideDrawer(!sideDrawer);
  };

  return (
    <div>
      <nav className="navbar">
        {sideDrawer ? (
          <SideDrawer
            clicked={() => toggleSideDrawer()}
            titles={props.titles}
          />
        ) : null}
        {sideDrawer ? <Backdrop clicked={() => toggleSideDrawer()} /> : null}
        <img className="brand" src={brand} alt="" />
        <Hamburger clicked={() => toggleSideDrawer()} />
        {titles}
      </nav>
    </div>
  );
};

export default Navbar;
