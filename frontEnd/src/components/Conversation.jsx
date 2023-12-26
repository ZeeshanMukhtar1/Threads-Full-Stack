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
import { BsCheck2All } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';
// import userAtom from '../atoms/userAtom';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { selectedConversationAtom } from '../Atoms/messagesAtom';
import userAtom from '../Atoms/userAtom';

const Conversation = ({ conversation }) => {
  const currentUser = useRecoilValue(userAtom);
  const colorMode = useColorMode();
  const [selectedConversation, setselectedConversation] = useRecoilState(selectedConversationAtom);

  const user = conversation.participants ? conversation.participants[0] : undefined;
  const lastMessage = conversation.lastMessage || {};

  if (!user || !lastMessage || lastMessage.length === 0) {
    return null;
  }

  // console.log('selected conversation is hsre', conversation);
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
      bg={selectedConversation._id === conversation._id ? (colorMode === 'light' ? 'gray.600' : 'gray.dark') : ''}
      borderRadius={'md'}
      onClick={() => {
        setselectedConversation({
          _id: conversation._id,
          userId: user._id,
          username: user.username,
          userProfilePic: user.profilePicture,
          mock: conversation.mock,
        });
      }}
    >
      <WrapItem>
        <Avatar
          size={{
            sm: 'sm',
            md: 'md',
          }}
          src={user.profilePicture ? user.profilePicture : 'https://avatars.githubusercontent.com/u/91063160?v=4'}
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </WrapItem>
      <Stack direction={'column'} fontSize={'sm'}>
        <Text fontWeight={'700'} display={'flex'} alignItems={'center'}>
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
          {currentUser._id === lastMessage.sender ? <IoCheckmarkCircle size={16} /> : ''}
          {lastMessage.text.length > 5 ? lastMessage.text.substring(0, 5) + '...' : lastMessage.text}{' '}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
