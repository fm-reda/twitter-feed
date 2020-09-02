import React, { Component } from "react";
import Axios from "axios";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

export default class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: [],
      search: "",
      result_type: "mixed",
      count: 1,
    };
    this.streamConnect = this.streamConnect.bind(this);
  }
  handleClick = (e) => {
    console.log("clicked");
  };

  // handleClick() {
  //   console.log("clicked");
  // }
  request = require("request");

  cors2 = "https://cors-anywhere.herokuapp.com/";
  streamConnect(token) {
    // Listen to the stream
    const config = {
      url:
        this.cors2 +
        "https://api.twitter.com/labs/1/tweets/stream/filter?format=compact",
      auth: {
        bearer: token,
      },
      timeout: 20000,
    };

    const stream = this.request.get(config);

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          console.log(json.data.id);

          this.setState({
            tweet: [...this.state.tweet, json.data.id],
          });
          console.log(this.state.tweet);
          // console.log(this.state.tweet);

          if (json.connection_issue) {
            stream.emit("timeout");
          }
        } catch (e) {
          // Heartbeat received. Do nothing.
        }
      })
      .on("error", (error) => {
        if (error.code === "ESOCKETTIMEDOUT") {
          stream.emit("timeout");
        }
      });

    return stream;
  }
  componentDidMount() {
    // var Twit = require("twit");
    const bearerRandom =
      "AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX";
    const bearerMine =
      "AAAAAAAAAAAAAAAAAAAAAGZtEgEAAAAA%2BFTRfdzKslvseLjUL6%2BmE7WhL7w%3Da4qVaLEW53IKvaLmPyDO3lVyq7p6pxIPoPWZaZDX9evKqcFUVt";
    const consumer_key = "q3vQUT3WcSkuRnMLRyOk4UXeR";
    const consumer_secret =
      "hqDhGPSCEL7URuf2AnThvBVtTigbp45ODRf5EPXpgN9XMaIaJR";
    const access_token_key =
      "1263845449997463554-DVwdoXjb8XmPff5hkXsy38ZyqEBkGR";
    const access_token_secret = "OTBvwRh9vlxVWsqsQkZZHyFqj9RxMLNriCk0Kw7k6JnX9";

    const cors =
      "https://cors-anywhere.herokuapp.com/https://stream.twitter.com/1.1/";
    const cors2 = "https://cors-anywhere.herokuapp.com/";

    //****************************************************************************************************************************** */
    const https = require("https");
    const request = require("request");
    const util = require("util");

    const get = util.promisify(request.get);
    const post = util.promisify(request.post);

    // const consumer_key = ""; // Add your API key here
    // const consumer_secret = ""; // Add your API secret key here

    const bearerTokenURL = new URL(
      cors2 + "https://api.twitter.com/oauth2/token"
    );
    const streamURL = new URL(
      cors2 + "https://api.twitter.com/labs/1/tweets/stream/filter"
    );
    const rulesURL = new URL(
      cors2 + "https://api.twitter.com/labs/1/tweets/stream/filter/rules"
    );

    async function sleep(delay) {
      return new Promise((resolve) => setTimeout(() => resolve(true), delay));
    }

    async function bearerToken(auth) {
      return bearerRandom;
    }

    async function getAllRules(token) {
      const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token,
        },
      };

      const response = await get(requestConfig);
      if (response.statusCode !== 200) {
        throw new Error(response.body);
        return null;
      }

      return JSON.parse(response.body);
    }

    async function deleteAllRules(rules, token) {
      if (!Array.isArray(rules.data)) {
        return null;
      }

      const ids = rules.data.map((rule) => rule.id);

      const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token,
        },
        json: {
          delete: {
            ids: ids,
          },
        },
      };

      const response = await post(requestConfig);
      if (response.statusCode !== 200) {
        throw new Error(JSON.stringify(response.body));
        return null;
      }

      return response.body;
    }

    async function setRules(rules, token) {
      const requestConfig = {
        url: rulesURL,
        auth: {
          bearer: token,
        },
        json: {
          add: rules,
        },
      };

      const response = await post(requestConfig);
      if (response.statusCode !== 201) {
        throw new Error(JSON.stringify(response.body));
        return null;
      }

      return response.body;
    }

    // function streamConnect(token) {
    //   // Listen to the stream
    //   const config = {
    //     url:
    //       cors2 +
    //       "https://api.twitter.com/labs/1/tweets/stream/filter?format=compact",
    //     auth: {
    //       bearer: token,
    //     },
    //     timeout: 20000,
    //   };

    //   const stream = request.get(config);

    //   stream
    //     .on("data", function (data) {
    //       try {
    //         const json = JSON.parse(data);
    //         // console.log(json.data.id);
    //         console.log("ééé" + this.state.tweet);
    //         // console.log("sdqsdqssqdq");

    //         this.setState({
    //           tweet: json.data.id,
    //         });
    //         // console.log(this.state.tweet);

    //         if (json.connection_issue) {
    //           stream.emit("timeout");
    //         }
    //       } catch (e) {
    //         // Heartbeat received. Do nothing.
    //       }
    //     })
    //     .on("error", (error) => {
    //       if (error.code === "ESOCKETTIMEDOUT") {
    //         stream.emit("timeout");
    //       }
    //     });

    //   return stream;
    // }

    (async () => {
      let token, currentRules, stream;
      let timeout = 0;

      const rules = [
        { value: "corona has:images", tag: "maghrib" },
        { value: "morocco has:images -grumpy", tag: "morocco" },
      ];

      try {
        // Exchange your credentials for a Bearer token
        token = await bearerToken({ consumer_key, consumer_secret });
      } catch (e) {
        console.error(
          `Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`
        );
        process.exit(-1);
      }

      try {
        // Gets the complete list of rules currently applied to the stream
        currentRules = await getAllRules(token);

        // // Delete all rules. Comment this line if you want to keep your existing rules.
        await deleteAllRules(currentRules, token);

        // // Add rules to the stream. Comment this line if you want to keep your existing rules.
        await setRules(rules, token);
      } catch (e) {
        console.error(e);
        process.exit(-1);
      }

      // Listen to the stream.
      // This reconnection logic will attempt to reconnect when a disconnection is detected.
      // To avoid rate limites, this logic implements exponential backoff, so the wait time
      // will increase if the client cannot reconnect to the stream.
      const connect = () => {
        try {
          stream = this.streamConnect(token);
          stream.on("timeout", async () => {
            // Reconnect on error
            console.warn("A connection error occurred. Reconnecting…");
            timeout++;
            stream.abort();
            await sleep(2 ** timeout * 1000);
            connect();
          });
        } catch (e) {
          connect();
        }
      };

      connect();
    })();
  }
  componentDidUpdate() {
    console.log("update");
  }
  render() {
    return (
      <div>
        <div className="row mt-5">
          {this.state.tweet.map((tw) => (
            <div className="col-md-4 mt-4" key={tw}>
              <TwitterTweetEmbed tweetId={tw} />

              <a href="" className="btn btn-danger btn-blocl">
                Ajouter au favoris
              </a>
            </div>
          ))}
        </div>
        {/* <button type="submit" onClick={this.handleClick}>
          Stop
        </button> */}
      </div>
    );
  }
}
