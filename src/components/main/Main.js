import React, { Component } from "react";
import Search from "./Search";
import Table from "../Table";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Search />
        <Table />
      </div>
    );
  }
}
