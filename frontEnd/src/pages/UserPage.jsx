import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';

const UserPage = () => {
  const [user, setuser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

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
      }
    };
    getUser();
  }, [username, showToast]);

  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost likes={100} replies={400} postImg="/post1.png" postTitle="Lets talk about threads" />
      <UserPost likes={200} replies={500} postImg="/post2.png" postTitle="Nice Toturial..!" />
      <UserPost likes={300} replies={600} postImg="/post3.png" postTitle="Elon Musk" />
      <UserPost likes={400} replies={700} postTitle="Its a thread..!" />
    </>
  );
};

export default UserPage;
