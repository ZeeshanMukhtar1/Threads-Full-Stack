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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import '../../styles/global.scss';

const UserHeader = () => {
  // Initialize the toast notification system
  const toast = useToast();

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

  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          {/* User's name */}
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={'center'}>
            {/* User's username */}
            <Text fontSize={'sm'}>Zuc1122</Text>
            {/* User's organization or label */}
            <Text fontSize={'xs'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={'full'}>
              Threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {/* User's avatar */}
          <Avatar size={'xl'} name={'Mark Zuckerberg'} src="/zuck-avatar.png" />
        </Box>
      </Flex>

      {/* User's bio */}
      <Text>Co-founder and CEO of Facebook, American media magnate, internet entrepreneur, and philanthropist.</Text>

      <Flex width={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          {/* User's follower count */}
          <Text color={'gray.light'}>9M Followers</Text>
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
