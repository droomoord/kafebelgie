import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Page from "./components/Page/Page";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import config from "./components/config/config";
// import setDocTitle from "./components/functions/setDocTitle";

function App() {
  // setDocTitle();
  const [state, setState] = useState({ api: {}, isLoaded: false });
  //trigger on page load:
  useEffect(() => {
    const getData = async () => {
      try {
        const api = await axios.get(
          `${config.prefix}/casa_molero_pages/?orderby=menu_order`
        );
        const apiCopy = { ...api };
        //reverse the order of the array to reflect the wordpress order of pages:
        apiCopy.data.reverse();
        //save the data to the state
        setState({ api: apiCopy, isLoaded: true });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  //if the data fetched, create an array of titles
  const titles = state.isLoaded
    ? state.api.data.map((page) => {
        return page.title.rendered;
      })
    : null;

  const redirect = state.isLoaded ? (
    <Redirect
      to={`/${state.api.data[0].title.rendered.split(" ").join("-")}`}
    />
  ) : null;

  //when the data is fetched, create Routes for each Page. The path will be equal to the title of the page, with dashes in stead of spaces.
  const pages = state.isLoaded
    ? titles.map((title, index) => {
        return (
          <Route key={index} exact path={`/${title.split(" ").join("-")}`}>
            <Page
              pageID={state.api.data[index].id}
              featuredMedia={state.api.data[index].featured_media}
            />
          </Route>
        );
      })
    : null;

  return (
    <div className="App">
      <Router>
        <Navbar titles={titles} />
        <Switch>{pages}</Switch>
        {redirect}
      </Router>
    </div>
  );
}

export default App;
