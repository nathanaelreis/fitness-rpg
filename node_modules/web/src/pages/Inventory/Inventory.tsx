import { useState } from "react";
import { mockInventory, mockCharacter } from "../../mocks/gameData";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { Item, CharacterStats } from "@fitness-rpg/shared";
import styles from "./Inventory.module.css";

export function Inventory() {
  const [items, setItems] = useState<Item[]>(mockInventory);

  // Calcula status dinamicamente para o frontend (base + equipados)
  const baseStats = mockCharacter.stats;
  const currentStats = items.filter(i => i.isEquipped).reduce((acc, item) => {
    return {
      attack: acc.attack + (item.stats.attack || 0),
      defense: acc.defense + (item.stats.defense || 0),
      speed: acc.speed + (item.stats.speed || 0),
      health: acc.health + (item.stats.health || 0),
    };
  }, { ...baseStats });

  const handleItemClick = (clickedItem: Item) => {
    // Lógica simples de toggle equip/unequip simulando o backend
    setItems(prev => prev.map(item => {
      // Desequipa qualquer item no mesmo slot se estivermos equipando um novo
      if (!clickedItem.isEquipped && item.slot === clickedItem.slot && item.isEquipped) {
        return { ...item, isEquipped: false };
      }
      // Toggle o item clicado
      if (item.id === clickedItem.id) {
        return { ...item, isEquipped: !item.isEquipped, isNew: false };
      }
      return item;
    }));
  };

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => window.location.hash = ""} aria-label="Voltar">
          ?
        </button>
        <h1 className={styles.title}>Inventário</h1>
      </header>

      <section className={styles.statsStrip} aria-label="Atributos totais">
        <div className={styles.statItem}>
          <span className={styles.statLabel}>ATK</span>
          <span className={styles.statValue} data-stat="atk">{currentStats.attack}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>DEF</span>
          <span className={styles.statValue} data-stat="def">{currentStats.defense}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>SPD</span>
          <span className={styles.statValue} data-stat="spd">{currentStats.speed}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>HP</span>
          <span className={styles.statValue} data-stat="hp">{currentStats.health}</span>
        </div>
      </section>

      {items.length > 0 ? (
        <div className={styles.grid}>
          {items.map(item => (
            <ItemCard key={item.id} item={item} onClick={handleItemClick} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          Seu inventário está vazio. Ganhe baús caminhando!
        </div>
      )}
    </main>
  );
}
