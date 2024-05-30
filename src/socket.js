import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Asegúrate de que el puerto coincida con el backend

const token = localStorage.getItem('token');

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  query: { token },
});

socket.on('connect', () => {
  console.log('Connected to socket.io server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket.io server');
});
