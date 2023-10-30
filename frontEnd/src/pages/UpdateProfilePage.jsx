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
import userAtom from '../atoms/userAtom';
import { useRecoilState } from 'recoil';

export default function UserProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    fullName: user.name,
    userName: user.username,
    email: user.email,
    bio: user.bio,
    password: user.password,
  });
  console.log(user);
  const fileRef = useRef(null);
  return (
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
        <FormControl>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={'md'} src={user.profilePic} />
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
              <input type="file" hidden ref={fileRef} />
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
        <FormControl isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Biography here"
            _placeholder={{ color: 'gray.500' }}
            value={inputs.bio}
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
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
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
