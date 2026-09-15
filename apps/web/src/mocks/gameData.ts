import {
  Character,
  CharacterClass,
  DailySteps,
  Wallet,
  PendingReward,
  ActionItem,
  Item,
  ItemRarity,
  EquipmentSlot,
} from "@fitness-rpg/shared";

export const mockCharacter: Character = {
  id:            "hero-001",
  name:          "Kael Ironfist",
  class:         CharacterClass.WARRIOR,
  level:         12,
  currentXP:     3_400,
  xpToNextLevel: 5_000,
  elo:           1_247,
  stats:         { attack: 85, defense: 60, speed: 45, health: 1_200 },
};

export const mockSteps: DailySteps = {
  current:        7_340,
  goal:           10_000,
  dailyCap:       25_000,
  nextRewardAt:   10_000,
  nextRewardType: "rare",
};

export const mockWallet: Wallet = {
  greyCoin: 2_450,
  blueCoin:   150,
};

export const mockPendingRewards: PendingReward[] = [
  { id: "r1", type: "common",   earnedAt: "2026-09-12T10:00:00Z" },
  { id: "r2", type: "uncommon", earnedAt: "2026-09-12T14:30:00Z" },
];

export const mockActions: ActionItem[] = [
  { id: "arena",     label: "Arena",      icon: "??",  badge: 2, href: "/arena",     accent: true  },
  { id: "explore",   label: "Explorar",   icon: "???",  badge: 0, href: "/explore"                  },
  { id: "inventory", label: "Inventário", icon: "??",  badge: 1, href: "#/inventory"                 },
  { id: "shop",      label: "Loja",       icon: "??",  badge: 0, href: "/shop"                      },
];

export const mockInventory: Item[] = [
  { id: "i1", name: "Espada de Ferro",    rarity: ItemRarity.COMMON,    slot: EquipmentSlot.WEAPON,    stats: { attack: 12 },             isEquipped: true,  isNew: false },
  { id: "i2", name: "Elmo de Couro",      rarity: ItemRarity.UNCOMMON,  slot: EquipmentSlot.HELMET,    stats: { defense: 8 },             isEquipped: true,  isNew: false },
  { id: "i3", name: "Botas do Viajante",  rarity: ItemRarity.RARE,      slot: EquipmentSlot.BOOTS,     stats: { speed: 15, defense: 5 }, isEquipped: false, isNew: true  },
  { id: "i4", name: "Manto das Sombras",  rarity: ItemRarity.EPIC,      slot: EquipmentSlot.CHEST,     stats: { defense: 20, attack: 8 }, isEquipped: false, isNew: false },
  { id: "i5", name: "Anel Lendário",      rarity: ItemRarity.LEGENDARY, slot: EquipmentSlot.ACCESSORY, stats: { attack: 30, speed: 20 }, isEquipped: false, isNew: true  },
];
