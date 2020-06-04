import React, { Component, useState, useEffect } from "react";
import Search from "./Dev-comp/Search";
import axios from "axios";

import { ThemeProvider, Button } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Formik, Field, Form } from "formik";
//--------------------------------------------------------------------Compoenent

function Home() {
  //declaration
  const [value, setValue] = React.useState("");
  const [tweet, setTweet] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tokenRandom = `AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX`;

  //function

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log({ value });
  };
  //-------------------------
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23riot%20GeorgeFloyd usa&result_type=recent&lang=en`,
        { headers: { Authorization: `Bearer ${tokenRandom}` } }
      )
      .then(({ data }) => {
        console.log(data);
        // this.setState({ todos: data });
        // this.setState({ nextTodoId: data.length });
        setTweet(data.statuses);
        // setNextTodoId(data.length);
      });
  }, []);
  const handleClick = () => {
    // const { onClose } = useDisclosure();
    console.log("test");
    onClose();
  };
  //-----------------------
  function validateName(value) {
    let error;
    if (!value) {
      error = "Word for search is required";
    } else if (value == "#") {
      error = "Jeez! # plz no 😱";
    }
    return error;
  }
  //Render
  //------------------------------------------------------------------------------------------
  return (
    <div className="container">
      <ThemeProvider>
        {/* //STack------------------------------ */}
        <Stack isInline spacing={1}>
          <Stack spacing={6} flex="12">
            <Box p={5} mb={15} shadow="md" borderWidth="1px" rounded="md">
              <Heading fontSize="xl">Welcom</Heading>
              <Text mt={4}>aaa</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" rounded="md">
              <Heading fontSize="xl">Search</Heading>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000);
                }}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Field name="name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="name">
                            Search for your tweets
                          </FormLabel>
                          <Input {...field} id="name" placeholder=".... " />
                          <FormHelperText id="email-helper-text">
                            Lang:En, Count:10, Location:Usa{" "}
                            <Button onClick={onOpen} variant="ghost">
                              <Icon
                                name="settings"
                                color="gray.500"
                                size="24px"
                                focusable="true"
                              />
                            </Button>
                          </FormHelperText>
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      variantColor="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                )}
              </Formik>
              {/* <Text mt={4}>aa</Text> */}
            </Box>
          </Stack>
          <Stack spacing={6} flex="4">
            <Box p={1} shadow="md" borderWidth="1px" rounded="md">
              <Heading fontSize="xl">Top Tweet</Heading>
              {/* // Change to component TweetModel------------------------------------------------- */}
              {tweet.map((tw) => (
                <div key={tw.id_str}>
                  <Box
                    p={5}
                    mb={15}
                    ml="2"
                    shadow="md"
                    borderWidth="1px"
                    rounded="md"
                  >
                    <Heading fontSize="xl">{tw.user.name}</Heading>
                    <Text mt={4}>{tw.text}</Text>
                    {
                      tw.extended_entities
                        ? tw.extended_entities.media.map((tw1) => (
                            <img key={tw1.id} src={tw1.media_url} alt="" />
                          ))
                        : console.log("no")
                      // <img src={tw1.display_url} alt="" />
                    }
                  </Box>
                </div>
              ))}
            </Box>
          </Stack>
        </Stack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Search settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleClick} variantColor="green">
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ThemeProvider>

      {/* <Formik
          initialValues={{ name: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Search for your tweets</FormLabel>
                    <Input {...field} id="name" placeholder=".... " />
                    <FormHelperText id="email-helper-text">
                      Lang:En, Count:10, Location:Usa{" "}
                      <Button onClick={onOpen} variant="ghost">
                        <Icon
                          name="settings"
                          color="gray.500"
                          size="24px"
                          focusable="true"
                        />
                      </Button>
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                variantColor="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik> */}
      {/* <Stack isInline>
         
          <Input
            focusBorderColor="pink.400"
            placeholder="Search tweets"
            size="md"
            onChange={handleChange}
          />
          <Button onClick={onOpen} variant="ghost">
            <Icon
              name="settings"
              color="gray.500"
              size="24px"
              focusable="true"
            />
          </Button>
          <Text fontSize="xs">In love with React & Next</Text>
        </Stack> */}
    </div>
  );
}
export default Home;
// export default class Home extends Component {
//   render() {
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     return (
//       <div className="container bg-white shadow p-3 mb-5 bg-white rounded">
//         <h1>Welcom, User</h1>
//         <p>U can search in twitter</p>
//         <p>Save your favorite tweets</p>
//         <p>Or stream on your important keyword </p>

//         <Button onClick={onOpen}>Open Modal</Button>

//         <Modal isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Modal Title</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Lorem count={2} />
//             </ModalBody>

//             <ModalFooter>
//               <Button variantColor="blue" mr={3} onClick={onClose}>
//                 Close
//               </Button>
//               <Button variant="ghost">Secondary Action</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//         <ThemeProvider>
//           {/* <Button variantColor="pink">Button</Button> */}
//         </ThemeProvider>

//         {/* <Search /> */}
//       </div>
//     );
//   }
// }
