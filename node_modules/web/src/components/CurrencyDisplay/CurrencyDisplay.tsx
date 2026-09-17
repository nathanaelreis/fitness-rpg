import styles from "./CurrencyDisplay.module.css";
import { Wallet } from "@fitness-rpg/shared";

interface Props { wallet: Wallet; }

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString("pt-BR");
}

export function CurrencyDisplay({ wallet }: Props) {
  return (
    <div className={styles.container} role="region" aria-label="Carteira de moedas">
      <div className={styles.coin} data-type="grey" aria-label={`Pé Cinza: ${wallet.greyCoin}`}>
        <div className={`${styles.coinSprite} ${styles.spriteGrey}`} />
        <div className={styles.coinInfo}>
          <div className={styles.coinLabel}>Pé Cinza</div>
          <div className={styles.coinValue}>{fmt(wallet.greyCoin)}</div>
        </div>
      </div>

      <div className={styles.coin} data-type="blue" aria-label={`Pé Azul: ${wallet.blueCoin}`}>
        <div className={`${styles.coinSprite} ${styles.spriteBlue}`} />
        <div className={styles.coinInfo}>
          <div className={styles.coinLabel}>Pé Azul</div>
          <div className={styles.coinValue}>{fmt(wallet.blueCoin)}</div>
        </div>
      </div>
    </div>
  );
}
