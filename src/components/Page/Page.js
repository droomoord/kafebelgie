import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import scrollTop from "../functions/scrollTop";
import "./Page.css";
import Spinner from "../utility/Spinner/Spinner";
import ArrowDown from "../utility/ArrowDown/ArrowDown";
import Alert from "../utility/Alert/Alert";
import Social from "../Social/Social";
// ???
import { useInView } from "react-intersection-observer";
// ???

const Page = (props) => {
  const { pageID } = props;

  const [state, setstate] = useState({
    api: {},
    dataHasLoaded: false,
  });

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    scrollTop();
    const getData = async () => {
      //get the data from a specific page:
      try {
        const api = await axios.get(
          `${config.prefix}/${config.pages}/${pageID}`
        );
        setstate({ dataHasLoaded: true, api });
        if (api.data.acf.alertmessage) {
          setAlert(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [pageID]);

  let output;
  let backgroundImage;
  let cachedImage;
  let alertMessage;
  let renderCachedImage;

  const showPage = () => {
    document.querySelector(".page").classList.add("slide-in-left");
    document.querySelector(".arrow-down").classList.add("move-down");
    setTimeout(() => {
      document.querySelector(".spinner").classList.add("hide");
    }, 1000);
  };

  if (state.dataHasLoaded) {
    output = (
      <div>
        <Social />
        <div
          dangerouslySetInnerHTML={{
            __html: state.api.data.content.rendered,
          }}
        ></div>
      </div>
    );
    backgroundImage = state.api.data.acf.backgroundimage
      ? `url(${state.api.data.acf.backgroundimage})`
      : "";
    cachedImage = state.api.data.acf.backgroundimage;

    if (alert) {
      alertMessage = (
        <Alert clicked={() => removeAlert()}>
          {state.api.data.acf.alertmessage}
        </Alert>
      );
    }
    if (cachedImage) {
      renderCachedImage = (
        <img
          onLoad={() => {
            showPage();
          }}
          src={cachedImage ? cachedImage : ""}
          style={{ visibility: "hidden", width: "0px" }}
          alt=""
        />
      );
    } else {
      renderCachedImage = null;
      showPage();
    }
  }

  const removeAlert = () => {
    setAlert(false);
  };

  return (
    <div>
      <Spinner />
      <ArrowDown />
      {renderCachedImage}

      <div
        className="page"
        style={{
          backgroundImage,
          paddingTop: cachedImage ? null : "0",
        }}
      >
        {alertMessage}
        {output}
      </div>
    </div>
  );
};

export default Page;
