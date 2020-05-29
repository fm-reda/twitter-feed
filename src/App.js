import React from "react";
import logo from "./logo.svg";

import "./App.css";

function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <ul className="nav nav-tabs" id="navId">
          <li className="nav-item">
            <a href="#tab1Id" className="nav-link active">
              Home
            </a>
          </li>

          <li className="nav-item">
            <a href="#tab5Id" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        <p>Feed TwitteR</p>
      </header>
      <blockquote class="twitter-tweet" data-partner="tweetdeck">
        <p lang="en" dir="ltr">
          hello
        </p>
        &mdash; 3wa developer (@3waDeveloper){" "}
        <a href="https://twitter.com/3waDeveloper/status/1266395312341561345?ref_src=twsrc%5Etfw">
          May 29, 2020
        </a>
      </blockquote>
      <a class="twitter-share-button" href="https://twitter.com/intent/tweet">
        Tweet
      </a>
    </div>
  );
}

export default App;
