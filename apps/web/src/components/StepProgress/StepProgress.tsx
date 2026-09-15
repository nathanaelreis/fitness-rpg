import { DailySteps, ChestType } from "@fitness-rpg/shared";
import styles from "./StepProgress.module.css";

interface Props { steps: DailySteps; }

const CHEST_LABEL: Record<ChestType, string> = {
  common:   "Bau Comum",
  uncommon: "Bau Incomum",
  rare:     "Bau Raro",
};
const CHEST_ICON: Record<ChestType, string> = {
  common:   "??",
  uncommon: "??",
  rare:     "??",
};

const T1_MAX = 5_000;
const T2_MAX = 10_000;
const T3_MAX = 25_000;
const CIRCUMFERENCE = 2 * Math.PI * 82;
const SEGMENT = CIRCUMFERENCE / 3;

function getCurrentTier(steps: number): "1" | "2" | "3" {
  if (steps <= T1_MAX) return "1";
  if (steps <= T2_MAX) return "2";
  return "3";
}

export function StepProgress({ steps }: Props) {
  const { current, nextRewardAt, nextRewardType } = steps;
  const remaining   = Math.max(0, nextRewardAt - current);
  const toRewardPct = Math.min(100, (current / nextRewardAt) * 100);
  const currentTier = getCurrentTier(current);

  const t1Fill = Math.min(1, current / T1_MAX);
  const t2Fill = current > T1_MAX ? Math.min(1, (current - T1_MAX) / (T2_MAX - T1_MAX)) : 0;
  const t3Fill = current > T2_MAX ? Math.min(1, (current - T2_MAX) / (T3_MAX - T2_MAX)) : 0;

  const t1Dash = `${SEGMENT * t1Fill} ${CIRCUMFERENCE - SEGMENT * t1Fill}`;
  const t2Dash = `${SEGMENT * t2Fill} ${CIRCUMFERENCE - SEGMENT * t2Fill}`;
  const t3Dash = `${SEGMENT * t3Fill} ${CIRCUMFERENCE - SEGMENT * t3Fill}`;

  const t2Offset = -(SEGMENT * 1);
  const t3Offset = -(SEGMENT * 2);

  return (
    <section className={styles.section} aria-label="Progresso de passos">
      <div className={styles.header}>
        <span className={styles.title}>Passos de Hoje</span>
        <span className={styles.subtitle}>
          Meta: {steps.goal.toLocaleString("pt-BR")} &bull; Cap: {steps.dailyCap.toLocaleString("pt-BR")}
        </span>
      </div>

      <div className={styles.ringContainer} aria-hidden="true">
        <svg className={styles.svg} viewBox="0 0 200 200" width="200" height="200">
          <circle className={styles.trackCircle} cx="100" cy="100" r="82" />
          <circle
            className={styles.tier1Circle}
            cx="100" cy="100" r="82"
            strokeDasharray={t1Dash}
            strokeDashoffset={0}
          />
          <circle
            className={styles.tier2Circle}
            cx="100" cy="100" r="82"
            strokeDasharray={t2Dash}
            strokeDashoffset={t2Offset}
          />
          <circle
            className={styles.tier3Circle}
            cx="100" cy="100" r="82"
            strokeDasharray={t3Dash}
            strokeDashoffset={t3Offset}
          />
        </svg>

        <div className={styles.centerContent}>
          <span className={styles.stepCount}>{current.toLocaleString("pt-BR")}</span>
          <span className={styles.stepLabel}>passos</span>
          <span className={styles.tierBadge} data-tier={currentTier}>
            {currentTier === "1" ? "1x XP" : currentTier === "2" ? "0.5x XP" : "0.25x XP"}
          </span>
        </div>
      </div>

      <div
        className={styles.rewardCard}
        role="status"
        aria-live="polite"
        aria-label={`Proxima recompensa em ${remaining.toLocaleString("pt-BR")} passos`}
      >
        <span className={styles.rewardIcon}>{CHEST_ICON[nextRewardType]}</span>
        <div className={styles.rewardInfo}>
          <div className={styles.rewardTitle}>{CHEST_LABEL[nextRewardType]}</div>
          <div className={styles.rewardDistance}>
            {remaining > 0
              ? `Faltam ${remaining.toLocaleString("pt-BR")} passos`
              : "Pronto para abrir!"}
          </div>
        </div>
        <span className={styles.rewardPct}>{toRewardPct.toFixed(0)}%</span>
      </div>

      <div className={styles.tiers} aria-label="Legenda de tiers">
        <span className={styles.tierItem}>
          <span className={styles.tierDot} style={{ background: "var(--tier-1-color)" }} />
          0-5k (1x XP)
        </span>
        <span className={styles.tierItem}>
          <span className={styles.tierDot} style={{ background: "var(--tier-2-color)" }} />
          5k-10k (0.5x)
        </span>
        <span className={styles.tierItem}>
          <span className={styles.tierDot} style={{ background: "var(--tier-3-color)" }} />
          10k+ (0.25x)
        </span>
      </div>
    </section>
  );
}
