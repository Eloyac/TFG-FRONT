import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/games/create`, {}, {
        headers: {
          'x-auth-token': token, // Enviar el token en los encabezados de la solicitud
        }
      });
      const { _id: gameId } = response.data;
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error('Error creating game', error);
    }
  };

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold">Welcome to FESACHESS</h1>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={createGame}>
        Create New Game
      </button>
    </div>
  );
};

export default Home;
