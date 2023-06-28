import { useState } from "react";
import { SYMBOL_X, SYMBOL_O, CELL_MAX } from "./constants";

const computeWinner = (cells) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }
};

export const useGameState = () => {
  const [currentValue, setCurrentValue] = useState(SYMBOL_X);
  const [cells, setCells] = useState(Array(CELL_MAX).fill(null));
  const [winnerSequene, setWinnerSequene] = useState();

  const handleCellsClick = (index) => {
    if (cells[index] || winnerSequene) return;

    const copyCells = cells.slice();
    copyCells[index] = currentValue;

    const winner = computeWinner(copyCells);
    setCells(copyCells);

    setCurrentValue(currentValue === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
    setWinnerSequene(winner);
  };

  const handleResetClick = () => {
    setWinnerSequene(undefined);
    setCells(Array(CELL_MAX).fill(null));
    setCurrentValue(SYMBOL_X);
  };

  const winnerSymbol = winnerSequene ? cells[winnerSequene[0]] : undefined;
  const isDraw =
    !winnerSequene && cells.filter((value) => value).length === CELL_MAX;

  return {
    currentValue,
    cells,
    winnerSequene,
    handleCellsClick,
    handleResetClick,
    winnerSymbol,
    isDraw,
  };
};
