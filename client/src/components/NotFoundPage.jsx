// NotFoundPage.jsx
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const NotFoundPage = ({ text, textSize }) => {
  return (
    <Box textAlign="center" mt="8" mx={'auto'}>
      <Text fontSize="2xl" fontWeight="bold">
        404 - Not Found 🤷
      </Text>
      <Text mt="4" fontSize={textSize}>
        {text}
      </Text>
    </Box>
  );
};

export default NotFoundPage;
