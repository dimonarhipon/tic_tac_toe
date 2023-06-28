import { GameSymbol } from "./game-symbol"
import styles from './style.module.css'

export const GameInfo = (props) => {
    const {isDraw, winnerSymbol, currentValue} = props;
    if (isDraw) {
        return <div className={styles['game-info']}>Ничья</div>
    }

    if (winnerSymbol) {
        return <div className={styles['game-info']}>
        Победитель: <GameSymbol symbol={winnerSymbol} />
        </div>
    }

    return <div className={styles['game-info']}>
        Ход: <GameSymbol symbol={currentValue} />
    </div>
}