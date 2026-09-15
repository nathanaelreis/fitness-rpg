import { Item, ItemRarity, EquipmentSlot } from "@fitness-rpg/shared";
import styles from "./ItemCard.module.css";

interface Props {
  item: Item;
  onClick?: (item: Item) => void;
}

const SLOT_ICON: Record<EquipmentSlot, string> = {
  [EquipmentSlot.WEAPON]:    "??",
  [EquipmentSlot.HELMET]:    "??",
  [EquipmentSlot.CHEST]:     "???",
  [EquipmentSlot.LEGS]:      "??",
  [EquipmentSlot.BOOTS]:     "??",
  [EquipmentSlot.ACCESSORY]: "??",
};

const RARITY_LABEL: Record<ItemRarity, string> = {
  [ItemRarity.COMMON]:    "Comum",
  [ItemRarity.UNCOMMON]:  "Incomum",
  [ItemRarity.RARE]:      "Raro",
  [ItemRarity.EPIC]:      "Épico",
  [ItemRarity.LEGENDARY]: "Lendário",
};

function primaryStat(item: Item): string {
  const s = item.stats;
  if (s.attack)  return `+${s.attack} ATK`;
  if (s.defense) return `+${s.defense} DEF`;
  if (s.speed)   return `+${s.speed} SPD`;
  if (s.health)  return `+${s.health} HP`;
  return "";
}

export function ItemCard({ item, onClick }: Props) {
  return (
    <article
      className={styles.card}
      data-rarity={item.rarity}
      data-equipped={item.isEquipped}
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name} — ${RARITY_LABEL[item.rarity]}`}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(item)}
    >
      {item.isEquipped && <span className={styles.equippedBadge}>Equipado</span>}
      {item.isNew      && <span className={styles.newBadge}>Novo</span>}

      <div className={styles.iconWrapper} aria-hidden="true">
        {SLOT_ICON[item.slot]}
      </div>

      <div className={styles.name}>{item.name}</div>
      <div className={styles.rarity}>{RARITY_LABEL[item.rarity]}</div>
      {primaryStat(item) && (
        <div className={styles.stat}><strong>{primaryStat(item)}</strong></div>
      )}
    </article>
  );
}
