import { Character, CharacterClass, CharacterRace, Item, ItemRarity, EquipmentSlot, PendingReward, ActionItem, DailySteps, Wallet } from "@fitness-rpg/shared";

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
  { id: "i-1", name: "Poção", rarity: ItemRarity.COMMON, slot: EquipmentSlot.ACCESSORY, stats: {}, isEquipped: false },
  { id: "i-2", name: "Cristal Verde", rarity: ItemRarity.UNCOMMON, slot: EquipmentSlot.ACCESSORY, stats: {}, isEquipped: false },
  { id: "i-3", name: "Espada de Treino", rarity: ItemRarity.COMMON, slot: EquipmentSlot.WEAPON, stats: { attack: 5 }, isEquipped: true, visualAssetId: "sword_basic" },
  { id: "i-4", name: "Arco Longo", rarity: ItemRarity.RARE, slot: EquipmentSlot.WEAPON, stats: { attack: 15 }, isEquipped: false },
  { id: "i-5", name: "Casaco de Couro", rarity: ItemRarity.UNCOMMON, slot: EquipmentSlot.CHEST, stats: { defense: 10 }, isEquipped: true, visualAssetId: "chest_leather" },
  { id: "i-6", name: "Casaco de Couro", rarity: ItemRarity.UNCOMMON, slot: EquipmentSlot.CHEST, stats: { defense: 10 }, isEquipped: false },
  { id: "i-7", name: "Pergaminho", rarity: ItemRarity.EPIC, slot: EquipmentSlot.ACCESSORY, stats: {}, isEquipped: false },
];

export const mockPendingRewards: PendingReward[] = [ { id: "rw-1", type: "common", earnedAt: new Date().toISOString() } ];

export const mockActions: ActionItem[] = [
  { id: "act-1", label: "Arena", spriteClass: "spriteArena", href: "#/arena", accent: true, badge: 2 },
  { id: "act-2", label: "Missões", spriteClass: "spriteMission", href: "#/quests" },
  { id: "act-3", label: "Inventário", spriteClass: "spriteInventory", href: "#/inventory", badge: 1 },
  { id: "act-4", label: "Evento", spriteClass: "spriteEvent", href: "#/event", badge: 4 },
];



