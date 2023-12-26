import { createContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      query: {
        userId: user?._id,
      },
    });
    setsocket(socket);
    return () => socket.close();
  }, [user?._id]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
