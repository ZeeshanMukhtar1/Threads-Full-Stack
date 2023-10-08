import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={100} replies={400} postImg="/post1.png" postTitle="Lets talk about threads" />
      <UserPost likes={200} replies={500} postImg="/post2.png" postTitle="Nice Toturial..!" />
      <UserPost likes={300} replies={600} postImg="/post3.png" postTitle="Elon Musk" />
      <UserPost likes={400} replies={700} postTitle="Its a thread..!" />
    </>
  );
};

export default UserPage;
