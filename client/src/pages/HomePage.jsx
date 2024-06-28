// Importing necessary dependencies and components
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import SuggestedUsers from '../components/SuggestedUsers';
import NotFoundPage from '../components/NotFoundPage';
import { shuffleArray } from '../utils/shuffleArray';
import staticPosts from '../data/posts.json';

// Component for handling the Home page
const HomePage = () => {
  // Recoil state for posts
  const [posts, setPosts] = useRecoilState(postsAtom);
  // State for handling loading state
  const [loading, setLoading] = useState(true);
  // Function for displaying toasts
  const showToast = useShowToast();

  // Effect for fetching feed posts from the server
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch('/api/posts/feed');
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  // Shuffling static posts to display if there are no posts
  const shuffledStaticPosts = shuffleArray(staticPosts);

  return (
    <Flex gap="10" alignItems={'flex-start'}>
      {/* Post Section */}
      <Box flex={70}>
        {/* Displaying message when there are no posts in the feed */}
        {!loading && posts.length === 0 && (
          <>
            {shuffledStaticPosts.map((post, index) => (
              <Post
                key={index}
                post={post}
                postedBy={post.postedBy}
                placeholder
              />
            ))}
          </>
        )}

        {/* Displaying loading spinner while posts are being fetched */}
        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {/* Displaying individual posts */}
        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>

      {/* Suggested Users Section */}
      <Box
        flex={30}
        display={{
          base: 'none',
          md: 'block',
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

// Exporting the HomePage component as the default export
export default HomePage;
