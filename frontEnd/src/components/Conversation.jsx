import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0];
  const lastMessage = conversation.lastMessage;

  if (!user || !lastMessage || lastMessage.length === 0) {
    return (
      <Flex>
        <Text>No Conversations yet</Text>
      </Flex>
    );
  }

  return (
    <Flex
      gap={4}
      alignItems={'center'}
      p={1}
      _hover={{
        cursor: 'pointer',
        bg: useColorModeValue('gray.600', 'gray.dark'),
        color: 'white',
      }}
      borderRadius={'md'}
    >
      <WrapItem>
        <Avatar
          size={{
            sm: 'sm',
            md: 'md',
          }}
          src="https://bit.ly/broken-link"
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </WrapItem>
      <Stack direction={'column'} fontSize={'sm'}>
        <Text fontWeight={'700'} display={'flex'} alignItems={'center'}>
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
          {lastMessage.text.length > 5 ? lastMessage.text.substring(0, 5) + '...' : lastMessage.text}{' '}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
