import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async () => {
    // if name has special characters like ... and emoty spaces then show error
    if (inputs.name.match(/[^a-zA-Z0-9 ]/)) {
      showToast('Error', 'Name must not contain special characters', 'error');
      return;
    }

    // name validation criteria
    if (inputs.name.length < 3) {
      showToast('Error', 'Name must be at least 3 characters long', 'error');
      return;
    }

    // username validation criteria
    const usernameRegex = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    if (!usernameRegex.test(inputs.username)) {
      showToast(
        'Error',
        'Username must be at least 5 characters long and contain at least one letter and one number',
        'error'
      );
      return;
    }

    // email validation criteria
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputs.email)) {
      showToast('Error', 'Invalid email address', 'error');
      return;
    }
    // security breach check for password
    const commonlyUsedPasswords = [
      'password',
      '12345678',
      'qwertyui',
      'admin',
      'admin123',
      'test',
      'test123',
      'hellow world',
    ];
    if (commonlyUsedPasswords.includes(inputs.password)) {
      showToast(
        'Error',
        'This password has been found as part of a breach and can not be used, please try another password instead!',
        'error'
      );
      return;
    }

    // Password validation criteria
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(inputs.password)) {
      showToast(
        'Error',
        'Password must be at least 8 characters long and contain at least one letter, one number and one special character',
        'error'
      );
      return;
    }

    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }

      localStorage.setItem('user-threads', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast('Error', error, 'error');
    }
  };

  const handleEnterkey = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <Flex
      backgroundImage="url(https://static.cdninstagram.com/rsrc.php/yC/r/jxB9GUOHTf2.webp)"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {/* Sign up */}
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  value={inputs.password}
                  onKeyUp={handleEnterkey}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.600', 'gray.700')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.700', 'gray.800'),
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} onClick={() => setAuthScreen('login')}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
