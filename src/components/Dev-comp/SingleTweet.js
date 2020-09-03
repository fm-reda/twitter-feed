import React from "react";
import {
  Button,
  Avatar,
  Flex,
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
} from "@chakra-ui/core";

function SingleTweet(props) {
  const { tweets, showModalTweet, top } = props;

  // console.log("in single tweet" + tweets);

  return (
    <>
      {tweets.map((tw) => (
        <div key={tw.id} className={!top ? "col-6" : ""}>
          <Box
            p={2}
            mb={15}
            // ml="2"
            shadow="md"
            borderWidth="1px"
            rounded="lg"
            height="250px"
          >
            <Box d="flex" alignItems="start">
              <Avatar
                mr={3}
                name="Dan Abrahmov"
                src={tw.user.profile_image_url}
              />
              <Box as="span" color="gray.600" fontSize="sm">
                <Heading fontSize="xl">{tw.user.name}</Heading>@
                {tw.user.screen_name}
              </Box>
            </Box>

            <Box variantColor="green" fontWeight="semibold" mt={4} mb={30}>
              {tw.text}
            </Box>
            <Flex d="flex" justify="space-between">
              <Text color="gray.500" fontSize="xs" mt={2}>
                {tw.created_at.substring(0, 19)}
              </Text>
              <Button
                onClick={() => showModalTweet(tw.id_str)}
                rightIcon="arrow-forward"
                variantColor="teal"
                variant="outline"
                size="xs"
              >
                More
              </Button>
            </Flex>
          </Box>
        </div>
      ))}
    </>
  );
}

export default SingleTweet;
