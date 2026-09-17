import { Character, CharacterClass, CharacterRace, Currency, Item, ItemRarity, EquipmentSlot, PendingReward, ActionItem, DailySteps, Wallet } from "@fitness-rpg/shared";

export const mockCharacter: Character = {
  id: "hero-123",
  name: "Guerreiro Iniciante",
  race: CharacterRace.HUMAN,
  gender: "male",
  class: CharacterClass.WARRIOR,
  appearance: {
    hairStyle: "style_1",
    hairColor: "#3b2f2f",
    eyeShape: "shape_1",
    eyeColor: "#5c4033",
    skinTone: "#f5d0b5"
  },
  level: 1,
  currentXP: 0,
  xpToNextLevel: 1000,
  elo: 1000,
  stats: { attack: 15, defense: 15, speed: 10, health: 150 }
};

export const mockWallet: Wallet = { greyCoin: 2450, blueCoin: 150 };
export const mockSteps: DailySteps = { current: 7340, goal: 10000, dailyCap: 25000, nextRewardAt: 10000, nextRewardType: "rare" };

export const mockInventory: Item[] = [
  { id: "i-1", name: "Espada de Treino", rarity: ItemRarity.COMMON, slot: EquipmentSlot.WEAPON, stats: { attack: 5 }, isEquipped: true, visualAssetId: "sword_basic" },
  { id: "i-2", name: "Casaco de Couro", rarity: ItemRarity.UNCOMMON, slot: EquipmentSlot.CHEST, stats: { defense: 10 }, isEquipped: true, visualAssetId: "chest_leather" }
];

export const mockPendingRewards: PendingReward[] = [ { id: "rw-1", type: "common", earnedAt: new Date().toISOString() } ];

export const mockActions: ActionItem[] = [
  { id: "act-1", label: "Arena", icon: "⚔️", href: "/arena", accent: true, badge: 2 },
  { id: "act-2", label: "Missões", icon: "📜", href: "/quests" },
  { id: "act-3", label: "Inventário", icon: "🎒", href: "#/inventory", badge: 1 },
];
