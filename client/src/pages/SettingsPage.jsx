import {
  Button,
  Text,
  VStack,
  Center,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';
import useLogout from '../hooks/useLogout';

export const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();

  const freezeAccount = async () => {
    if (!window.confirm('Are you sure you want to freeze your account?'))
      return;

    try {
      const res = await fetch('/api/users/freeze', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) {
        return showToast('Error', data.error, 'error');
      }
      if (data.success) {
        await logout();
        showToast(
          'Success',
          'Your account has been temporarily deactivated',
          'success'
        );
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center">
      <Heading as="h2" size="lg" fontWeight="bold">
        Freeze Your Account
      </Heading>
      <Text
        fontSize="sm"
        textAlign="center"
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        Temporarily deactivate your account. You can unfreeze it anytime by
        logging in. your data will be preserved!
      </Text>
      <Button colorScheme="red" onClick={freezeAccount}>
        Freeze Account
      </Button>
    </VStack>
  );
};
