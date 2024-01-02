// Importing the useToast hook from Chakra UI
import { useToast } from '@chakra-ui/toast';

// Importing the useCallback hook from React
import { useCallback } from 'react';

// Custom hook for displaying toasts using Chakra UI
const useShowToast = () => {
  // Initializing the useToast hook
  const toast = useToast();

  // Function to show a toast with the specified title, description, and status
  const showToast = useCallback(
    (title, description, status) => {
      // Calling the toast function with the specified parameters
      toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast] // Dependency array to ensure stable reference to the toast function
  );

  // Returning the showToast function for component usage
  return showToast;
};

// Exporting the custom hook for use in other components
export default useShowToast;
