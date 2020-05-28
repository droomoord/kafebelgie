import React from "react";
import "./Social.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Social = () => {
  return (
    <div className="social">
      <a
        id="facebook"
        href="https://www.facebook.com/KafeBelgie"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook />
      </a>
      <a
        id="insta"
        href="https://www.instagram.com/kafebelgie"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      <a
        id="email"
        href="mailto:info@kafebelgie.nl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaEnvelope />
      </a>
    </div>
  );
};

export default Social;
