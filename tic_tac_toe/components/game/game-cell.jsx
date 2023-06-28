import { GameSymbol } from "./game-symbol";
import styles from "./style.module.css";

export const GameCell = ({ isWinner, symbol, onClick }) => {
  return (
    <button
      className={`${styles["cell"]} ${isWinner ? styles["cell--winner"] : ""}`}
      onClick={onClick}
    >
      {symbol && <GameSymbol symbol={symbol} />}
    </button>
  );
};
