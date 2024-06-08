import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { socket } from '../socket';
import axios from 'axios';

const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState('w');
  const [player1Name, setPlayer1Name] = useState('Jugador 1');
  const [player2Name, setPlayer2Name] = useState('Jugador 2');
  const [userColor, setUserColor] = useState('w');

  const handleMove = useCallback((sourceSquare, targetSquare) => {
    if (game.turn() !== userColor) {
      console.log("Not your turn");
      return;
    }

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
  }, [game, gameId, userColor]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    socket.auth = { token };
    socket.connect();

    socket.emit('joinGame', gameId);

    socket.on('move', (data) => {
      console.log('Move received:', data);
      const newGame = new Chess();
      newGame.load(data.fen);
      setGame(newGame);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId]);

  useEffect(() => {
    const fetchGameAndPlayers = async () => {
      try {
        const gameResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${gameId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        const savedGame = new Chess(gameResponse.data.boardState);
        if (!savedGame.load(gameResponse.data.boardState)) {
          console.error("Error loading FEN:", gameResponse.data.boardState);
          return;
        }
        setGame(savedGame);

        const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user.id;

        const player1Promise = axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/${gameResponse.data.player1}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });

        const player2Promise = gameResponse.data.player2
          ? axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/${gameResponse.data.player2}`, {
              headers: { 'x-auth-token': localStorage.getItem('token') }
            })
          : Promise.resolve({ data: { name: 'Jugador 2' } });

        const [player1Response, player2Response] = await Promise.all([player1Promise, player2Promise]);
        setPlayer1Name(player1Response.data.name);
        setPlayer2Name(player2Response.data.name);

        if (gameResponse.data.player1 === userId) {
          setColor('w');
          setUserColor('w');
        } else {
          setColor('b');
          setUserColor('b');
        }
      } catch (err) {
        console.error('Error fetching game or user:', err);
      }
    };

    fetchGameAndPlayers();
  }, [gameId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">{userColor === 'w' ? player1Name : player2Name}</h2>
          <Chessboard
            position={game.fen()}
            onPieceDrop={(sourceSquare, targetSquare) => handleMove(sourceSquare, targetSquare)}
            orientation={userColor === 'w' ? 'white' : 'black'}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{userColor === 'w' ? player2Name : player1Name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Game;
