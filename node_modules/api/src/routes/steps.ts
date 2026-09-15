import { FastifyPluginAsync } from "fastify";
import { StepService } from "../services/StepService";

export const stepsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/steps/submit", async (request, reply) => {
    // Em prod, usariamos Zod para parsear o body e JWT para o userId
    const body = request.body as any;
    
    try {
      const result = StepService.submitSteps({
        userId: body.userId || "hero-test-1",
        steps: body.steps,
        timestampMs: Date.now()
      });
      return { success: true, data: result };
    } catch (error: any) {
      reply.status(400);
      return { success: false, error: error.message };
    }
  });

  fastify.get("/steps/today", async (request, reply) => {
    const userId = "hero-test-1"; // Mock Auth
    const current = StepService.getDailyProgress(userId);
    return { success: true, data: { currentSteps: current } };
  });
};
