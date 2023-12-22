import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import { BsThreeDotsVertical } from 'react-icons/bs';
import Actions from './Actions';
import { useState } from 'react';
import { useEffect } from 'react';
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from 'date-fns';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const Post = ({ post, postedBy }) => {
  const showToast = useShowToast();
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentUser, setcurrentUser] = useState(useRecoilValue(userAtom));

  useEffect(() => {
    console.log('logged in user ', currentUser._id);
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/users/profile/' + postedBy);
        const data = await res.json();
        console.log(data);
        console.log('user id ', postedBy);
        if (data.error) {
          // showToast('Error', data.error, 'error');
          return;
        }
        setLoading(false);
        setuser(data.user);
      } catch (error) {
        // showToast('Error', data.error, 'error');
        setuser(null);
        setLoading(false);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm('Are you sure you want to delete this post?')) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', 'Post deleted', 'success');
      setPosts(post.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };
  return (
    <Link to={`/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Link to={`/${user?.username}`}>
            <Avatar
              size={'md'}
              name={user?.name || 'John Doe'}
              src={user?.profilePic || 'https://bit.ly/dan-abramov'}
            />
          </Link>
          <Box w="1px" h={'full'} bg={'gray.light'} my={2}></Box>
          <Box position={'relative'} w={'full'}>
            {post.replies.length === 0 && <Text textAlign={'center'}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size={'xs'}
                name="test"
                src="{post.replies[0].user.profilePic || 'https://bit.ly/dan-abramov'}"
                position={'absolute'}
                top={'0px'}
                left={'15px'}
                padding={'2px'}
              />
            )}
            {post.replies[1] && post.replies[1].user && (
              <Avatar
                size={'xs'}
                name="test"
                src={post.replies[1].user.profilePic || 'https://bit.ly/dan-abramov'}
                position={'absolute'}
                bottom={'0px'}
                right={'-5px'}
                padding={'2px'}
              />
            )}

            {post.replies[2] && (
              <Avatar
                size={'xs'}
                name="test"
                src={post.replies[2].user.profilePic || 'https://bit.ly/dan-abramov'}
                position={'absolute'}
                bottom={'0px'}
                left={'4px'}
                padding={'2px'}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Link to={`/${user?.username}`}>
                <Text fontWeight={'bold'}>{user?.name || 'John Doe'}</Text>
              </Link>
              <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Text fontSize={'xs'} width={36} textAlign={'right'}>
                {formatDistanceToNow(new Date(post.createdAt))} ago{' '}
              </Text>
              {/* <BsThreeDotsVertical /> */}
              {/*  delete post btn */}
              {/* <DeleteIcon size={20} onClick={handleDeletePost} /> */}
              {
                // Display the delete button only if the post belongs to the logged in user
                currentUser?._id === postedBy && <DeleteIcon size={20} onClick={handleDeletePost} />
              }
            </Flex>
          </Flex>
          <Text fontSize={'sm'}>{post.text}</Text>
          {
            // Display the image only if postImg is passed
            post.Img && (
              <Box borderRadius={6} overflow={'hidden'} border={'1px solid '} borderColor={'gray.light'}>
                <Image src={post.img} alt="post" w={'full'} />
              </Box>
            )
          }
          <Flex gap={3} my={1}>
            <Actions post={post} /> {/* Pass liked and setLiked props */}
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
