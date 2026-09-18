import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockActions } from "../../mocks/gameData";
import styles from "./Event.module.css";

const BOSS_HP_PERCENT = 89;
const TOP_5 = [
  { name: "ArcaneSlayer", lv: 19, dmg: "250M", pos: 1 },
  { name: "DragonFist",   lv: 15, dmg: "210M", pos: 2 },
  { name: "StoneClaD",    lv: 13, dmg: "180M", pos: 3 },
  { name: "WhisperWind",  lv: 19, dmg: "150M", pos: 4 },
  { name: "ShadowFang",   lv: 19, dmg: "120M", pos: 5 },
];

export function Event() {
  return (
    <div className={styles.page}>

      <div className={styles.mainBoard}>
        <div className={styles.boardTitle}>EVENTO: BOSS MUNDIAL – ENTRADA</div>

        {/* ARTE DO BOSS */}
        <div className={styles.bossArt}>
          <div className={styles.bossBg} />
          <div className={styles.bossEmoji}>🐉</div>
          <div className={styles.playerBoss}>🧙</div>
          <div className={styles.bossLabel}>⭐ Guerreiro</div>
        </div>

        {/* BARRA DE HP */}
        <div className={styles.hpSection}>
          <div className={styles.hpTitle}>HP Atual do Boss: {BOSS_HP_PERCENT}%</div>
          <div className={styles.hpBarBg}>
            <div className={styles.hpBarFill} style={{ width: `${BOSS_HP_PERCENT}%` }} />
            <div className={styles.hpText}>(890,000,000 / 1,000,000,000)</div>
          </div>
          <div className={styles.collapseTimer}>⚠️ EVENTO ENTRA EM COLAPSO: 04h 32m</div>
        </div>

        {/* RANKING */}
        <div className={styles.bottomSection}>

          {/* MEU RANKING */}
          <div className={styles.myRankCard}>
            <div className={styles.myRankTitle}>MEU RANKING ATUAL</div>
            <div className={styles.myAvatar}>😶</div>
            <div className={styles.myName}>Guerreiro Iniciante</div>
            <div className={styles.myRankPos}>RANK: #1,234 ☠️</div>
            <div className={styles.myBestAttempt}>MELHOR TENTATIVA:</div>
            <div className={styles.myBestAttempt}>4.5M DAN</div>
          </div>

          {/* TOP 5 GLOBAL */}
          <div className={styles.top5Card}>
            <div className={styles.top5Title}>TOP 5 RANKING GLOBAL</div>
            {TOP_5.map((p) => (
              <div key={p.name} className={styles.rankRow}>
                <div className={styles.rankPos} data-top={p.pos}>
                  {p.pos === 1 ? '🥇' : p.pos === 2 ? '🥈' : p.pos === 3 ? '🥉' : p.pos}
                </div>
                <div className={styles.rankAvatar}>🎭</div>
                <div className={styles.rankInfo}>
                  <div className={styles.rankName}>{p.name}</div>
                  <div className={styles.rankDmg}>Lv. {p.lv} · DANO: {p.dmg}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BOTÃO CTA */}
        <div className={styles.enterBtn}>⚔️ ENTRAR NA BATALHA ⚔️</div>
      </div>

      <ActionHub actions={mockActions} />
    </div>
  );
}
