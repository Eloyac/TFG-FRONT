import React, { useState } from 'react';
import { Chessboard } from '@react-chessboard/react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  const handleMove = (move) => {
    const newGame = { ...game };
    const result = newGame.move({
      from: move.sourceSquare,
      to: move.targetSquare,
      promotion: 'q',
    });

    if (result) {
      setGame(newGame);
      setFen(newGame.fen());
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Chessboard
        position={fen}
        onPieceDrop={(sourceSquare, targetSquare) => handleMove({ sourceSquare, targetSquare })}
      />
    </div>
  );
};

export default ChessboardComponent;
