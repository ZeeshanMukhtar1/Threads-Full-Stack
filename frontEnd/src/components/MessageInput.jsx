import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { useState, useRef } from 'react';
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from '../Atoms/messagesAtom';
import { BsFillImageFill } from 'react-icons/bs';
import { ModalBody, ModalContent, ModalHeader } from '@chakra-ui/modal';
import { Image } from '@chakra-ui/image';
import usePreviewImg from '../Hooks/usePreviewImg';

export const MessageInput = ({ setMessages }) => {
  const [messageText, setmessageText] = useState('');
  const showToast = useShowToast();

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationsAtom);
  const imageRef = useRef(null);
  const { onClose } = useDisclosure();
  const { handleImageChange, imgUrl, setimgUrl } = usePreviewImg();
  const [isSending, setisSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText && imgUrl) return;
    if (isSending) return;
    setisSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
          img: imgUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      console.log(data);
      setMessages((messages) => [...messages, data]);

      // setting up sidebar msg to latest one using global state updation
      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
      setmessageText('');
      setimgUrl('');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setisSending(false);
    }
  };

  return (
    <Flex gap={2} alignItems={'center'}>
      <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
        <InputGroup>
          <Input
            w={'full'}
            placeholder="Type your message here..."
            onChange={(e) => setmessageText(e.target.value)}
            value={messageText}
          />
          <InputRightElement onClick={handleSendMessage} cursor={'pointer'}>
            <IoSendSharp size={20} />
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex flex={5} cursor={'pointer'}>
        <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
        <Input type={'file'} hidden ref={imageRef} onChange={handleImageChange} />
      </Flex>
      <Modal
        isOpen={imgUrl}
        onClose={() => {
          onClose();
          setimgUrl('');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex mt={5} w={'full'}>
              <Image src={imgUrl} />
            </Flex>
            <Flex justifyContent={'flex-end'} my={2}>
              {!isSending ? (
                <IoSendSharp size={24} cursor={'pointer'} onClick={handleSendMessage} />
              ) : (
                <Spinner size={'md'} />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
