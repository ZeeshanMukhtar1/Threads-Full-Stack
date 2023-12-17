import { Flex, Image, Link, useColorMode } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../Atoms/userAtom';
import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { Link as routerLink } from 'react-router-dom';

const Header = () => {
  // Getting the current color mode and the function to toggle it
  // this hook is from Chakra UI and it's used to get the current color mode and the function to toggle it
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    // Displaying a flex container with centered content and spacing
    <Flex justifyContent="space-between" mt={6} mb="12">
      {user && (
        <Link as={routerLink} to="/">
          <AiFillHome size={24} />
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
        <Link as={routerLink} to={`/${user.username}`}>
          <RxAvatar size={24} />
        </Link>
      )}
    </Flex>
  );
};

export default Header;
