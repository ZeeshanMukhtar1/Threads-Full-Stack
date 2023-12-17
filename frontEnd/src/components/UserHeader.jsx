import {
  Avatar,
  Box,
  Flex,
  VStack,
  Text,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  useToast,
  Button,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import '../../styles/global.scss';
import userAtom from '../Atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';

const UserHeader = ({ user }) => {
  // Initialize the toast notification system
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // Get the current user from the global state
  const [following, setfollowing] = useState(user.followers.includes(currentUser._id));
  const [updating, setupdating] = useState(false);
  console.log(following);
  const showToast = useShowToast();

  // Function to copy the current URL to the clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log('coppied', window.location.href);
    toast({
      title: 'URL Copied ',
      description: 'Profile URL Copied to clipboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast('Error', 'Please login to follow', 'error');
      return;
    }

    // If the user is already updating, return early to prevent multiple requests from being sent
    if (updating) return;
    setupdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      if (following) {
        showToast('Success', 'Unfollowed', 'success');
        user.followers.pop(currentUser._id); // Remove the current user from the followers array
      } else {
        showToast('Success', 'Followed', 'success');
        user.followers.push(currentUser._id); // Add the current user to the followers array
      }
      setfollowing(!following);
    } catch (error) {
      showToast('Error', error, 'error');
    } finally {
      setupdating(false);
    }
  };
  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          {/* User's name */}
          <Text
            fontSize={{
              base: 'md',
              md: 'lg',
              lg: 'xl',
            }}
            fontWeight={'bold'}
          >
            {user.name}
          </Text>
          <Flex gap={2} alignItems={'center'}>
            {/* User's username */}
            <Text fontSize={'sm'}>{user.username}</Text>
            {/* User's organization or label */}
            <Text
              fontSize={{
                base: 'xs',
                md: 'sm',
                lg: 'md',
              }}
              bg={'gray.dark'}
              color={'gray.light'}
              p={1}
              borderRadius={'full'}
            >
              Threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {/* User's avatar */}
          {user.profilepic && (
            <Avatar
              size={{
                base: 'md',
                md: 'lg',
                lg: 'xl',
              }}
              name={user.name}
              src={user.profilepic}
            />
          )}
          {!user.profilepic && (
            <Avatar
              size={{
                base: 'md',
                md: 'lg',
                lg: 'xl',
              }}
              name={user.name}
              src="https://bit.ly/broken-link"
            />
          )}
        </Box>
      </Flex>

      {/* User's bio */}
      <Text>{user.bio}</Text>
      {/* update btn  */}
      {currentUser._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={'sm'}>Update Profile</Button>
        </Link>
      )}
      {currentUser._id !== user._id && (
        <Button onClick={handleFollowUnfollow} size={'sm'} isLoading={updating}>
          {following ? 'Unfollow' : 'Follow'}
        </Button>
      )}

      <Flex width={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          {/* User's follower count */}
          <Text color={'gray.light'}>{user.followers.length} Followers</Text>
          {/* Separator */}
          <Box w="1" h="1" bg={'gray.light'} borderRadius={'full'}></Box>
          {/* Link to user's Instagram profile */}
          <Link color={'gray.light'}>Instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon__container">
            {/* Instagram icon */}
            <BsInstagram size={24} cursor={'pointer'} />
          </Box>
          <Box className="icon__container">
            <Menu>
              <MenuButton>
                {/* More options icon */}
                <CgMoreO size={24} cursor={'pointer'} />
              </MenuButton>
              <Portal>
                <MenuList bg={'gray.dark'}>
                  {/* Copy Link menu item */}
                  <MenuItem bg={'gray.dark'} onClick={copyUrl}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex width={'full'}>
        <Flex flex={1} borderBottom={'1.5px solid white'} justifyContent={'center'} pb="3" cursor={'pointer'}>
          {/* Threads tab */}
          <Text fontWeight={'bold'}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          justifyContent={'center'}
          pb="3"
          cursor={'pointer'}
          color={'gray.light'}
        >
          {/* Replies tab */}
          <Text fontWeight={'bold'}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
