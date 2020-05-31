import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Search from "./Search";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Live from "./components/Live";
import Dev from "./components/Dev";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <div className="App container mt-5 body-cl">
              <Route path="/" exact component={Home} />
              <Route path="/bookmarks" component={Bookmarks} />
              <Route path="/dev" component={Dev} />
              <Route path="/live" component={Live} />
              {/* <Home /> */}
              {/* <Bookmarks /> */}
              {/* <Live /> */}
              {/* <Dev /> */}
            </div>
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}
