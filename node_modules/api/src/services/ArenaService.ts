import { Character } from "@fitness-rpg/shared";
import { CombatSimulator } from "../engine/CombatSimulator";

// Mock para o Redis e o BD por enquanto (foco na lógica)
const arenaQueue: Map<string, Character> = new Map();

export class ArenaService {
  static queueForArena(character: Character) {
    if (!arenaQueue.has(character.id)) {
      arenaQueue.set(character.id, character);
    }
  }

  static getQueueStatus(userId: string): { queued: boolean; position?: number } {
    const isQueued = arenaQueue.has(userId);
    return { queued: isQueued, position: isQueued ? Array.from(arenaQueue.keys()).indexOf(userId) : undefined };
  }

  static matchmake() {
    // Busca oponentes com Elo +-200
    const queuedPlayers = Array.from(arenaQueue.values());
    if (queuedPlayers.length < 2) return;

    for (let i = 0; i < queuedPlayers.length; i++) {
      for (let j = i + 1; j < queuedPlayers.length; j++) {
        const p1 = queuedPlayers[i];
        const p2 = queuedPlayers[j];

        if (Math.abs(p1.elo - p2.elo) <= 200) {
          // Found a match
          arenaQueue.delete(p1.id);
          arenaQueue.delete(p2.id);
          this.resolveCombat(p1, p2);
          return; // Process one match at a time for simplicity
        }
      }
    }
  }

  static resolveCombat(p1: Character, p2: Character) {
    const result = CombatSimulator.simulate(p1, p2);
    // Aqui persistiríamos no PostgreSQL via Drizzle e atualizaríamos o Elo
    console.log(`[ARENA] Combate resolvido! Vencedor: ${result.winnerId}`);
    return result;
  }
}
