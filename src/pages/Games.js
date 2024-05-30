import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Games = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/games/mygames', {
        headers: { 'x-auth-token': token },
      });
      setGames(response.data);
    };

    fetchGames();
  }, []);

  const handleCreateGame = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5000/api/games/create',
      { player2Id: 'some-player2-id' }, // Reemplaza con la lógica para seleccionar el oponente
      {
        headers: { 'x-auth-token': token },
      }
    );
    setGames([...games, response.data]);
  };

  const handleJoinGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Games</h1>
      <button onClick={handleCreateGame}>Create Game</button>
      <ul>
        {games.map((game) => (
          <li key={game._id} onClick={() => handleJoinGame(game._id)}>
            Game between {game.player1} and {game.player2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
