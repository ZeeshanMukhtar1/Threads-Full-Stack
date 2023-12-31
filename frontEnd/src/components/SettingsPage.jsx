import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import useShowToast from '../hooks/useShowToast';
import useLogout from '../hooks/useLogout';

export const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();

  const freezeAccount = async () => {
    if (!window.confirm('Are you sure you want to freeze your account?')) return;

    try {
      const res = await fetch('/api/user/freeze', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (data.error) {
        showToast('Error', data.error, 'error');
      } else if (data.success) {
        logout();
        showToast('Success', data.success, 'success');
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

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
