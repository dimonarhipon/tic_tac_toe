import { GameSymbol } from "./game-symbol"
import clsx from "clsx"

export const GameCell = ({ isWinner, symbol, onClick }) => {
    return (
        <button
            className={clsx(
            'border border-gray-400 -ml-px flex items-center justify-center',
            isWinner && 'bg-red-400'
        )}
            onClick={onClick}
        >
        {symbol && <GameSymbol symbol={symbol} />}
        </button>
    )
}