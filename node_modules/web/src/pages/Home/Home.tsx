import { HeroSection } from "../../components/HeroSection/HeroSection";
import { XPBar } from "../../components/XPBar/XPBar";
import { StepProgress } from "../../components/StepProgress/StepProgress";
import { CurrencyDisplay } from "../../components/CurrencyDisplay/CurrencyDisplay";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockCharacter, mockSteps, mockWallet, mockPendingRewards, mockActions, mockInventory } from "../../mocks/gameData";
import { PendingReward, ChestType } from "@fitness-rpg/shared";
import styles from "./Home.module.css";

const CHEST_LABEL: Record<ChestType, string> = { common: "Comum", uncommon: "Incomum", rare: "Raro" };

function RewardChip({ reward }: { reward: PendingReward }) {
  return (
    <button className={styles.rewardChip}>
      🎁 {CHEST_LABEL[reward.type]}
    </button>
  );
}

export function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <img src="/assets/logo.jpg" alt="RPeG Run" className={styles.logoImg} />
      </header>
      <a href="#/create" style={{textDecoration: "none"}}><HeroSection character={mockCharacter} /></a>
      <XPBar currentXP={mockCharacter.currentXP} xpToNextLevel={mockCharacter.xpToNextLevel} level={mockCharacter.level} />
      <CurrencyDisplay wallet={mockWallet} />
      <StepProgress steps={mockSteps} />
      {mockPendingRewards.length > 0 && (
        <section className={styles.rewardsStrip}>
          <div className={styles.rewardsLabel}>Baús para abrir ({mockPendingRewards.length})</div>
          <div className={styles.rewardsList}>
            {mockPendingRewards.map((r) => <RewardChip key={r.id} reward={r} />)}
          </div>
        </section>
      )}
      <div className={styles.divider} />
      <section className={styles.itemsSection}>
        <div className={styles.itemsHeader}>
          <span className={styles.itemsTitle}>Itens Recentes</span>
        </div>
        <div className={styles.itemsScroll}>
          {mockInventory.map((item) => <ItemCard key={item.id} item={item} onClick={() => {}} />)}
        </div>
      </section>
      <ActionHub actions={mockActions} />
      <div className={styles.bottomSafe} />
    </main>
  );
}

