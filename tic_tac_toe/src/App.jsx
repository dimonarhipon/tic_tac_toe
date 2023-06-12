import { useState } from 'react';
import './App.css'

const SYMBOL_X = 'X';
const SYMBOL_O = 'O';
const CEIL_MAX = 9;

const computeWinner = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      cells[a] &&
      cells[a] === cells[b] &&
      cells[a] === cells[c]
    ) {
      return [a, b, c]
    }
  }
}

function App() {
  const [currentValue, setCurrentValue] = useState(SYMBOL_X);
  const [ceils, setCeils] = useState(Array(CEIL_MAX).fill(null));
  const [winnerSequene, setWinnerSequene] = useState(undefined);

  const handleCeilsClick = (index) => {
    if (ceils[index] || winnerSequene) return;

    const copyCeils = ceils.slice();
    copyCeils[index] = currentValue;
    setCeils(copyCeils);

    const winner = computeWinner(copyCeils);
    setCurrentValue(currentValue === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
    setWinnerSequene(winner);
    console.log(winnerSequene)
  }

  const handleResetClick = () => {
    setWinnerSequene(undefined);
    setCeils(Array(CEIL_MAX).fill(null));
    setCurrentValue(SYMBOL_X);
  }

  const isDraw = !winnerSequene && ceils.filter(value => value).length === CEIL_MAX;

  return (
    <div className="">
      <div className="">
        {isDraw ? 'Ничья' : winnerSequene ? `Победили ` : `Ход `}
        {!isDraw && currentValue}
      </div>
      <div className='ceils'>{ceils.map((item, index) => {
        const isWinner = winnerSequene?.includes(index);
        return (
          <button
            className={`ceil ${isWinner ? 'ceil--winner' : ''}`}
            key={index}
            onClick={() => handleCeilsClick(index)}
          >
            <span>{item}</span>
          </button>
        )
      })}
      </div>
      <button onClick={handleResetClick}>Начать сначала</button>    
    </div>
  )
}

export default App
