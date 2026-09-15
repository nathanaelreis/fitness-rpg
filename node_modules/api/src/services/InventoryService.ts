import { Item, EquipmentSlot, CharacterStats } from "@fitness-rpg/shared";

// Mock Data para o Banco de Dados (substituir por Drizzle ORM)
const userInventories: Record<string, Item[]> = {};
const userBaseStats: Record<string, CharacterStats> = {
  "hero-test-1": { attack: 50, defense: 40, speed: 30, health: 500 }
};

export class InventoryService {
  static getUserInventory(userId: string): Item[] {
    return userInventories[userId] || [];
  }

  static addItem(userId: string, item: Item) {
    if (!userInventories[userId]) {
      userInventories[userId] = [];
    }
    userInventories[userId].push(item);
  }

  static equipItem(userId: string, itemId: string) {
    const inventory = this.getUserInventory(userId);
    const itemToEquip = inventory.find(i => i.id === itemId);

    if (!itemToEquip) throw new Error("Item não encontrado no inventário.");
    if (itemToEquip.isEquipped) return; // Já está equipado

    // Desequipa qualquer item que já esteja no mesmo slot
    const currentlyEquipped = inventory.find(i => i.isEquipped && i.slot === itemToEquip.slot);
    if (currentlyEquipped) {
      currentlyEquipped.isEquipped = false;
    }

    itemToEquip.isEquipped = true;
    itemToEquip.isNew = false; // Ao equipar, remove a tag de "Novo"
  }

  static unequipItem(userId: string, itemId: string) {
    const inventory = this.getUserInventory(userId);
    const itemToUnequip = inventory.find(i => i.id === itemId);

    if (!itemToUnequip) throw new Error("Item não encontrado no inventário.");
    
    itemToUnequip.isEquipped = false;
  }

  static calculateTotalStats(userId: string): CharacterStats {
    const baseStats = userBaseStats[userId] || { attack: 10, defense: 10, speed: 10, health: 100 };
    const inventory = this.getUserInventory(userId);
    const equippedItems = inventory.filter(i => i.isEquipped);

    // Copia os stats base para não mutar o objeto original
    const totalStats: CharacterStats = { ...baseStats };

    for (const item of equippedItems) {
      if (item.stats.attack) totalStats.attack += item.stats.attack;
      if (item.stats.defense) totalStats.defense += item.stats.defense;
      if (item.stats.speed) totalStats.speed += item.stats.speed;
      if (item.stats.health) totalStats.health += item.stats.health;
    }

    return totalStats;
  }
}
