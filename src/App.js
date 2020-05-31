import React, { Component } from "react";
// import Search from "./Search";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import Favoris from "./components/Bookmarks";
import Live from "./components/Live";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="App container mt-5 body-cl">
          <Home />
          <Favoris />
          <Live />
          {/* <Main /> */}
        </div>
        <Footer />
      </div>
    );
  }
}
