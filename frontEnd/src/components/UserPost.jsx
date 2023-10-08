import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Actions from './Actions';
import { useState } from 'react';

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false); // Initialize liked state
  return (
    <Link to={'/MarkZuckerberg/post/1'}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar size={'md'} name={'Mark Zuckerberg'} src="/zuck-avatar.png" />
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
              <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Text fontSize={'sm'}>1d</Text>
              <BsThreeDotsVertical />
            </Flex>
          </Flex>
          <Text fontSize={'sm'}>{postTitle}</Text>
          {
            // Display the image only if postImg is passed
            postImg && (
              <Box borderRadius={6} overflow={'hidden'} border={'1px solid '} borderColor={'gray.light'}>
                <Image src={postImg} alt="post" w={'full'} />
              </Box>
            )
          }
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} /> {/* Pass liked and setLiked props */}
          </Flex>
          <Flex gap={2} alignItems={'center'}>
            <Text color={'gray.light'} fontSize={'small'} alignItems={'center'}>
              {replies} Replies
            </Text>
            <Box w={1} h={1} borderRadius={'full'} bg={'gray.light'}></Box>
            <Text color={'gray.light'} fontSize={'small'} alignItems={'center'}>
              {likes} Likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
