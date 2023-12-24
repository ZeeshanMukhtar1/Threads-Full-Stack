import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { IoSendSharp } from 'react-icons/io5';

export const MessageInput = () => {
  return (
    <form>
      <InputGroup>
        <Input w={'full'} placeholder="Type your message here..." />
        <InputRightElement>
          <IoSendSharp size={20} />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
