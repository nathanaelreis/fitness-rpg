import { FastifyPluginAsync } from "fastify";
import { LedgerService } from "../services/LedgerService";
import { Currency } from "@fitness-rpg/shared";

export const walletRoutes: FastifyPluginAsync = async (fastify) => {
  const MOCK_USER_ID = "hero-test-1";

  // Inicializa o mock com algum dinheiro para testes (Executado apenas uma vez ao carregar a rota)
  try {
    if (LedgerService.getBalance(MOCK_USER_ID, Currency.GREY_COIN) === 0) {
      LedgerService.recordTransaction(MOCK_USER_ID, Currency.GREY_COIN, 1500, "initial_gift");
    }
  } catch(e) {}

  fastify.get("/wallet", async (request, reply) => {
    return { success: true, data: LedgerService.getWallet(MOCK_USER_ID) };
  });

  fastify.post("/wallet/spend", async (request: any, reply) => {
    try {
      const { amount, currency, reason } = request.body;
      
      // Debitar (valor negativo)
      const debitAmount = -Math.abs(amount);
      const entry = LedgerService.recordTransaction(MOCK_USER_ID, currency, debitAmount, reason || "manual_spend");
      
      return { success: true, newBalance: entry.balanceAfter };
    } catch (error: any) {
      reply.status(400);
      return { success: false, error: error.message };
    }
  });
};
