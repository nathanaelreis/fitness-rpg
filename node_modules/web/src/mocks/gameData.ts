import { Character, CharacterClass, CharacterRace, Currency, Item, ItemRarity, EquipmentSlot } from "@fitness-rpg/shared";

export const mockCharacter: Character = {
  id: "hero-123",
  name: "Guerreiro Chibi",
  race: CharacterRace.HUMAN,
  gender: "male",
  class: CharacterClass.WARRIOR,
  level: 12,
  currentXP: 3450,
  xpToNextLevel: 5000,
  elo: 1247,
  stats: {
    attack: 45,
    defense: 55,
    speed: 20,
    health: 450
  }
};

export const mockWallet = {
  [Currency.GREY_COIN]: 2450,
  [Currency.BLUE_COIN]: 150
};

export const mockSteps = {
  current: 7340,
  target: 10000,
  dailyCap: 25000
};

export const mockInventory: Item[] = [
  {
    id: "item-1",
    name: "Espada de Treino",
    rarity: ItemRarity.COMMON,
    slot: EquipmentSlot.WEAPON,
    stats: { attack: 5 },
    isEquipped: true
  },
  {
    id: "item-2",
    name: "Armadura do Humano",
    rarity: ItemRarity.RARE,
    slot: EquipmentSlot.CHEST,
    stats: { defense: 20, health: 50 },
    isEquipped: true
  },
  {
    id: "item-3",
    name: "Botas de Corrida RPeG",
    rarity: ItemRarity.LEGENDARY,
    slot: EquipmentSlot.BOOTS,
    stats: { speed: 15 },
    isEquipped: false,
    isNew: true
  }
];
