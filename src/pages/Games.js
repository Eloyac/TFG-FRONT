import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Games = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/games/mygames`, {
          headers: { 'x-auth-token': token }
        });
        setGames(response.data);
      } catch (error) {
        setError('Error fetching games');
      }
    };

    fetchGames();
  }, [API_URL]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">My Games</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul>
          {games.map((game) => (
            <li key={game._id} className="mb-2">
              Game between {game.player1} and {game.player2} - Result: {game.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Games;
