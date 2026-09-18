import { useState, useEffect } from "react";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { XPBar } from "../../components/XPBar/XPBar";
import { StepProgress } from "../../components/StepProgress/StepProgress";
import { CurrencyDisplay } from "../../components/CurrencyDisplay/CurrencyDisplay";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockSteps, mockWallet, mockPendingRewards, mockActions, mockInventory } from "../../mocks/gameData";
import { getActiveCharacter, SavedCharacter } from "../../services/characterStore";
import { PendingReward, ChestType } from "@fitness-rpg/shared";
import styles from "./Home.module.css";

const CHEST_LABEL: Record<ChestType, string> = { common: "Comum", uncommon: "Incomum", rare: "Raro" };

function RewardChip({ reward }: { reward: PendingReward }) {
  const capType = reward.type.charAt(0).toUpperCase() + reward.type.slice(1);
  const spriteClass = `chest${capType}`;

  return (
    <button className={styles.rewardChip}>
      <div className={`${styles.chestSprite} ${styles[spriteClass]}`} />
      <span>{CHEST_LABEL[reward.type]}</span>
    </button>
  );
}

export function Home() {
  const [character, setCharacter] = useState<SavedCharacter>(getActiveCharacter());

  useEffect(() => {
    // Carrega o personagem ativo atualizado do localStorage
    setCharacter(getActiveCharacter());
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <img src="/assets/logo.jpg" alt="RPeG Run" className={styles.logoImg} />
      </header>

      {/* HeroSection agora lê diretamente o personagem salvo */}
      <a href="#/create" style={{ textDecoration: "none" }} title="Clique para gerenciar ou criar personagens">
        <HeroSection character={character} />
      </a>

      <XPBar currentXP={character.currentXP} xpToNextLevel={character.xpToNextLevel} level={character.level} />
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
