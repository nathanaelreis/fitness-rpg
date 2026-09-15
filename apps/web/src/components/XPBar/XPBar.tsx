import { useEffect, useRef, useState } from "react";
import styles from "./XPBar.module.css";

interface Props {
  currentXP:     number;
  xpToNextLevel: number;
  level:         number;
}

function formatXP(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString("pt-BR");
}

export function XPBar({ currentXP, xpToNextLevel, level }: Props) {
  const pct = Math.min(100, (currentXP / xpToNextLevel) * 100);
  const [animated, setAnimated] = useState(false);
  const prevXP = useRef(currentXP);

  useEffect(() => {
    if (currentXP !== prevXP.current) {
      setAnimated(true);
      const t = setTimeout(() => setAnimated(false), 700);
      prevXP.current = currentXP;
      return () => clearTimeout(t);
    }
  }, [currentXP]);

  return (
    <div className={styles.container} role="region" aria-label="Progresso de XP">
      <div className={styles.header}>
        <span className={styles.label}>Nível {level}</span>
        <div className={styles.values} aria-live="polite">
          <span className={styles.current}>{formatXP(currentXP)}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>{formatXP(xpToNextLevel)} XP</span>
          <span className={styles.percent}>{pct.toFixed(0)}%</span>
        </div>
      </div>

      <div className={styles.trackWrapper} role="progressbar" aria-valuenow={currentXP} aria-valuemin={0} aria-valuemax={xpToNextLevel} aria-label={`${pct.toFixed(0)}% para o próximo nível`}>
        <div className={styles.track} />
        <div
          className={`${styles.fill} ${animated ? styles.fillAnimate : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
