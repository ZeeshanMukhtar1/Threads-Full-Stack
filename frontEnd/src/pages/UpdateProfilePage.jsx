'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
// import userAtom from '../atoms/userAtom';
import userAtom from '../Atoms/userAtom';
import { useRecoilState } from 'recoil';
import usePreviewImg from '../Hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';
// import showToast from '../Hooks/useShowToast';
// import useShowToast from '../Hooks/useShowToast.js';

export default function UserProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [updating, setupdating] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: user.name,
    userName: user.username,
    email: user.email,
    bio: user.bio,
    password: '',
  });

  console.log(user);
  const fileRef = useRef(null);
  const showToast = useShowToast();
  const { handleImageChange, imgUrl } = usePreviewImg();

  const handlesubmit = async (e) => {
    if (updating) return;
    setupdating(true);
    e.preventDefault();
    try {
      // console.log(inputs);
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });

      const data = await res.json();
      // console.log(data);
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      showToast('Success', 'Profile updated successfully', 'success');
      setUser(data);
      localStorage.setItem('user-threads', JSON.stringify(data));
    } catch (error) {
      showToast('Error', error, 'error');
    } finally {
      setupdating(false);
    }
  };

  return (
    <form onSubmit={handlesubmit}>
      <Flex align={'center'} justify={'center'} my={6}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl isRequired>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" boxShadow={'md'} src={imgUrl || user.profilePic} />
              </Center>
              <Center w="full">
                <Button
                  w="full"
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  Change Avatar
                </Button>
                <input type="file" hidden ref={fileRef} onClick={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="John Doe"
              _placeholder={{ color: 'gray.500' }}
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="JohnDoe123"
              _placeholder={{ color: 'gray.500' }}
              value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Johndoe@gmail.com"
              _placeholder={{ color: 'gray.500' }}
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Biography here"
              _placeholder={{ color: 'gray.500' }}
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={updating}
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
