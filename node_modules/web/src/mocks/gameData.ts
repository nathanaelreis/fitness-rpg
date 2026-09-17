import { Character, CharacterClass, CharacterRace, Currency, Item, ItemRarity, EquipmentSlot, PendingReward, ActionItem, DailySteps, Wallet } from "@fitness-rpg/shared";

export const mockCharacter: Character = {
  id: "hero-123",
  name: "Humano Chibi",
  race: CharacterRace.HUMAN,
  gender: "male",
  class: CharacterClass.WARRIOR,
  level: 12,
  currentXP: 3450,
  xpToNextLevel: 5000,
  elo: 1247,
  stats: { attack: 45, defense: 55, speed: 20, health: 450 }
};

export const mockWallet: Wallet = { greyCoin: 2450, blueCoin: 150 };
export const mockSteps: DailySteps = { current: 7340, goal: 10000, dailyCap: 25000, nextRewardAt: 10000, nextRewardType: "rare" };

export const mockInventory: Item[] = [
  { id: "i-1", name: "Espada de Treino", rarity: ItemRarity.COMMON, slot: EquipmentSlot.WEAPON, stats: { attack: 5 }, isEquipped: true, isNew: false },
  { id: "i-2", name: "Armadura Real", rarity: ItemRarity.RARE, slot: EquipmentSlot.CHEST, stats: { defense: 20, health: 50 }, isEquipped: true, isNew: false },
  { id: "i-3", name: "Botas de Corrida", rarity: ItemRarity.LEGENDARY, slot: EquipmentSlot.BOOTS, stats: { speed: 15 }, isEquipped: false, isNew: true }
];

export const mockPendingRewards: PendingReward[] = [
  { id: "rw-1", type: "common", earnedAt: new Date().toISOString() },
  { id: "rw-2", type: "uncommon", earnedAt: new Date().toISOString() },
];

export const mockActions: ActionItem[] = [
  { id: "act-1", label: "Arena", icon: "⚔️", href: "/arena", accent: true, badge: 2 },
  { id: "act-2", label: "Missões", icon: "📜", href: "/quests" },
  { id: "act-3", label: "Inventário", icon: "🎒", href: "#/inventory", badge: 1 },
  { id: "act-4", label: "Loja", icon: "🏪", href: "/shop" },
];
