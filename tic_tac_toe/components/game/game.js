import { GameInfo } from './game-info'
import { GameCell } from './game-cell'
import { useGameState } from './use-game-state'
import styles from './style.module.css'


export const Game = () => {
    const {
        currentValue,
        cells,
        winnerSequene,
        handleCellsClick,
        handleResetClick,
        winnerSymbol,
        isDraw
    } = useGameState();
    return (
        <main className={styles['main']}>
        <GameInfo isDraw={isDraw} winnerSymbol={winnerSymbol} currentValue={currentValue} />
        <div className={styles['cells']}>{cells.map((symbol, index) => {
            return (
            <GameCell
                key={index}
                isWinner={winnerSequene?.includes(index)} 
                symbol={symbol}
                onClick={() => handleCellsClick(index)}
            />
            )
        })}
        </div>
        <button className={styles['reset']} onClick={handleResetClick}>Начать сначала</button>    
        </main>
    )
}