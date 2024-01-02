// Importing necessary dependencies and hooks
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

// SettingsPage component for handling account freeze functionality
export const SettingsPage = () => {
  // Custom hook for displaying toasts
  const showToast = useShowToast();
  // Custom hook for user logout
  const logout = useLogout();
  // Chakra UI hook for managing modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function for handling the account freeze
  const handleFreezeAccount = async () => {
    onClose(); // Closing the modal

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

  // Function for opening the freeze account modal
  const freezeAccount = () => {
    onOpen(); // Opening the modal
  };

  return (
    <VStack spacing={4} align="center" justify="center">
      {/* Heading for the Freeze Your Account section */}
      <Heading as="h2" size="lg" fontWeight="bold">
        Freeze Your Account
      </Heading>
      {/* Description text for the Freeze Your Account section */}
      <Text
        fontSize="sm"
        textAlign="center"
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        Temporarily deactivate your account. You can unfreeze it anytime by
        logging in. Your data will be preserved!
      </Text>
      {/* Button to initiate the account freeze process */}
      <Button colorScheme="red" onClick={freezeAccount}>
        Freeze Account
      </Button>

      {/* Chakra UI Modal for confirming account freeze */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          {/* Header for the modal */}
          <ModalHeader>Confirm Account Freeze</ModalHeader>
          <ModalBody>
            {/* Modal body content */}
            Are you sure you want to freeze your account? Your data will be
            preserved, and you can unfreeze it anytime by logging in, See you
            Soon!
          </ModalBody>
          {/* Modal footer with cancel and confirm buttons */}
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
