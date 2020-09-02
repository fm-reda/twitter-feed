import React, { useState, useEffect } from "react";
import TweetEmbed from "./TweetEmbed";
import SettingSearch from "./SettingSearch";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  //   useDisclosure,
  //   Icon,
  //   Stack,
  //   Input,
  //   Text,
  //   FormControl,
  //   FormLabel,
  //   FormErrorMessage,
  //   FormHelperText,
  //   Box,
  //   Heading,
  //   Avatar,
  //   Flex,
  //   Drawer,
  //   DrawerBody,
  //   DrawerFooter,
  //   DrawerHeader,
  //   DrawerOverlay,
  //   DrawerContent,
  //   DrawerCloseButton,
} from "@chakra-ui/core";

const ModalApp = (props) => {
  const { paramsModal, closeModalSett, handleModSettClick } = props;
  // console.log(paramsModal);
  return (
    <>
      <Modal
        isOpen={paramsModal.visible}
        onClose={() => closeModalSett()}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{paramsModal.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {paramsModal.settingType && (
              <SettingSearch
                handleModSettClick={handleModSettClick}
                paramsModal={paramsModal}
              />
            )}
            {paramsModal.tweetType && (
              <TweetEmbed idTweet={paramsModal.idTweet} />
            )}
            {/* <TweetEmbed idTweet={paramsModal.idTweet} /> */}
          </ModalBody>

          <ModalFooter>
            {/* <Button variantColor="blue" mr={3} onClick={() => closeModalSett()}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Button onClick={handleModTweetClick} variantColor="green">
              Confirm
            </Button> */}
    </>
  );
};

export default ModalApp;
