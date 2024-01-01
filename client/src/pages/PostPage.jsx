// Importing necessary dependencies and components
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Actions from '../components/Actions';
import { useEffect } from 'react';
import Comment from '../components/Comment';
import useGetUserProfile from '../hooks/useGetUserProfile';
import useShowToast from '../hooks/useShowToast';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { FaTrash } from 'react-icons/fa';

import postsAtom from '../atoms/postsAtom';

// Component for handling the Post page
const PostPage = () => {
  // Fetching user profile
  const { user, loading } = useGetUserProfile();
  // Recoil state for posts
  const [posts, setPosts] = useRecoilState(postsAtom);
  // Function for displaying toasts
  const showToast = useShowToast();
  // Getting post id from route parameters
  const { pid } = useParams();
  // Getting current user from Recoil
  const currentUser = useRecoilValue(userAtom);
  // Navigation function for React Router
  const navigate = useNavigate();
  // Getting the current post from the posts state
  const currentPost = posts[0];

  // Effect for fetching individual post data
  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast('Error', error.message, 'error');
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  // Function for handling post deletion
  const handleDeletePost = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
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

  // Loading spinner while user profile is being fetched
  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  // If there is no current post, return null
  if (!currentPost) return null;

  return (
    <>
      {/* User and post information */}
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar src={user.profilePic} size={'md'} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              {user.username}
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text
            fontSize={'xs'}
            width={36}
            textAlign={'right'}
            color={'gray.light'}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {/* Displaying delete icon for the current user's post */}
          {currentUser?._id === user._id && (
            <FaTrash size={20} cursor={'pointer'} onClick={handleDeletePost} />
          )}
        </Flex>
      </Flex>

      {/* Post content */}
      <Text my={3}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={'hidden'}
          border={'1px solid'}
          borderColor={'gray.light'}
        >
          <Image src={currentPost.img} w={'full'} />
        </Box>
      )}

      {/* Action buttons for the post */}
      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      {/* Section for displaying app download message */}
      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>👋</Text>
          <Text color={'gray.light'}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />

      {/* Displaying comments for the post */}
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
};

// Exporting the PostPage component as the default export
export default PostPage;
