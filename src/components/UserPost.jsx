import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';

const UserPost = () => {
  return (
    <Link to={'/MarkZuckerberg/post/1'}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar size={'md'} name={'Mark Zuckerberg'} src="/public/zuck-avatar.png" />
          <Box w="1px" h={'full'} bg={'gray.light'} my={2}></Box>
          <Box position={'relative'} w={'full'}>
            <Avatar
              size={'xs'}
              name={'John Doe'}
              src="https://bit.ly/ryan-florence"
              position={'absolute'}
              top={'0px'}
              left={'15px'}
              padding={'2px'}
            />
            <Avatar
              size={'xs'}
              name={'John Doe'}
              src="https://bit.ly/kent-c-dodds"
              position={'absolute'}
              bottom={'0px'}
              right={'-5px'}
              padding={'2px'}
            />
            <Avatar
              size={'xs'}
              name={'John Doe'}
              src="https://bit.ly/prosper-baba"
              position={'absolute'}
              bottom={'0px'}
              left={'4px'}
              padding={'2px'}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                Markzuckerberk
              </Text>
              <Image src="/public/verified.png" alt="verified" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Text fontSize={'sm'}>1d</Text>
              <BsThreeDotsVertical />
            </Flex>
          </Flex>
          <Text fontSize={'sm'}>This is my first post</Text>
          <Box borderRadius={6} overflow={'hidden'} border={'1px solid '} borderColor={'gray.light'}>
            <Image src="/public/post1.png" alt="post" w={'full'} />
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
