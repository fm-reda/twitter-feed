import React, { Component } from "react";
import "../../App.css";
import logo from "../../img/KLIR.png";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-twitter">
          <img src={logo} alt="" width="50" height="50" />
          <a className="navbar-brand" href="#">
            KLIR Twitter
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01 ">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/bookmarks">
                  Bookmarks
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/live">
                  Live
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/dev">
                  Dev
                </Link>
              </li>
              {/* <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a> */}
            </ul>
            {/* <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </nav>
      </div>
    );
  }
}
