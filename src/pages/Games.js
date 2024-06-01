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
    <div>
      <h1>My Games</h1>
      {error && <p>{error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            Game between {game.player1} and {game.player2} - Result: {game.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
