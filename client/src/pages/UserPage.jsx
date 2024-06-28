import { useEffect, useState } from 'react';
import UserHeader from '../components/UserHeader';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import NotFoundPage from '../components/NotFoundPage';

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;

      setFetchingPosts(true);

      try {
        // Fetching user's posts
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);

        // Updating Recoil state with fetched posts
        setPosts(data);
      } catch (error) {
        // Handling errors during fetch
        showToast('Error', error.message, 'error');
        setPosts([]);
      } finally {
        // Setting-up fetchingPosts to false after fetching is complete
        setFetchingPosts(false);
      }
    };

    // Calling the function to get posts
    getPosts();

    // Dependency array includes variables that trigger a re-run of the effect when changed
  }, [username, showToast, setPosts, user]);

  // Render loading spinner while user data is being fetched
  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  // If user is missing and loading is complete, show a NotFoundPage
  if (!user && !loading) {
    return (
      <NotFoundPage
        text="Oops! This user seems to be missing. Maybe they froze their account?"
        textSize={'md'}
      />
    );
  }

  return (
    <>
      {/* Display the user header */}
      <UserHeader user={user} />

      {/* If posts are fetched and there are no posts, show a NotFoundPage */}
      {!fetchingPosts && posts.length === 0 && (
        <NotFoundPage text="user has no posts!" />
      )}

      {/* If posts are still being fetched, show a loading spinner */}
      {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {/* Map through fetched posts and display them using the Post component */}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
