import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from '../Atoms/messagesAtom';

export const MessageInput = ({ setMessages }) => {
  const [messageText, setmessageText] = useState('');
  const showToast = useShowToast();

  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationsAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
        return;
      }
      console.log(data);
      setMessages((messages) => [...messages, data]);

      // setting up sidebar msg to latest one using global state updation
      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
      setmessageText('');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={'full'}
          placeholder="Type your message here..."
          onChange={(e) => setmessageText(e.target.value)}
          value={messageText}
        />
        <InputRightElement onClick={handleSendMessage} cursor={'pointer'}>
          <IoSendSharp size={20} />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
