import { Avatar, Flex, Text } from '@chakra-ui/react';

import React from 'react';

export const Message = ({ OwnMessage }) => {
  return (
    <>
      {OwnMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Text maxW={'350px'} p={1} bg={'blue.400'} borderRadius={'md'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime autem fugit quasi dolorum repudiandae qui.
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />
          <Text maxW={'350px'} p={1} bg={'gray.400'} color={'black'} borderRadius={'md'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, consequatur.
          </Text>
        </Flex>
      )}
    </>
  );
};
