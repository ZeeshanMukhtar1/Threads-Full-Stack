import { Avatar, Button, Flex, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Suggesteduser = ({ user }) => {
  const following = false;
  const updating = false;
  return (
    <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
      <Flex gap={2} as={Link} to={`${user.username}`}>
        <Avatar src={''} />
        <Box>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            zeeshan
          </Text>
          <Text color={'gray.light'} fontSize={'sm'}>
            zee
          </Text>
        </Box>
      </Flex>
      <Button
        size={'sm'}
        color={following ? 'black' : 'white'}
        bg={following ? 'white' : 'blue.400'}
        // onClick={handleFollow}
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
