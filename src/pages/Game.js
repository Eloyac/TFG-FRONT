import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { socket } from '../socket';
import axios from 'axios';
import Chat from './Chat';

const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState('w');

  useEffect(() => {
    const token = localStorage.getItem('token');

    socket.auth = { token };
    socket.connect();

    socket.emit('joinGame', gameId);

    socket.on('move', (move) => {
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId]);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await axios.get(`https://tfg-back.onrender.com/api/games/${gameId}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      const savedGame = new Chess(response.data.boardState);
      setGame(savedGame);
      
      // Determina el color del jugador
      const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user.id;
      if (response.data.player1 === userId) {
        setColor('w');
      } else {
        setColor('b');
      }
    };

    fetchGame();
  }, [gameId]);

  const handleMove = (sourceSquare, targetSquare) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    if (move === null) return;

    setGame(newGame);

    socket.emit('move', {
      gameId,
      move,
      fen: newGame.fen(),
      turn: newGame.turn(),
      result: newGame.game_over() ? (newGame.in_checkmate() ? 'checkmate' : 'draw') : 'ongoing',
    });
  };

  return (
    <div>
      <h1>Game</h1>
      <Chessboard
        position={game.fen()}
        onPieceDrop={(sourceSquare, targetSquare) => handleMove(sourceSquare, targetSquare)}
        orientation={color === 'w' ? 'white' : 'black'}
      />
      <Chat gameId={gameId} />
    </div>
  );
};

export default Game;
