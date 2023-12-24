import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Message } from './Message';
import { MessageInput } from './MessageInput';

const MessageContainer = () => {
  return (
    <Flex flex={70} bg={useColorModeValue('gray.200', 'gray.dark')} borderRadius={'md'} p={2} flexDirection={'column'}>
      {/* msg hedaer */}
      <Flex w={'full'} h={20} alignItems={'center'} gap={2}>
        <Avatar src="" size={'sm'} />
        <Text display={'flex'} alignItems={'center'}>
          John Doe <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />
      {/* msg body */}
      <Flex flexDir={'column'} gap={4} my={4} height={'400px'} overflowY={'auto'}>
        {false &&
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
        <Message OwnMessage={true} />
        <Message OwnMessage={false} />
        <Message OwnMessage={false} />
      </Flex>
      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
