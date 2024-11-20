import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = (onMessage) => {
  useEffect(() => {
    const socket = io('http://localhost:3000'); // URL do seu backend

    socket.on('cartaoCreated', (data) => {
      onMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onMessage]);
};

export default useWebSocket;