import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import useShowToast from '../Hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import { set } from 'date-fns';
import useShowToast from '../hooks/useShowToast';

const UserPage = () => {
  const showToast = useShowToast();
  const [user, setuser] = useState(null);
  const { username } = useParams();
  // const showToast = useShowToast();
  const [loading, setloading] = useState(true);
  const [posts, setposts] = useState([]);
  const [fetchingPosts, setfetchingPosts] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        setuser(data.user);
        // console.log(data.user);
        // console.log('API Response:', data.user); // Log the response so we can see it in the dev tools
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setuser(data.user);
      } catch (error) {
        // console.log(error);
        showToast('Error', 'Something went wrong', 'error');
      } finally {
        setloading(false);
      }
    };

    const getPosts = async () => {
      console.log('username is ', username);
      setfetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        // setposts(data.posts);
        setposts(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setposts([]);
      } finally {
        setfetchingPosts(false);
      }
    };

    getUser();
    getPosts();
  }, [username, showToast]);

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
    </>
  );
};

export default UserPage;
