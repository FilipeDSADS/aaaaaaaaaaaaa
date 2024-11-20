import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = (onMessage) => {
    useEffect(() => {
        const socket = io('http://localhost:3000'); // URL do seu backend

        socket.on('cartaoCreated', (data) => {
            onMessage(data); // Chama a função para atualizar o estado com a nova tarefa
        });

        socket.on('cartaoUpdated', (data) => {
            onMessage(data); // Atualiza o estado com a tarefa atualizada
        });

        socket.on('cartaoRemoved', (data) => {
            onMessage(data); // Atualiza o estado para remover a tarefa
        });

        return () => {
            socket.disconnect(); // Desconecta ao desmontar o componente
        };
    }, [onMessage]);
};

export default useWebSocket;