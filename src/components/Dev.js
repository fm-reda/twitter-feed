import React, { Component } from "react";
import Search from "./Dev-comp/Search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./dev.css";
import Home from "./Home";
import NewComp from "./Dev-comp/NewComp";

export default class Dev extends Component {
  render() {
    return (
      <div className="row ">
        <Router>
          <div className="col-3 sidebar">
            <ul>
              <li className="sidebar-link">
                <Link
                  className=""
                  to="/dev/search"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Search Comp
                </Link>
              </li>
              <li className="sidebar-link">
                <Link
                  className=""
                  to="/dev/NewComp"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  NewComp
                </Link>
              </li>

              {/* //*************************New link ***************** */}
              {/* <li className="sidebar-link">
                <Link className="" to="/dev/NewComp" 
                style={{ textDecoration: "none", color: "black" }}>
                  NewComp
                </Link>
              </li> */}
              {/**********************************************************/}
            </ul>
          </div>

          <Switch>
            <Route path="/dev/search" exact component={Search} />
            <Route path="/dev/newcomp" exact component={NewComp} />

            {/* //*************************New Route ****************** */}
            {/* <Route path="/dev/newcomp" exact component={NewComp} /> */}
            {/**********************************************************/}
          </Switch>
        </Router>
      </div>
    );
  }
}
