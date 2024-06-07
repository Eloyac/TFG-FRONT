import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();

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

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await axios.post(`https://tfg-back.onrender.com/api/games/join`, 
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
        <button 
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4" 
          onClick={createGame}
        >
          Create New Game
        </button>
        <input 
          type="text" 
          value={gameId} 
          onChange={(e) => setGameId(e.target.value)} 
          placeholder="Enter Game ID" 
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleJoin}
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default Home;
