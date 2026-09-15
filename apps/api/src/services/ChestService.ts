import { ChestType } from "@fitness-rpg/shared";

export class ChestService {
  static generateChest(userId: string, rarity: ChestType) {
    // No mundo real, isso inseriria um registro na tabela de recompensas pendentes
    console.log(`[CHEST] ?? Bau gerado: ${rarity.toUpperCase()} para o usuario ${userId}`);
  }
}
