import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Dev-comp/Search";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Live from "./components/Live";
import Dev from "./components/Dev";
import Test from "./components/Dev-comp/Test";
// import customTheme from "./theme";

import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="bg-light">
        <ThemeProvider>
          <CSSReset />
          <Router>
            <Header />
            <Switch>
              <div className="mt-5 body-cl">
                <Route path="/" exact component={Home} />
                <Route path="/bookmarks" component={Bookmarks} />
                <Route path="/dev" exact component={Dev} />
                <Route path="/live/:id" exact component={Live} />
                <Route path="/live" exact component={Live} />
              </div>
            </Switch>
          </Router>
        </ThemeProvider>

        <Footer />
      </div>
    );
  }
}
