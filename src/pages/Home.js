import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');

  const createGame = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post(`https://tfg-back.onrender.com/api/games/create`, {}, {
        headers: {
          'x-auth-token': token, // Enviar el token en los encabezados de la solicitud
        }
      });
      const { _id: gameId } = response.data;
      // Redirigir a la sala de la partida
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error('Error creating game', error);
    }
  };

  const joinGame = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post(`https://tfg-back.onrender.com/api/games/join`, 
        { gameId }, 
        { headers: { 'x-auth-token': token } }
      );
      navigate(`/game/${gameId}`);
    } catch (err) {
      console.error('Error joining game:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to FESACHESS</h1>
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={createGame}>
          Create New Game
        </button>
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={gameId} 
            onChange={(e) => setGameId(e.target.value)} 
            placeholder="Enter Game ID" 
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button 
            onClick={joinGame} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
