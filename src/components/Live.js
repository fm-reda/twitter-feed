import React, { Component, useState, useEffect } from "react";
import SingleTweet from "./Dev-comp/SingleTweet";
// import TweetEmbed from "./TweetEmbed";
import { TwitterTweetEmbed } from "react-twitter-embed";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import {
  ThemeProvider,
  Button,
  useDisclosure,
  Icon,
  Stack,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Heading,
  Avatar,
  Flex,
  Alert,
  AlertIcon,
  Badge,
} from "@chakra-ui/core";

const Live = (props) => {
  const { id } = props.match.params;
  console.log(id);

  // ********************************  Declaration ************************************
  // **********************************************************************************
  const [tweetsLive, setTweetsLive] = useState();
  const [paramLive, setParamLive] = useState();
  // -------------------------------------axios  ------------------------------------------
  // const cors = "";
  const cors = "https://cors-anywhere.herokuapp.com/";
  const bearerMine =
    "AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX";
  const bearerMine2 =
    "AAAAAAAAAAAAAAAAAAAAAGZtEgEAAAAA%2BFTRfdzKslvseLjUL6%2BmE7WhL7w%3Da4qVaLEW53IKvaLmPyDO3lVyq7p6pxIPoPWZaZDX9evKqcFUVt";
  const consumer_key = "q3vQUT3WcSkuRnMLRyOk4UXeR";
  const consumer_secret = "hqDhGPSCEL7URuf2AnThvBVtTigbp45ODRf5EPXpgN9XMaIaJR";

  const https = require("https");
  const request = require("request");
  const util = require("util");

  const get = util.promisify(request.get);
  const post = util.promisify(request.post);

  const bearerTokenURL = new URL(cors + "https://api.twitter.com/oauth2/token");
  const streamURL = new URL(
    cors + "https://api.twitter.com/labs/1/tweets/stream/sample"
  );

  async function bearerToken(auth) {
    return bearerMine2;
  }

  function streamConnect(token) {
    // Listen to the stream
    const config = {
      url:
        cors +
        "https://api.twitter.com/labs/1/tweets/stream/sample?format=compact",
      auth: {
        bearer: token,
      },
      headers: {
        "User-Agent": "TwitterDevSampledStreamQuickStartJS",
      },
      timeout: 1000,
    };

    const stream = request.get(config);

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          setTweetsLive([...tweetsLive, json.data.id]);
          console.log(tweetsLive.id);
        } catch (e) {
          // Keep alive signal received. Do nothing.
        }
      })
      .on("error", (error) => {
        if (error.code === "ETIMEDOUT") {
          stream.emit("timeout");
        }
      });

    return stream;
  }

  (async () => {
    let token;

    try {
      // Exchange your credentials for a Bearer token
      token = await bearerToken({ consumer_key, consumer_secret });
    } catch (e) {
      console.error(
        `Could not generate a Bearer token. Please check that your credentials are correct and that the Sampled Stream preview is enabled in your Labs dashboard. (${e})`
      );
      process.exit(-1);
    }

    const stream = streamConnect(token);
    stream.on("timeout", () => {
      // Reconnect on error
      console.warn("A connection error occurred. Reconnecting…");
      streamConnect(token);
    });
  })();

  // // -------------------------------------stream init  ------------------------------------------
  // const https = require("https");

  // const request = require("request");
  // const util = require("util");
  // const get = util.promisify(request.get);
  // const post = util.promisify(request.post);

  // // -------------------------------------stream url ------------------------------------------

  // const bearerTokenURL = new URL(cors + "https://api.twitter.com/oauth2/token");
  // const streamURL = new URL(
  //   cors + "https://api.twitter.com/labs/1/tweets/stream/filter"
  // );
  // const rulesURL = new URL(
  //   cors + "https://api.twitter.com/labs/1/tweets/stream/filter/rules"
  // );

  // // ********************************  Func:Connect ************************************
  // // **********************************************************************************
  // const streamConnect = (token) => {
  //   // Listen to the stream
  //   const config = {
  //     url:
  //       cors +
  //       "https://api.twitter.com/labs/1/tweets/stream/filter?format=compact",
  //     auth: {
  //       bearer: token,
  //     },
  //     timeout: 2000,
  //   };

  //   const stream = request.get(config);

  //   stream
  //     .on("data", (data) => {
  //       try {
  //         const json = JSON.parse(data);
  //         // console.log(json.data.id);
  //         setTweetsLive([...tweetsLive, json.data.id]);
  //         console.log(tweetsLive);

  //         // this.setState({
  //         //   tweet: [...this.state.tweet, json.data.id],
  //         // });

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
  // };
  // // ********************************  Func:async ************************************
  // // **********************************************************************************
  // async function sleep(delay) {
  //   return new Promise((resolve) => setTimeout(() => resolve(true), delay));
  // }

  // async function bearerToken(auth) {
  //   return bearerMine;
  // }

  // async function getAllRules(token) {
  //   const requestConfig = {
  //     url: rulesURL,
  //     auth: {
  //       bearer: token,
  //     },
  //   };
  //   const response = await get(requestConfig);
  //   if (response.statusCode !== 200) {
  //     throw new Error(response.body);
  //     return null;
  //   }

  //   return JSON.parse(response.body);
  // }
  // async function deleteAllRules(rules, token) {
  //   if (!Array.isArray(rules.data)) {
  //     return null;
  //   }

  //   const ids = rules.data.map((rule) => rule.id);

  //   const requestConfig = {
  //     url: rulesURL,
  //     auth: {
  //       bearer: token,
  //     },
  //     json: {
  //       delete: {
  //         ids: ids,
  //       },
  //     },
  //   };

  //   const response = await post(requestConfig);
  //   if (response.statusCode !== 200) {
  //     throw new Error(JSON.stringify(response.body));
  //     return null;
  //   }

  //   return response.body;
  // }
  // async function setRules(rules, token) {
  //   const requestConfig = {
  //     url: rulesURL,
  //     auth: {
  //       bearer: token,
  //     },
  //     json: {
  //       add: rules,
  //     },
  //   };

  //   const response = await post(requestConfig);
  //   if (response.statusCode !== 201) {
  //     throw new Error(JSON.stringify(response.body));
  //     return null;
  //   }

  //   return response.body;
  // }
  // (async () => {
  //   let token, currentRules, stream;
  //   let timeout = 2000;

  //   const rules = [
  //     { value: "usa has:images", tag: "maghrib" },
  //     { value: "morocco has:images -grumpy", tag: "morocco" },
  //   ];

  //   try {
  //     // Exchange your credentials for a Bearer token
  //     token = await bearerToken({ consumer_key, consumer_secret });
  //   } catch (e) {
  //     console.error(
  //       `Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`
  //     );
  //     process.exit(-1);
  //   }

  //   try {
  //     // Gets the complete list of rules currently applied to the stream
  //     currentRules = await getAllRules(token);

  //     // // Delete all rules. Comment this line if you want to keep your existing rules.
  //     await deleteAllRules(currentRules, token);

  //     // // Add rules to the stream. Comment this line if you want to keep your existing rules.
  //     await setRules(rules, token);
  //   } catch (e) {
  //     console.error(e);
  //     process.exit(-1);
  //   }

  //   // Listen to the stream.
  //   // This reconnection logic will attempt to reconnect when a disconnection is detected.
  //   // To avoid rate limites, this logic implements exponential backoff, so the wait time
  //   // will increase if the client cannot reconnect to the stream.
  //   const connect = () => {
  //     try {
  //       stream = streamConnect(token);
  //       stream.on("timeout", async () => {
  //         // Reconnect on error
  //         console.warn("A connection error occurred. Reconnecting…");
  //         timeout++;
  //         stream.abort();
  //         await sleep(2 ** timeout * 1000);
  //         connect();
  //       });
  //     } catch (e) {
  //       connect();
  //     }
  //   };

  //   connect();
  // })();

  return (
    <Stack mx="auto" maxW="1150px" px="15px">
      <Box p="2" my="2" rounded="5px" borderWidth="1px" mx="auto" shadow="md">
        <Text fontSize="30px" color="Teal">
          Live Tweets
        </Text>
      </Box>
      <Stack isInline spacing={2}>
        <Box p="2" my="2" borderWidth="1px" flex="2" mx="auto" shadow="md">
          <Heading fontSize="20px">Setting live</Heading>
        </Box>
        <Box p="2" my="2" borderWidth="1px" flex="6" shadow="lg">
          <Heading fontSize="20px">Live Tweets</Heading>
          <Stack isReversed spacing={8} align="center">
            {/* {tweetsLive.map((tw) => (
              <TwitterTweetEmbed tweetId={tw} />
            ))} */}

            {/* <SingleTweet
              tweets={tweetsLive}
              // showModalTweet={showModalTweet}
              top={true}
            /> */}
          </Stack>
          <Text>{id}</Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Live;
