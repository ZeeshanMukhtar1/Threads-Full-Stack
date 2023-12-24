import { Avatar, Flex, Text } from '@chakra-ui/react';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../Atoms/messagesAtom';
import userAtom from '../Atoms/userAtom';

export const Message = ({ OwnMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  // console.log(user);

  return (
    <>
      {OwnMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Text maxW={'350px'} p={1} bg={'blue.400'} borderRadius={'md'}>
            {message.text}
          </Text>
          <Avatar src={user.ProfilePic || 'https://avatars.githubusercontent.com/u/91063160?v=4'} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />
          <Text maxW={'350px'} p={1} bg={'gray.400'} color={'black'} borderRadius={'md'}>
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};
