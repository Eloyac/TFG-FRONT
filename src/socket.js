import { io } from 'socket.io-client';

const SOCKET_URL = 'https://tfg-back.onrender.com'; // Actualiza la URL para que coincida con el backend en Render

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
