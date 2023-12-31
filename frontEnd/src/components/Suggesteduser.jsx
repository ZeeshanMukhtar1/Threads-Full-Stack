import { Avatar, Button, Flex, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFollowUnfollow } from '../Hooks/useFollowUnfollow';

export const Suggesteduser = ({ user }) => {
  const { handleFollowUnfollow, updating, following } = useFollowUnfollow(user);
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
        onClick={handleFollowUnfollow}
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
