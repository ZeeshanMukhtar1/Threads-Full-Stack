import { useToast } from '@chakra-ui/react';

const useShowToast = () => {
  const toast = useToast();
  const ShowToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return ShowToast;
};

export default useShowToast;
