import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const NotFoundPage = ({ text }) => {
  return (
    <Box textAlign="center" mt="8">
      <Text fontSize="2xl" fontWeight="bold">
        404 - Not Found 🤷
      </Text>
      <Text mt="4">{text}</Text>
    </Box>
  );
};

export default NotFoundPage;
