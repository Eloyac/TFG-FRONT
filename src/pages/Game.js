import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import axios from "axios";

const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    socket.connect();

    socket.emit("joinGame", gameId);

    socket.on("move", (move) => {
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
    });

    return () => {
      socket.disconnect();
    };
  }, [game, gameId]);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/games/${gameId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const savedGame = new Chess(response.data.boardState);
      setGame(savedGame);
    };

    fetchGame();
  }, [gameId]);

  const handleResult = (game) => {
    if (game.in_checkmate()) {
      if (game.turn() === "b") {
        return "player1";
      } else {
        return "player2";
      }
    } else if (game.in_draw()) {
      return "draw";
    }
    return "ongoing";
  };

  const handleMove = (sourceSquare, targetSquare) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (move === null) return;

    const result = handleResult(newGame);
    setGame(newGame);
    socket.emit("move", {
      gameId,
      move,
      fen: newGame.fen(),
      turn: newGame.turn(),
      result,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">player2</h1>
        <Chessboard
          position={game.fen()}
          onPieceDrop={(sourceSquare, targetSquare) =>
            handleMove(sourceSquare, targetSquare)
          }
        />
        <h1 className="text-2xl font-bold mb-4">player1</h1>
      </div>
      <Chat gameId={gameId} />
    </div>
  );
};

export default Game;
