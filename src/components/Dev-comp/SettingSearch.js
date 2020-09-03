import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Stack,
  Box,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";
import { Formik, Field, Form } from "formik";

function SettingSearch(props) {
  const { handleModSettClick, paramsModal } = props;
  //   const [idTweet, setIdTweet] = useState("");
  console.log("le params" + paramsModal.countTweet);

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
    <>
      <Stack>
        {/* <Box d="flex" mb="3">
          <Text>Count of search :</Text>
          <NumberInput size="xm" defaultValue={10} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box d="flex" mb="3">
          <Text>Language :</Text>
          <NumberInput size="xm" defaultValue={10} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box> */}

        <Formik
          initialValues={{
            count: paramsModal.countTweet,
            lang: paramsModal.langTweet,
          }}
          //   onSubmit={(values, actions) => {
          //     setTimeout(() => {
          //       alert(JSON.stringify(values, null, 2));
          //       actions.setSubmitting(false);
          //     }, 1000);
          //   }}
          onSubmit={(values) => {
            handleModSettClick(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Field name="count" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.count && form.touched.count}
                  >
                    <Box d="flex">
                      <FormLabel flex="6" htmlFor="name" mt="2">
                        Count Search
                      </FormLabel>
                      <Input
                        {...field}
                        id="count"
                        placeholder="Numbre of tweet "
                        rounded="full"
                        px="15px"
                        flex="6"
                      />
                    </Box>

                    <FormHelperText id="email-helper-text"></FormHelperText>
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* **********************************************Field language****************************************************** */}
              <Field name="lang" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.lang && form.touched.lang}
                  >
                    <Box d="flex">
                      <FormLabel flex="6" htmlFor="name" mt="2">
                        Language
                      </FormLabel>
                      <Input
                        {...field}
                        id="lang"
                        placeholder="Numbre of tweet "
                        rounded="full"
                        px="15px"
                        flex="6"
                      />
                    </Box>

                    <FormHelperText id="email-helper-text"></FormHelperText>
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
        </Formik>
      </Stack>
      {/* <Button onClick={() => handleModSettClick()} variantColor="green">
        Confirm
      </Button> */}
    </>
  );
}

export default SettingSearch;
