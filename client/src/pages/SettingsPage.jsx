import React from 'react';
import {
  Button,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';
import useLogout from '../hooks/useLogout';

export const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFreezeAccount = async () => {
    onClose(); // Close the modal

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

  const freezeAccount = () => {
    onOpen(); // Open the modal
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
        logging in. Your data will be preserved!
      </Text>
      <Button colorScheme="red" onClick={freezeAccount}>
        Freeze Account
      </Button>
      {/* if (!window.confirm('Are you sure you want to freeze your account?')) */}
      {/* Chakra UI Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Account Freeze</ModalHeader>
          <ModalBody>
            Are you sure you want to freeze your account? Your data will be
            preserved, and you can unfreeze it anytime by logging in.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleFreezeAccount}>
              Confirm Freeze
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
