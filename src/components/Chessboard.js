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
      promotion: 'q', // siempre promociona a una reina por simplicidad
    });

    if (result) {
      setGame(newGame);
      setFen(newGame.fen());
    }
  };

  return (
    <div>
      <Chessboard
        position={fen}
        onPieceDrop={(sourceSquare, targetSquare) =>
          handleMove({ sourceSquare, targetSquare })
        }
      />
    </div>
  );
};

export default ChessboardComponent;
