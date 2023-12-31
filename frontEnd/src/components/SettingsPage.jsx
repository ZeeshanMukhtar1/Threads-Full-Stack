import { Button, Text } from '@chakra-ui/react';
import React from 'react';

export const SettingsPage = () => {
  const freezeAccount = async () => {};
  return (
    <>
      <Text my={1} fontWeight={'bold'}>
        Freeze Your Account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by logging in again..!</Text>
      <Button size={'sm'} colorScheme={'red'} onClick={freezeAccount}>
        {' '}
        Freeze
      </Button>
    </>
  );
};
