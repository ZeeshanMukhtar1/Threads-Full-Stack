import { Button, Flex, Image, Link, useColorMode } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { IoHomeSharp } from 'react-icons/io5';
import { IoPersonCircle } from 'react-icons/io5';
import { Link as RouterLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import useLogout from '../hooks/useLogout';
import authScreenAtom from '../atoms/authAtom';
import { BsChatHeartFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={'space-between'} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <IoHomeSharp size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={'/auth'}
          onClick={() => setAuthScreen('login')}
        >
          Login
        </Link>
      )}

      <Image
        cursor={'pointer'}
        alt="logo"
        w={6}
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        onClick={toggleColorMode}
      />

      {user && (
        <Flex alignItems={'center'} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <IoPersonCircle size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsChatHeartFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <IoSettingsSharp size={20} />
          </Link>
          <Button size={'xs'} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={'/auth'}
          onClick={() => setAuthScreen('signup')}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
