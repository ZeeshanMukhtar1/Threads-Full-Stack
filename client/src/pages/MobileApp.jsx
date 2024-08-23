import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  Icon,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import Snowfall from 'react-snowfall';
import useShowToast from '../hooks/useShowToast';

export default function MobileApp() {
  const [email, setEmail] = useState('');
  const showToast = useShowToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}`);
    setEmail('');
    showToast('info', 'Thank you for joining our waitlist! 🚀', 'info');
  };

  return (
    <Box>
      <Snowfall
        snowflakeCount={150}
        color="white"
        style={{ position: 'fixed', width: '100vw', height: '100vh' }} // Cover the entire screen
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        height="100vh"
        width="100%"
      >
        {/* Left Image Section */}
        <Box
          flex="1"
          backgroundColor="light.dark"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
        >
          <ChakraImage
            src="/mobile-app.png"
            alt="Mobile App Screenshots"
            objectFit="contain"
            objectPosition="center"
            marginTop={{ base: 4, md: 12 }}
            paddingX={14}
            height="full"
            width="full"
          />
        </Box>

        {/* Right Content Section */}
        <Flex
          flex="1"
          direction="column"
          justify="center"
          paddingX={6}
          paddingBottom={10}
          marginTop={8}
        >
          <Heading
            as="h1"
            fontWeight="semibold"
            color="zinc.900"
            fontSize={{ base: '2xl', md: '3xl' }}
            lineHeight="tight"
            maxWidth="lg"
          >
            Get the Thread App on your mobile device!
          </Heading>
          <Text color="gray.500" marginTop={4}>
            Join the waitlist to be notified when our app is available!
          </Text>

          <form
            onSubmit={handleSubmit}
            method="POST"
            style={{ marginTop: '16px' }}
          >
            <FormControl id="email-address">
              <Input
                type="email"
                placeholder="ZeeshanWebDev7@gmil.com"
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
                size="lg"
                fontSize={18}
                borderRadius="lg"
                borderColor="gray.300"
                focusBorderColor="zinc.300"
                _invalid={{ borderColor: 'red.400' }}
              />
            </FormControl>
            <Button
              type="submit"
              marginTop={4}
              size="lg"
              backgroundColor="blue.300"
              color="white"
              _hover={{ backgroundColor: 'zinc.700' }}
              width="full"
            >
              Join the waitlist
            </Button>
          </form>

          <Flex align="start" gap={2} color="gray.500" marginTop={4}>
            <Icon as={InfoOutlineIcon} />
            <Text fontSize="xs" maxWidth="sm">
              No worries! Your data is completely safe and will only be utilized
              to provide you with updates about our product.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
