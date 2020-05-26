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
    featuredMedia: 0,
    logo: "",
  });

  const [imageURL, setImageURL] = useState("none");

  useEffect(() => {
    setTimeout(() => {
      console.log("page effect");
      const getData = async () => {
        //get the data from a specific page:
        try {
          const api = await axios.get(
            `${config.prefix}/casa_molero_pages/${pageID}`
          );
          setstate({ isLoaded: true, api });
        } catch (error) {
          console.log(error);
        }
      };

      getData();

      //get page image if the page data has a featured_media value
      const getImage = async () => {
        try {
          const api = await axios.get(
            `${config.prefix}/media/${props.featuredMedia}`
          );
          const URL = api.data.media_details.sizes.full.source_url;
          setImageURL(`url(${URL})`);
        } catch (error) {
          console.log(error);
        }
      };

      if (props.featuredMedia) {
        getImage();
      }
    }, 300);
  }, [pageID, props.featuredMedia]);

  let output;

  if (!state.isLoaded) {
    output = <Spinner />;
  }
  if (state.isLoaded) {
    output = (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: state.api.data.content.rendered,
          }}
        ></div>
      </div>
    );
  }

  let slideIn;

  if (state.isLoaded) {
    slideIn = "slide-in-left";
  }

  return (
    <div>
      {/* {state.isLoaded ? <ArrowDown /> : null} */}
      <div
        style={{ backgroundImage: imageURL }}
        className={["page", slideIn].join(" ")}
      >
        {output}
      </div>
    </div>
  );
};

export default Page;
