import styles from "./StepProgress.module.css";
import { DailySteps } from "@fitness-rpg/shared";

export function StepProgress({ steps }: { steps: DailySteps }) {
  const percent = Math.min(100, Math.max(0, (steps.current / steps.goal) * 100));
  
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>Passos de Hoje</div>
        <div className={styles.subtitle}>Meta: {steps.goal.toLocaleString()} • Cap: {steps.dailyCap.toLocaleString()}</div>
      </div>
      <div className={styles.parchment}>
        <div className={styles.ringBg}>
          <div className={styles.ringFill} style={{ "--p": `${percent}%` } as React.CSSProperties} />
          <div className={styles.ringContent}>
            <div className={styles.stepsCurrent}>{steps.current.toLocaleString()}</div>
            <div className={styles.stepsLabel}>PASSOS</div>
            <div className={styles.stepsGoal}>{steps.goal.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
