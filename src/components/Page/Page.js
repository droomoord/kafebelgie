import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import scrollTop from "../functions/scrollTop";
import "./Page.css";
import Spinner from "../utility/Spinner/Spinner";
// import ArrowDown from "../utility/ArrowDown/ArrowDown";

const Page = (props) => {
  scrollTop();
  const { pageID } = props;

  const [state, setstate] = useState({
    api: {},
    isLoaded: false,
  });

  useEffect(() => {
    console.log("page effect");
    const getData = async () => {
      //get the data from a specific page:
      try {
        const api = await axios.get(
          `${config.prefix}${config.pages}/${pageID}`
        );
        setstate({ isLoaded: true, api });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [pageID, props.featuredMedia]);

  let output;
  let slideIn;
  let backgroundImage;

  if (!state.isLoaded) {
    output = <Spinner />;
  }
  if (state.isLoaded) {
    slideIn = "slide-in-left";
    output = (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: state.api.data.content.rendered,
          }}
        ></div>
      </div>
    );
    console.log(state.api.data.acf.backgroundimage);
    backgroundImage = `url(${state.api.data.acf.backgroundimage}`;
  }

  return (
    <div>
      {/* {state.isLoaded ? <ArrowDown /> : null} */}
      <div style={{ backgroundImage }} className={["page", slideIn].join(" ")}>
        {output}
      </div>
    </div>
  );
};

export default Page;
