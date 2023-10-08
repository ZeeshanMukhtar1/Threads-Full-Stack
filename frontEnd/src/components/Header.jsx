import { Flex, Image, useColorMode } from '@chakra-ui/react';

const Header = () => {
  // Getting the current color mode and the function to toggle it
  // this hook is from Chakra UI and it's used to get the current color mode and the function to toggle it
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    // Displaying a flex container with centered content and spacing
    <Flex justifyContent="center" mt={6} mb="12">
      {/* Rendering an image that changes based on the current color mode */}
      <Image
        cursor="pointer"
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        alt="logo"
        w={6}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
