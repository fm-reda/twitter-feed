import React from "react";
import PropTypes from "prop-types";
import { TwitterTweetEmbed } from "react-twitter-embed";

function TweetEmbed(props) {
  const { idTweet } = props;
  //   const [idTweet, setIdTweet] = useState("");
  return (
    <div>
      <TwitterTweetEmbed
        tweetId={idTweet.toString()}
        options={{}}
        // onLoad={action}
      />
    </div>
  );
}

export default TweetEmbed;
