import React, { useState } from 'react';
import {
  Button,
  Flex,
  Image,
  Link,
  useColorMode,
  Input,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { IoHomeSharp } from 'react-icons/io5';
import { IoPersonCircle } from 'react-icons/io5';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import useLogout from '../hooks/useLogout';
import authScreenAtom from '../atoms/authAtom';
import { BsChatHeartFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoSearchSharp } from 'react-icons/io5';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const navigate = useNavigate();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Redirect to the user profile page with the searched username
    // window.location.href = `/${searchQuery}`; // This will reload the page
    navigate(`/${searchQuery}`); // This will not reload the page and is faster than window.location.href 😉
    // reset the search query
    setSearchQuery('');
  };

  const handleEnterkey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
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

      {/* Search Input */}
      <Flex alignItems="center">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleEnterkey}
          mr={2}
        />
        <Button onClick={handleSearch} size="sm">
          <IoSearchSharp size={20} />
        </Button>
      </Flex>

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
