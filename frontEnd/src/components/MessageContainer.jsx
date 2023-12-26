import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Message } from './Message';
import { MessageInput } from './MessageInput';
import { useEffect } from 'react';
import useShowToast from '../hooks/useShowToast';
import { selectedConversationAtom } from '../Atoms/messagesAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import userAtom from '../Atoms/userAtom';
import { useSocket } from '../context/SocketContext';

const MessageContainer = () => {
  const showToast = useShowToast();
  const [selectedConversation, setselectedConversation] = useRecoilState(selectedConversationAtom);
  const [loadingMessages, setloadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const { socket } = useSocket();
  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prevMsg) => [...prevMsg, message]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, [socket]);
  useEffect(() => {
    const getMessages = async () => {
      setloadingMessages(true);
      setMessages([]);
      try {
        if (selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast(data.error, 'error', 'error');
          return;
        }

        setMessages(data);
      } catch (error) {
        showToast('error', error.Message, 'error');
      } finally {
        setloadingMessages(false);
      }
    };
    getMessages();
  }, [showToast, selectedConversation.userId]);
  return (
    <Flex flex={70} bg={useColorModeValue('gray.200', 'gray.dark')} borderRadius={'md'} p={2} flexDirection={'column'}>
      {/* msg hedaer */}
      <Flex w={'full'} h={20} alignItems={'center'} gap={2}>
        <Avatar
          src={selectedConversation.userProfilePic || 'https://avatars.githubusercontent.com/u/91063160?v=4'}
          size={'sm'}
        />
        <Text display={'flex'} alignItems={'center'}>
          {selectedConversation.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />
      {/* msg body */}
      <Flex flexDir={'column'} gap={4} my={4} height={'400px'} overflowY={'auto'}>
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={'center'}
              p={1}
              borderRadius={'md'}
              alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={'column'} gap={2}>
                <Skeleton h={'8px'} w={'250px'} />
                <Skeleton h={'8px'} w={'250px'} />
                <Skeleton h={'8px'} w={'250px'} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {/* msgs */}
        {!loadingMessages &&
          messages.map((message) => (
            <Message key={message._id} message={message} OwnMessage={currentUser._id === message.sender} />
          ))}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
