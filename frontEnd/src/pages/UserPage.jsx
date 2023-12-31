import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import { set } from 'date-fns';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';
import useGetUserProfile from '../Hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../Atoms/postsAtom';

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const showToast = useShowToast();
  const { username } = useParams();
  const [posts, setposts] = useRecoilState(postsAtom);
  const [fetchingPosts, setfetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setfetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();

        setposts(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setposts([]);
      } finally {
        setfetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setposts, user]);

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  const getPosts = async () => {};
  if (!user && !loading)
    return (
      <Flex justifyContent={'center'} fontSize={'2xl'}>
        User not found
      </Flex>
    );
  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1> No posts yet</h1>}

      {fetchingPosts && (
        <Flex justifyContent={'center'} my={'12'}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
