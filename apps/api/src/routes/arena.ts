import { FastifyPluginAsync } from "fastify";
import { ArenaService } from "../services/ArenaService";
import { Character, CharacterClass } from "@fitness-rpg/shared";

// Personagem mock para testes rápidos
const mockPlayer: Character = {
  id: "hero-test-1",
  name: "Guerreiro Teste",
  class: CharacterClass.WARRIOR,
  level: 10,
  currentXP: 0,
  xpToNextLevel: 1000,
  elo: 1000,
  stats: { attack: 50, defense: 40, speed: 30, health: 500 }
};

export const arenaRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/arena/queue", async (request, reply) => {
    // Na vida real, extrairia do JWT
    ArenaService.queueForArena(mockPlayer);
    return { success: true, message: "Adicionado a fila da Arena." };
  });

  fastify.get("/arena/status", async (request, reply) => {
    const status = ArenaService.getQueueStatus(mockPlayer.id);
    return { success: true, data: status };
  });
};
