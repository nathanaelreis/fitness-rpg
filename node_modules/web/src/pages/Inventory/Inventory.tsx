import { DynamicAvatar } from "../../components/DynamicAvatar/DynamicAvatar";
import { ActionHub } from "../../components/ActionHub/ActionHub";
import { mockCharacter, mockInventory, mockActions } from "../../mocks/gameData";
import styles from "./Inventory.module.css";

export function Inventory() {
  const char = mockCharacter;
  const items = mockInventory;
  
  // Cria 30 slots (5 colunas x 6 linhas)
  const gridSlots = Array.from({ length: 30 }).map((_, i) => items[i] || null);

  return (
    <div className={styles.page}>
      <header>
        <a href="#/" style={{color: '#6ee7b7', textDecoration: 'none', fontWeight: 'bold'}}>← Voltar</a>
      </header>
      
      {/* PAINEL PAPER DOLL */}
      <section className={styles.equipPanel}>
        <div className={styles.equipHeader}>
          <h1 className={styles.name}>{char.name}</h1>
          <div className={styles.classInfo}>Lv. {char.level} • {char.race} {char.class}</div>
        </div>
        
        <div className={styles.dollArea}>
          <div className={styles.slotsCol}>
            <div className={styles.equipSlot} title="Capacete" />
            <div className={styles.equipSlot} title="Peito" />
            <div className={styles.equipSlot} title="Luvas" />
            <div className={styles.equipSlot} title="Botas" />
          </div>
          
          <div className={styles.avatarRing}>
             <DynamicAvatar appearance={char.appearance} equippedItems={items.filter(i => i.isEquipped)} mode="face" />
          </div>
          
          <div className={styles.slotsCol}>
            <div className={styles.equipSlot} title="Arma Principal" />
            <div className={styles.equipSlot} title="Escudo" />
            <div className={styles.equipSlot} title="Anel" />
            <div className={styles.equipSlot} title="Colar" />
          </div>
        </div>
      </section>

      {/* GRADE DE INVENTÁRIO (5x6) */}
      <section className={styles.gridPanel}>
        <div className={styles.inventoryGrid}>
          {gridSlots.map((item, idx) => (
            <div key={idx} className={styles.gridCell} data-rarity={item?.rarity}>
              {item && (
                <>
                  <div className={styles.itemIcon} />
                  {item.isEquipped && <div className={styles.equippedBadge}>E</div>}
                </>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <ActionHub actions={mockActions} />
    </div>
  );
}


