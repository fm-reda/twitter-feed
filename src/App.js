import React, { Component } from "react";
// import Search from "./Search";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/Footer";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="App container mt-5">
          <Main />
          <Footer />
        </div>
      </div>
    );
  }
}
