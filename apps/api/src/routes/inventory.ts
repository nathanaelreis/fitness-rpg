import { FastifyPluginAsync } from "fastify";
import { InventoryService } from "../services/InventoryService";

export const inventoryRoutes: FastifyPluginAsync = async (fastify) => {
  const MOCK_USER_ID = "hero-test-1";

  fastify.get("/inventory", async (request, reply) => {
    const items = InventoryService.getUserInventory(MOCK_USER_ID);
    const totalStats = InventoryService.calculateTotalStats(MOCK_USER_ID);
    
    return { 
      success: true, 
      data: {
        items,
        totalStats
      }
    };
  });

  fastify.post("/inventory/equip/:itemId", async (request: any, reply) => {
    try {
      const { itemId } = request.params;
      InventoryService.equipItem(MOCK_USER_ID, itemId);
      return { success: true, message: "Item equipado com sucesso." };
    } catch (error: any) {
      reply.status(400);
      return { success: false, error: error.message };
    }
  });

  fastify.post("/inventory/unequip/:itemId", async (request: any, reply) => {
    try {
      const { itemId } = request.params;
      InventoryService.unequipItem(MOCK_USER_ID, itemId);
      return { success: true, message: "Item desequipado com sucesso." };
    } catch (error: any) {
      reply.status(400);
      return { success: false, error: error.message };
    }
  });
};
