import { Button, Flex, Image, Link, useColorMode } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { Link as routerLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import userAtom from '../atoms/userAtom';
import useLogOut from '../Hooks/useLogOut';
import setAuthScreen from '../Atoms/authAtom';
import authScreenAtom from '../Atoms/authAtom';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { MdOutlineSettings } from 'react-icons/md';

const Header = () => {
  // Getting the current color mode and the function to toggle it
  // this hook is from Chakra UI and it's used to get the current color mode and the function to toggle it
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const user = useRecoilValue(userAtom);
  const logOut = useLogOut();
  return (
    // Displaying a flex container with centered content and spacing
    <Flex justifyContent="space-between" mt={6} mb="12">
      {user && (
        <Link as={routerLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link as={routerLink} to={'/auth'} onClick={() => setAuthScreen('login')}>
          Login
        </Link>
      )}
      {/* Rendering an image that changes based on the current color mode */}
      <Image
        cursor="pointer"
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        alt="logo"
        w={6}
        onClick={toggleColorMode}
      />
      {user && (
        <Flex alignItems={'center'} gap={4}>
          <Link as={routerLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={routerLink} to={`/chat`}>
            <IoChatbubbleEllipsesSharp size={20} />
          </Link>
          <Link as={routerLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>
          <Button size={'xs'} onClick={logOut}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link as={routerLink} to={'/auth'} onClick={() => setAuthScreen('signup')}>
          Register
        </Link>
      )}
    </Flex>
  );
};

export default Header;
