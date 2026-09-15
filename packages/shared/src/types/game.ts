// --- Enums ------------------------------------------------------------------

export enum CharacterRace {
  HUMAN = 'human',
  ELF = 'elf',
  DWARF = 'dwarf'
}

export enum CharacterClass {
  WARRIOR = "WARRIOR",
  MAGE    = "MAGE",
  ARCHER  = "ARCHER",
}

export enum ItemRarity {
  COMMON    = "COMMON",
  UNCOMMON  = "UNCOMMON",
  RARE      = "RARE",
  EPIC      = "EPIC",
  LEGENDARY = "LEGENDARY",
}

export enum EquipmentSlot {
  WEAPON    = "WEAPON",
  HELMET    = "HELMET",
  CHEST     = "CHEST",
  LEGS      = "LEGS",
  BOOTS     = "BOOTS",
  ACCESSORY = "ACCESSORY",
}

export enum Currency {
  GREY_COIN = "GREY_COIN",
  BLUE_COIN = "BLUE_COIN",
}

// --- Interfaces -------------------------------------------------------------

export interface CharacterStats {
  attack:  number;
  defense: number;
  speed:   number;
  health:  number;
}

export interface Character {
  id:             string;
  name:           string;
  class:          CharacterClass;
  level:          number;
  currentXP:      number;
  xpToNextLevel:  number;
  elo:            number;
  stats:          CharacterStats;
  avatarUrl?:     string;
}

export interface Item {
  id:         string;
  name:       string;
  rarity:     ItemRarity;
  slot:       EquipmentSlot;
  stats:      Partial<CharacterStats>;
  isEquipped: boolean;
  isNew:      boolean;
  iconUrl?:   string;
}

export type ChestType = "common" | "uncommon" | "rare";

export interface DailySteps {
  current:         number;
  goal:            number;
  dailyCap:        number;
  nextRewardAt:    number;
  nextRewardType:  ChestType;
}

export interface Wallet {
  greyCoin: number;
  blueCoin: number;
}

export interface PendingReward {
  id:        string;
  type:      ChestType;
  earnedAt:  string;
}

export interface ActionItem {
  id:       string;
  label:    string;
  icon:     string;
  badge?:   number;
  href:     string;
  accent?:  boolean;
}

