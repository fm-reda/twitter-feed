import React, { Component, useState, useEffect } from "react";
import Search from "./Dev-comp/Search";
import axios from "axios";
import SingleTweet from "./Dev-comp/SingleTweet";
import ModalApp from "./Dev-comp/ModalApp";
import SearchForm from "./Dev-comp/SearchForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

import { Formik, Field, Form } from "formik";
import Live from "./Live";
//--------------------------------------------------------------------Compoenent

function Home() {
  //declaration
  const [modeMount, setmodeMount] = React.useState(false);
  const [tweets, setTweets] = React.useState({
    twDatasInit: [],
    // twDatas: [],
    update: false,
    // modeMount: false,
  });
  const [twDatas, setTwDatas] = React.useState([]);

  const [paramsTweet, setparamsTweet] = React.useState({
    q: "usa",
    result_type: "mixed",
    count: 2,
    lang: "en",
  });
  const [live, setLive] = React.useState({
    status: false,
    word: paramsTweet.q,
  });
  const [paramsModal, setParamsModal] = React.useState({
    settingType: false,
    tweetType: false,
    countTweet: paramsTweet.count,
    langTweet: paramsTweet.lang,
  });
  const [idTweet, setIdTweet] = React.useState([]);
  const [modalSettVisible, setmodalSettVisible] = React.useState(false);
  const [modalTweetVisible, setmodalTweetVisible] = React.useState(false);

  const myElem = React.createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tokenMine =
    "AAAAAAAAAAAAAAAAAAAAAGZtEgEAAAAA%2BFTRfdzKslvseLjUL6%2BmE7WhL7w%3Da4qVaLEW53IKvaLmPyDO3lVyq7p6pxIPoPWZaZDX9evKqcFUVt";
  const tokenRandom = `AAAAAAAAAAAAAAAAAAAAAAs5%2FAAAAAAA%2BFhxtLDRr2AuKh5zdIHTczhg0Jg%3DltF0dqGzLFlmXH9wjI8HkO1gEzGlnCYUegwIOVVu1Umn8Yi1sX`;
  const cors = "https://cors-anywhere.herokuapp.com/";
  const urlSearch = "https://api.twitter.com/1.1/search/tweets.json";

  //function

  const handleChange = (event) => {
    // setValue(event.target.value);
    // console.log({ value });
  };
  //------------------------- function search tweets
  const getTweet = (params) => {
    // console.log("paramsTweet in getTweet funct :" + params);
    axios
      .get(`${cors}${urlSearch}`, {
        headers: { Authorization: `Bearer ${tokenMine}` },
        params: params,
      })
      .then(({ data }) => {
        console.log(data);
        // console.log(data.statuses.id_str);
        if (modeMount) {
          // console.log("modemount est tru");

          setTwDatas(data.statuses);
        } else {
          // console.log("modemount est falseeeee");

          setTweets({ twDatasInit: data.statuses });
          // console.log(tweets);
        }
      });
  };
  useEffect(() => {
    // console.log(paramsTweet);

    if (modeMount) {
      //   console.log("mode est true");
      getTweet(paramsTweet);
    }
  }, [paramsTweet]);
  useEffect(() => {
    getTweet(paramsTweet);
  }, []);
  // **********************************Modal setting*********************************************************
  function showModalSett() {
    setParamsModal({
      settingType: true,
      title: "setting",
      visible: "isOpen",
      countTweet: paramsModal.countTweet,
      langTweet: paramsModal.langTweet,
    });
  }
  function closeModalSett() {
    setParamsModal({
      visible: false,
      countTweet: paramsModal.countTweet,
      langTweet: paramsModal.langTweet,
    });
    setmodalSettVisible(false);
  }
  const handleModSettClick = (values) => {
    setParamsModal({
      countTweet: values.count,
      langTweet: values.lang,
      visible: false,
    });
    setparamsTweet({
      q: paramsTweet.q,
      result_type: paramsTweet.result_type,
      count: values.count,
      lang: values.lang,
    });
  };
  // **********************************Modal Tweet*********************************************************

  function showModalTweet(id) {
    setParamsModal({
      tweetType: true,
      title: "Tweet show",
      visible: "isOpen",
      idTweet: id,
      countTweet: paramsModal.countTweet,
      langTweet: paramsModal.langTweet,
    });
  }
  const handleSearchClick = (values) => {
    setmodeMount(true);
    setTweets({
      twDatasInit: tweets.twDatasInit,
    });

    setparamsTweet({
      q: values.name,
      result_type: paramsTweet.result_type,
      count: paramsTweet.count,
      lang: paramsTweet.lang,
    });

    const timer = setTimeout(() => {
      setLive({
        status: true,
        word: values.name,
      });
    }, 1000);
    // const timer2 = setTimeout(() => {
    //   setLive({
    //     status: false,
    //   });
    // }, 4000);

    console.log("live status" + live.word);
    console.log("paramsTweet in handleClick :" + tweets);
    console.log("q in handleClik :" + values.name);
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
        {/* <SingleTweet tweet={tweet} /> */}
        {/* Modal pop up----------------------------- */}
        <ModalApp
          closeModalSett={closeModalSett}
          paramsModal={paramsModal}
          handleModSettClick={handleModSettClick}
        />

        <Stack isInline spacing={10}>
          <Box spacing={16} flex="6">
            {/* ******************************** Welcom space*************************************** */}

            <Box p={3} mb={15} shadow="md" borderWidth="1px" rounded="md">
              <Heading fontSize="xl">Welcom, User</Heading>
              <Text mt={4}>U can Search for tweet, add favorites</Text>
            </Box>

            {/* // *************************************form search ****************************/}
            <Box>
              {live.status && (
                <Box mb="2" shadow="md">
                  <Alert status="info">
                    <AlertIcon />U want Watch this keyword Go LIVE!
                    <Button ml="5" size="md" variantColor="green">
                      <Link to={`/live/${live.word}`}>{live.word}</Link>
                    </Button>
                  </Alert>
                </Box>
              )}

              {/* <Router>
                <Switch>
                  <Route path="/live" exact component={Live} />
                </Switch>
              </Router> */}
              <SearchForm
                mb={15}
                showModalSett={showModalSett}
                paramsModal={paramsModal}
                handleSearchClick={handleSearchClick}
              />
              <div className="row mt-5">
                {modeMount && (
                  <SingleTweet
                    tweets={twDatas}
                    showModalTweet={showModalTweet}
                  />
                )}
              </div>
              {/* <Stack isInline spacing={10} mt="5"></Stack> */}
            </Box>
          </Box>
          {/* // *************************************Top tweet****************************/}

          <Box
            spacing={10}
            flex="3"
            mb={5}
            p={1}
            shadow="md"
            borderWidth="1px"
            rounded="md"
          >
            <Box>
              <Heading fontSize="xl" mb={5} p={2}>
                Top Tweet
              </Heading>
              {/* // list of top Tweet------------------------------------------------- */}
            </Box>

            <SingleTweet
              tweets={tweets.twDatasInit}
              showModalTweet={showModalTweet}
              top={true}
            />
          </Box>
        </Stack>

        {/* // *************************************Pop up setting****************************/}
      </ThemeProvider>
    </div>
  );
}
export default Home;
{
  {
    {
      // console.log("first time");
      // axios
      //   .get(
      //     `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=usa&result_type=recent&lang=en`,
      //     { headers: { Authorization: `Bearer ${tokenMine}` } }
      //   )
      //   .then(({ data }) => {
      //     console.log("dsqd" + data);
      //     // console.log(data.statuses.id_str);
      //     setTweets({ twDatas: data.statuses });
      //   });
      // axios
      //   .get(`${cors}${urlSearch}`, {
      //     headers: { Authorization: `Bearer ${tokenRandom}` },
      //     params: paramsTweet,
      //   })
      //   .then(({ data }) => {
      //     console.log(data);
      //     // console.log(data.statuses.id_str);
      //     setTweets({ twDatas: data.statuses });
      //   });
      // console.log(paramsTweet);
      /* <Box p={5} shadow="md" borderWidth="1px" rounded="md">
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
                            <Button onClick={showModalSett} variant="ghost">
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
            </Box> */
    }
    /* <Modal
                isOpen={modalTweetVisible}
                onClose={closeModalTweet}
                closeOnOverlayClick={false}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Search settings</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <TwitterTweetEmbed
                      tweetId={idTweet.toString()}
                      options={{}}
                      // onLoad={action}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      variantColor="blue"
                      mr={3}
                      onClick={closeModalTweet}
                    >
                      Close
                    </Button>
                    <Button onClick={handleModTweetClick} variantColor="green">
                      Confirm
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> */
  }
  /* {tweet.map((tw) => (
                <div key={tw.id_str}>
                  <Box
                    p={2}
                    mb={15}
                    ml="2"
                    shadow="md"
                    borderWidth="1px"
                    rounded="lg"
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

                    <Box variantColor="green" fontWeight="semibold" mt={4}>
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
              ))} */
}

{
  /* {
                      tw.extended_entities
                        ? tw.extended_entities.media.map((tw1) => (
                            <img key={tw1.id} src={tw1.media_url} alt="" />
                          ))
                        : console.log("")
                      // <img src={tw1.display_url} alt="" />
                    } */
}

{
  /* <Formik
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
        </Formik> */
}
{
  /* <Stack isInline>
         
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
        </Stack> */
}

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

{
  /* <Drawer
                        isOpen={DrawerVisible}
                        isFullHeight={true}
                        placement="top"
                        onClose={closeDrawer}
                        width="400px"
                      >
                        <DrawerOverlay />
                        <DrawerContent>
                          <DrawerCloseButton />
                          <DrawerHeader>{idTweet}</DrawerHeader>

                          <DrawerBody>
                            <TwitterTweetEmbed
                              tweetId={idTweet.toString()}
                              options={{}}
                              // onLoad={action}
                            />
                          </DrawerBody>

                          <DrawerFooter>
                            <Button
                              variant="outline"
                              mr={3}
                              onClick={closeDrawer}
                            >
                              Cancel
                            </Button>
                            <Button color="blue">Save</Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer> */
}
