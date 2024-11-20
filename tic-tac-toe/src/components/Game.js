import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null)); // État pour les cases
  const [isXNext, setIsXNext] = useState(true); // État pour le joueur actuel (X ou O)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  const handleClick = (index) => {
    if (squares[index] || winner) return; // Empêcher de jouer sur une case déjà remplie ou si le jeu est terminé

    const nextSquares = squares.slice(); // Copie des cases
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <Board squares={squares} onClick={handleClick} />
      <div className="game-info">
        {winner ? (
          <p>Vainqueur : {winner}</p>
        ) : (
          <p>Prochain joueur : {isXNext ? "X" : "O"}</p>
        )}
      </div>
      <button onClick={resetGame} className="reset-button">
        Réinitialiser
      </button>
    </div>
  );
};

export default Game;
