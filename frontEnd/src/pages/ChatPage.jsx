import { Search2Icon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Conversation from '../components/Conversation';
import { GiConversation } from 'react-icons/gi';
import MessageContainer from '../components/MessageContainer';
import { useEffect } from 'react';
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from '../Atoms/messagesAtom';
import { useSocket } from '../context/SocketContext';
import userAtom from '../Atoms/userAtom';

const ChatPage = () => {
  const currentuser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loadingConversations, setloadingConversations] = useState(true);
  const [conversations, setconversations] = useRecoilState(conversationsAtom);
  const [searchText, setsearchText] = useState('');
  const [searchingUser, setsearchingUser] = useState(false);
  const { socket, onlineUsers } = useSocket();
  console.log('online users', onlineUsers);

  const [selectedConversation, setselectedConversation] = useRecoilState(selectedConversationAtom);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch('/api/messages/conversations');
        const data = await res.json();

        if (data.error) {
          showToast(data.error, 'error', 'error');
          return;
        }
        console.log(data);
        setconversations(data);
      } catch (error) {
        showToast(error.message, 'error', 'error');
      } finally {
        setloadingConversations(false);
      }
    };
    getConversations();
  }, [showToast, setconversations]);

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setsearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast('Error', searchedUser.error, 'error');
        return;
      }
      const messagingYourself = searchedUser.user._id === currentuser._id;
      if (messagingYourself) {
        setsearchingUser(false);
        showToast('Error', 'You cant start a conversation with yourself', 'info');
        return;
      }

      //  if conversation already exists then set it as selected conversation
      const conversatinAlredyExists = conversations.find((conversation) =>
        conversation.participants.some((participant) => participant._id === searchedUser.user._id),
      );

      if (conversatinAlredyExists) {
        setselectedConversation({
          _id: conversatinAlredyExists._id,
          userId: searchedUser.user._id,
          username: searchedUser.user.username,
          userProfilePic: searchedUser.user.profilePic,
        });
      }

      const mockConversation = {
        mock: true,
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser.user._id,
            username: searchedUser.user.username,
            profilePic: searchedUser.user.profilePic,
          },
        ],
        lastMessage: {
          text: '',
          sender: '',
          createdAt: new Date().toISOString(),
        },
      };
      setconversations((prev) => [...prev, mockConversation]);
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setsearchingUser(false);
    }
  };
  // console.log('currentuser is ', currentuser._id);

  return (
    <Box
      position={'absolute'}
      left={'50%'}
      w={{
        base: '100%',
        md: '80%',
        lg: '750px',
      }}
      p={4}
      transform={'translateX(-50%)'}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
        maxW={{
          sm: '400px',
          md: 'full',
        }}
        mx={'auto'}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={'column'}
          maxW={{
            sm: '250px',
            md: 'full',
          }}
          mx={'auto'}
        >
          <Text fontWeight={700} color={useColorModeValue('gray.600', 'gray.400')}>
            Your conversations
          </Text>
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={'center'} gap={2}>
              <Input placeholder="search a user here" onChange={(e) => setsearchText(e.target.value)} />
              <Button size={'sm'} onClick={handleConversationSearch} isLoading={searchingUser}>
                <Search2Icon />
              </Button>
            </Flex>
          </form>
          {loadingConversations &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex key={i} gap={4} alignItems={'center'} borderRadius={'md'}>
                <Box>
                  <SkeletonCircle size="10" />
                </Box>
                <Flex w={'full'} flexDirection={'column'} gap={3}>
                  <Skeleton h={'10px'} w={'80px'} />
                  <Skeleton h={'8px'} w={'90%'} />
                </Flex>
              </Flex>
            ))}
          {!loadingConversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                // isOnline={onlineUsers.includes(conversation.participants[0]._id)}
                // isOnline={onlineUsers && onlineUsers.includes(conversation.participants[1]._id)}
                isOnline={onlineUsers && onlineUsers.includes(conversation.participants[0]._id)}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation._id && (
          <Flex
            flex={70}
            borderRadius={'md'}
            p={2}
            flexDirection={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            h={'400px'}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start chatting</Text>
          </Flex>
        )}

        {/* <Flex flex={70}>Message container</Flex> */}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
