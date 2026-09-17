import React from 'react';
import { Item, EquipmentSlot } from '@fitness-rpg/shared';
import { mockInventory, mockCharacter } from '../../mocks/gameData';
import { DynamicAvatar } from '../../components/DynamicAvatar/DynamicAvatar';
import styles from './Inventory.module.css';

export function Inventory() {
  const [items] = React.useState<Item[]>(mockInventory);

  const equippedItems = items.filter(i => i.isEquipped);
  const unequippedItems = items.filter(i => !i.isEquipped);

  const renderSlot = (slot: EquipmentSlot) => {
    const item = equippedItems.find(i => i.slot === slot);
    return (
      <div className={styles.slotBox}>
        <div className={styles.slotLabel}>{slot}</div>
        {item ? <div className={styles.equippedIcon}>{item.name[0]}</div> : <div className={styles.emptySlot} />}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#/" className={styles.backBtn}>← Voltar</a>
        <h1>Inventário</h1>
      </header>

      {/* PAPER DOLL PREVIEW (CORPO INTEIRO) */}
      <section className={styles.characterPreview}>
        <div className={styles.slotsLeft}>
          {renderSlot(EquipmentSlot.HELMET)}
          {renderSlot(EquipmentSlot.WEAPON)}
          {renderSlot(EquipmentSlot.ACCESSORY)}
        </div>
        
        <div className={styles.avatarWrapper}>
          <DynamicAvatar appearance={mockCharacter.appearance} equippedItems={equippedItems} mode="full" />
        </div>

        <div className={styles.slotsRight}>
          {renderSlot(EquipmentSlot.CHEST)}
          {renderSlot(EquipmentSlot.LEGS)}
          {renderSlot(EquipmentSlot.BOOTS)}
        </div>
      </section>

      <section className={styles.bag}>
        <h2>Mochila</h2>
        <div className={styles.bagGrid}>
          {unequippedItems.length === 0 && <p className={styles.emptyMsg}>Mochila vazia.</p>}
          {unequippedItems.map(item => (
            <div key={item.id} className={styles.bagItem}>
              {item.isNew && <span className={styles.newBadge}>Novo</span>}
              <div className={styles.bagIcon}>{item.name[0]}</div>
              <div className={styles.bagInfo}>
                <div className={styles.bagName}>{item.name}</div>
                <div className={styles.bagRarity}>{item.rarity}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
