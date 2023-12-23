import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/Actions';
import { useState } from 'react';
import Comment from '../components/Comment';
import useGetUserProfile from '../Hooks/useGetUserProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from 'date-fns';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [post, setpost] = useState(null);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast('Error', error.message, 'error');
          return;
        }
        setpost(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
      }
    };
    getPosts();
  }, [showToast, pid]);

  const handleDeletePost = async () => {
    try {
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
      navigate(`/${user.username}`);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  if (!post) return null;

  return (
    <>
      {/* Post Content */}
      <Flex flexDirection="column" w="100%">
        <Flex>
          {/* Left Side: Author's Picture, Name, Verified Icon */}
          <Flex alignItems="center" w={'full'} gap={3}>
            <Avatar
              size="md"
              src={user?.profilepic || 'https://avatars.githubusercontent.com/u/91063160?v=4'}
              alt="Author"
            />
            <Flex>
              <Text fontWeight="bold" fontSize="sm">
                {user?.username}
              </Text>
              <Image w={4} h={4} src="/verified.png" ml={2} alt="verified" />
            </Flex>
          </Flex>

          {/* Right Side: Post Timing and Three Dots */}
          <Flex gap={4} alignItems={'center'}>
            <Text fontSize={'xs'} width={36} textAlign={'right'}>
              {formatDistanceToNow(new Date(post.createdAt))} ago{' '}
            </Text>
            {currentUser?._id === user._id && <DeleteIcon size={20} cursor={'pointer'} onClick={handleDeletePost} />}
          </Flex>
        </Flex>

        <Text my={3}>{post.text}</Text>
        {post.img && (
          <Box borderRadius={6} overflow={'hidden'} border={'1px solid '} borderColor={'gray.light'}>
            <Image src={post.img} alt="post" w={'full'} />
          </Box>
        )}

        {/* Post Actions */}
        <Flex gap={3} my={3}>
          <Actions post={post} />
        </Flex>

        <Divider my={4} />
      </Flex>

      {/* "Get" Button */}
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text fontSize="2xl">👋</Text>
          <Text>Get the latest news and updates from Threads</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      {/* Comments */}
      {post.replies.map((reply) => (
        <Comment key={reply._id} reply={reply} lastReply={reply._id === post.replies[post.replies.length - 1]._id} />
      ))}
    </>
  );
};

export default PostPage;
