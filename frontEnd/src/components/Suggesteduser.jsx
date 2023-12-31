import { Avatar, Button, Flex, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Suggesteduser = ({ user }) => {
  const following = false; // You may get this value from user.following or other logic
  const updating = false;

  return (
    <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
      <Flex gap={2} as={Link} to={`/${user.username}`}>
        <Avatar src={user.profilePic || 'https://avatars.githubusercontent.com/u/91063160?v=4'} />
        <Box>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {user.name}
          </Text>
          <Text color={'gray.light'} fontSize={'sm'}>
            {user.username}
          </Text>
        </Box>
      </Flex>
      <Button
        size={'sm'}
        color={following ? 'black' : 'white'}
        bg={following ? 'white' : 'blue.400'}
        isLoading={updating}
        _hover={{
          color: following ? 'black' : 'white',
          opacity: '.8',
        }}
      >
        {following ? 'Unfollow' : 'Follow'}
      </Button>
    </Flex>
  );
};
