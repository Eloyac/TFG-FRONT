import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const response = await axios.post('https://tfg-back.onrender.com/api/games/create', {}, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        }
      });
      const { gameId } = response.data;
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error('Error creating game', error);
    }
  };

  return (
    <div>
      <h1>Welcome to FESACHESS</h1>
      <button onClick={createGame}>Create New Game</button>
    </div>
  );
};

export default Home;
