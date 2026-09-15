import { HeroSection }       from "../../components/HeroSection/HeroSection";
import { XPBar }             from "../../components/XPBar/XPBar";
import { StepProgress }      from "../../components/StepProgress/StepProgress";
import { CurrencyDisplay }   from "../../components/CurrencyDisplay/CurrencyDisplay";
import { ItemCard }           from "../../components/ItemCard/ItemCard";
import { ActionHub }         from "../../components/ActionHub/ActionHub";
import {
  mockCharacter,
  mockSteps,
  mockWallet,
  mockPendingRewards,
  mockActions,
  mockInventory,
} from "../../mocks/gameData";
import { PendingReward, ChestType } from "@fitness-rpg/shared";
import styles from "./Home.module.css";

const CHEST_ICON: Record<ChestType, string> = {
  common:   "??",
  uncommon: "??",
  rare:     "??",
};

const CHEST_LABEL: Record<ChestType, string> = {
  common:   "Comum",
  uncommon: "Incomum",
  rare:     "Raro",
};

function RewardChip({ reward }: { reward: PendingReward }) {
  return (
    <button className={styles.rewardChip} aria-label={`Abrir baú ${CHEST_LABEL[reward.type]}`}>
      <span aria-hidden="true">{CHEST_ICON[reward.type]}</span>
      {CHEST_LABEL[reward.type]}
    </button>
  );
}

export function Home() {
  return (
    <main className={styles.page}>
      {/* Top bar */}
      <header className={styles.topBar}>
        <span className={styles.logo}>FITNESS RPG</span>
        <button className={styles.notifBtn} aria-label="Notificações">
          ??
          <span className={styles.notifDot} aria-hidden="true" />
        </button>
      </header>

      {/* [1] Quem sou */}
      <HeroSection character={mockCharacter} />

      {/* [2] Quanto evoluí */}
      <XPBar
        currentXP={mockCharacter.currentXP}
        xpToNextLevel={mockCharacter.xpToNextLevel}
        level={mockCharacter.level}
      />

      {/* Moedas */}
      <CurrencyDisplay wallet={mockWallet} />

      {/* [3] Quanto andei */}
      <StepProgress steps={mockSteps} />

      {/* [4] O que ganhei — baús pendentes */}
      {mockPendingRewards.length > 0 && (
        <section className={styles.rewardsStrip} aria-label="Recompensas pendentes">
          <div className={styles.rewardsLabel}>
            Baús para abrir ({mockPendingRewards.length})
          </div>
          <div className={styles.rewardsList} role="list">
            {mockPendingRewards.map((r) => (
              <RewardChip key={r.id} reward={r} />
            ))}
          </div>
        </section>
      )}

      <div className={styles.divider} />

      {/* Itens recentes */}
      <section className={styles.itemsSection} aria-label="Itens recentes">
        <div className={styles.itemsHeader}>
          <span className={styles.itemsTitle}>Itens Recentes</span>
          <a href="/inventory" className={styles.seeAll} onClick={(e) => e.preventDefault()}>
            Ver tudo ?
          </a>
        </div>
        <div className={styles.itemsScroll}>
          {mockInventory.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={(i) => console.log("Item clicked:", i.name)}
            />
          ))}
        </div>
      </section>

      {/* [5] O que fazer */}
      <ActionHub actions={mockActions} />

      <div className={styles.bottomSafe} />
    </main>
  );
}
