import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { socket } from '../socket';
import { useParams } from 'react-router-dom';
import Chat from './Chat';
import axios from 'axios';

const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    socket.connect();

    socket.on('move', (move) => {
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
    });

    return () => {
      socket.disconnect();
    };
  }, [game]);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await axios.get(`https://tfg-back.onrender.com/api/games/${gameId}`);
      const savedGame = new Chess(response.data.boardState);
      setGame(savedGame);
    };

    fetchGame();
  }, [gameId]);

  const handleResult = (game) => {
    if (game.in_checkmate()) {
      if (game.turn() === 'b') {
        // Player 1 (white) wins
        return 'player1';
      } else {
        // Player 2 (black) wins
        return 'player2';
      }
    } else if (game.in_draw()) {
      return 'draw';
    }
    return 'ongoing';
  };

  const handleMove = (sourceSquare, targetSquare) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    if (move === null) return;

    const result = handleResult(newGame);
    setGame(newGame);
    socket.emit('move', { gameId, move, fen: newGame.fen(), turn: newGame.turn(), result });
  };

  return (
    <div>
      <h1>Game</h1>
      <Chessboard
        position={game.fen()}
        onPieceDrop={(sourceSquare, targetSquare) => handleMove(sourceSquare, targetSquare)}
      />
      <Chat gameId={gameId} />
    </div>
  );
};

export default Game;
