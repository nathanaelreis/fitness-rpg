import { Character, CharacterRace, CharacterClass } from "@fitness-rpg/shared";
import { mockCharacter } from "../mocks/gameData";

const STORAGE_KEY = "rpeg_saved_characters";
const ACTIVE_CHAR_KEY = "rpeg_active_character_id";
export const MAX_CHARACTERS = 2; // Limite de 2 chars no momento

export interface SavedCharacter extends Character {
  beardStyle?: string;
  createdAt: string;
}

export function getSavedCharacters(): SavedCharacter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: SavedCharacter[] = [{
        ...mockCharacter,
        createdAt: new Date().toISOString()
      }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      localStorage.setItem(ACTIVE_CHAR_KEY, initial[0].id);
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao carregar do localStorage", e);
    return [];
  }
}

export function getActiveCharacter(): SavedCharacter {
  const all = getSavedCharacters();
  const activeId = localStorage.getItem(ACTIVE_CHAR_KEY);
  const found = all.find(c => c.id === activeId);
  return found || all[0] || {
    ...mockCharacter,
    createdAt: new Date().toISOString()
  };
}

export function setActiveCharacter(id: string): void {
  localStorage.setItem(ACTIVE_CHAR_KEY, id);
}

export function saveNewCharacter(charData: {
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  gender: "male" | "female";
  appearance: SavedCharacter["appearance"];
  beardStyle?: string;
}): { success: boolean; error?: string; character?: SavedCharacter } {
  const all = getSavedCharacters();
  if (all.length >= MAX_CHARACTERS) {
    return { success: false, error: `Limite atingido! Máximo de ${MAX_CHARACTERS} personagens ativos permitidos no momento.` };
  }

  const newChar: SavedCharacter = {
    ...charData,
    id: `char_${Date.now()}`,
    level: 1,
    currentXP: 0,
    xpToNextLevel: 1000,
    elo: 1000,
    stats: { attack: 15, defense: 12, speed: 10, health: 120 },
    createdAt: new Date().toISOString()
  };

  const updated = [...all, newChar];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  localStorage.setItem(ACTIVE_CHAR_KEY, newChar.id);

  return { success: true, character: newChar };
}

export function deleteCharacter(id: string): boolean {
  const all = getSavedCharacters();
  if (all.length <= 1) return false;
  const updated = all.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  if (localStorage.getItem(ACTIVE_CHAR_KEY) === id) {
    localStorage.setItem(ACTIVE_CHAR_KEY, updated[0].id);
  }
  return true;
}
