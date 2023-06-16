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

const useGameState = () => {
  const [currentValue, setCurrentValue] = useState(SYMBOL_X);
  const [ceils, setCeils] = useState(Array(CEIL_MAX).fill(null));
  const [winnerSequene, setWinnerSequene] = useState();

  const handleCeilsClick = (index) => {
    if (ceils[index] || winnerSequene) return;

    const copyCeils = ceils.slice();
    copyCeils[index] = currentValue;

    const winner = computeWinner(copyCeils);
    setCeils(copyCeils);

    setCurrentValue(currentValue === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
    setWinnerSequene(winner);
  }

  const handleResetClick = () => {
    setWinnerSequene(undefined);
    setCeils(Array(CEIL_MAX).fill(null));
    setCurrentValue(SYMBOL_X);
  }

  const winnerSymbol = winnerSequene ? ceils[winnerSequene[0]] : undefined
  const isDraw = !winnerSequene && ceils.filter(value => value).length === CEIL_MAX;

  return {
    currentValue,
    ceils,
    winnerSequene,
    handleCeilsClick,
    handleResetClick,
    winnerSymbol,
    isDraw
  }
}

function App() {
  const {
    currentValue,
    ceils,
    winnerSequene,
    handleCeilsClick,
    handleResetClick,
    winnerSymbol,
    isDraw
  } = useGameState();
  return (
    <main className="main">
      <GameInfo isDraw={isDraw} winnerSymbol={winnerSymbol} currentValue={currentValue} />
      <div className='ceils'>{ceils.map((symbol, index) => {
        return (
          <GameCeil
            key={index}
            isWinner={winnerSequene?.includes(index)} 
            symbol={symbol}
            onClick={() => handleCeilsClick(index)}
          />
        )
      })}
      </div>
      <button onClick={handleResetClick}>Начать сначала</button>    
    </main>
  )
}

const GameInfo = (props) => {
  const {isDraw, winnerSymbol, currentValue} = props;
  console.log(props);
  if (isDraw) {
    return <div className="game-info">Ничья</div>
  }

  if (winnerSymbol) {
    console.log(winnerSymbol)
    return <div className="game-info">
      Победитель: <GameSymbol symbol={winnerSymbol} />
    </div>
  }

  return <div className="game-info">
    Ход: <GameSymbol symbol={currentValue} />
  </div>
}

const GameCeil = ({ isWinner, symbol, onClick }) => {
  return (
    <button
      className={`ceil ${isWinner ? 'ceil--winner' : ''}`}
      onClick={onClick}
    >
      {symbol && <GameSymbol symbol={symbol} />}
    </button>
  )
}

const GameSymbol = ({ symbol }) => {
  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return 'symbol--o';
    if (symbol === SYMBOL_X) return 'symbol--x';
    return '';
  }
  return <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
}

export default App
