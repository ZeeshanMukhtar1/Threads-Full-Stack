import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar size="sm" src={reply.userProfilePic} alt="Author" />
        <Flex gap={1} w={'full'} flexDirection={'column'}>
          <Flex w={'full'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
