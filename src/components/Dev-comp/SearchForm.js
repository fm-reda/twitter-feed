import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Stack,
  Box,
  Icon,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Avatar,
  Flex,
  Badge,
} from "@chakra-ui/core";
import { Formik, Field, Form } from "formik";
import { MdSettings } from "react-icons/md";

function SearchForm(props) {
  const { showModalSett, paramsModal, handleSearchClick } = props;
  const [word, setword] = useState(3);

  //   useEffect(() => {
  //     console.log("didmount");
  //   }, []);

  useEffect(() => {
    // console.log(value);
  });
  const handleClick = () => {
    // setValue(value + 1);
    // console.log("teset");
  };

  function validateName(value) {
    let error;
    if (!value) {
      error = "Word for search is required";
    } else if (value == "#") {
      error = "Jeez! # plz no 😱";
    }
    return error;
  }
  return (
    <div>
      <Stack>
        <Stack
          isInline
          spacing={20}
          p={3}
          shadow="md"
          borderWidth="1px"
          rounded="md"
        >
          {/* ****************************Heading + form window ****************** */}
          <Box flex="8">
            <Heading fontSize="xl" mb={5}>
              Search tweets
            </Heading>
            <Box>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={(values) => {
                  handleSearchClick(values);
                }}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Field name="name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <Input
                            {...field}
                            id="name"
                            placeholder="Looking for a Tweet, type something !! "
                            size="md"
                            rounded="full"
                            px="15px"
                          />
                          <FormHelperText id="email-helper-text">
                            {/* <Button onClick={showModalSett} variant="ghost">
                          <Icon
                            name="settings"
                            color="gray.500"
                            size="24px"
                            focusable="true"
                          />
                        </Button> */}
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
                      //   isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
          {/* ********************setting window************************ */}
          <Stack
            isInline
            justify="space-between"
            p={2}
            mb={15}
            borderWidth="1px"
            rounded="md"
            flex="4"
          >
            <Box>
              <Heading fontSize="xm">Setting</Heading>
              <Box p={1} d="flex">
                <Badge
                  rounded="full"
                  fontSize="0.7em"
                  mt="1"
                  mr="3"
                  variantColor="gray"
                >
                  Count of search :
                </Badge>
                <Text>{paramsModal.countTweet}</Text>
              </Box>
              <Box p={1} d="flex">
                <Badge
                  rounded="full"
                  fontSize="0.7em"
                  mt="1"
                  mr="3"
                  variantColor="gray"
                >
                  language :
                </Badge>
                <Text>{paramsModal.langTweet}</Text>
              </Box>
            </Box>
            <Box
              onClick={() => showModalSett()}
              as={MdSettings}
              size="20px"
              color="green.400"
            />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default SearchForm;
