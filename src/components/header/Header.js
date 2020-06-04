import React, { Component } from "react";
import "../../App.css";
import logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-twitter">
          <div className="container">
            <img className="mr-2" src={logo} alt="" width="50" height="50" />
            <Link className="nav-link" to="/">
              Klir Tweeter
            </Link>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}

            <div
              className=" row justify-content-between collapse navbar-collapse"
              id="navbarColor01 "
            >
              <div className="col-auto">
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
                </ul>
              </div>
              <div className="col-auto">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
