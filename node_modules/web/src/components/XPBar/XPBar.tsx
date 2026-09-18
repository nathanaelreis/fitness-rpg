import styles from "./XPBar.module.css";

interface Props { currentXP: number; xpToNextLevel: number; level: number; }

export function XPBar({ currentXP, xpToNextLevel, level }: Props) {
  const percent = Math.min(100, Math.max(0, (currentXP / xpToNextLevel) * 100));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.level}>Nível {level}</span>
        <span className={styles.runes}>ᛏ ᚲ ᚱ ᚺ ᛗ ᛉ ᚦ</span>
        <span className={styles.xpText}>{currentXP} / {xpToNextLevel} XP {(percent).toFixed(0)}%</span>
      </div>
      <div className={styles.barBg}>
        <div className={styles.barFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
