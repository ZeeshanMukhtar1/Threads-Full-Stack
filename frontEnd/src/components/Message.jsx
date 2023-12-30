import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../Atoms/messagesAtom';
import userAtom from '../Atoms/userAtom';
import { BsCheck2All } from 'react-icons/bs';

export const Message = ({ OwnMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  // console.log(user);

  return (
    <>
      {OwnMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Flex bg={'green.800'} maxW={'350px'} p={1} borderRadius={'md'}>
            <Text color={'white'}>{message.text}</Text>
            <Box alignSelf={'flex-end'} ml={1} color={message.seen ? 'black.400' : ''} fontWeight={'bold'}>
              <BsCheck2All />
            </Box>
          </Flex>
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
