import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const useShowToast = () => {
  const toast = useToast();
  const ShowToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast],
  );
  return ShowToast;
};

export default useShowToast;
