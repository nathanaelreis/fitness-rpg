import { ChestType } from "@fitness-rpg/shared";
import { ChestService } from "./ChestService";

export interface StepSubmission {
  userId: string;
  steps: number;
  timestampMs: number;
}

// Mock DB para rastrear os passos diários e timestamps (Redis na versão final)
const userDailyState: Record<string, { currentSteps: number; lastUpdateMs: number }> = {};

export class StepService {
  static readonly DAILY_CAP = 25000;
  static readonly BATCH_LIMIT = 5000;
  static readonly MAX_VELOCITY_PER_MIN = 200;

  static submitSteps(submission: StepSubmission) {
    const { userId, steps, timestampMs } = submission;

    // --- ANTI-CHEAT V1 ---
    if (steps <= 0) {
      throw new Error("Quantidade de passos invalida.");
    }

    // 1. Batch Limit
    if (steps > this.BATCH_LIMIT) {
      throw new Error(`Anti-Cheat: Submissao excede limite por lote (${this.BATCH_LIMIT}).`);
    }

    // 2. Jitter / Bot Detection (Muitos passos redondos em sequencia)
    if (steps % 500 === 0 && steps > 1000) {
      console.warn(`[ANTI-CHEAT] ?? Flag: Padrao artificial de passos detectado (${steps}) para ${userId}`);
    }

    const state = userDailyState[userId] || { currentSteps: 0, lastUpdateMs: timestampMs - 60000 };

    // 3. Velocity Check (Passos por minuto)
    const minutesPassed = (timestampMs - state.lastUpdateMs) / 60000;
    if (minutesPassed > 0 && state.currentSteps > 0) {
      const velocity = steps / minutesPassed;
      if (velocity > this.MAX_VELOCITY_PER_MIN) {
        throw new Error(`Anti-Cheat: Velocidade sobre-humana detectada (${Math.round(velocity)} passos/min).`);
      }
    }
    // ---------------------

    let remainingSteps = steps;
    let currentSteps = state.currentSteps;
    let xpEarned = 0;

    const checkChest = (prev: number, curr: number, threshold: number, rarity: ChestType) => {
      if (prev < threshold && curr >= threshold) {
        ChestService.generateChest(userId, rarity);
      }
    };

    // Aplicar tiers de conversao de XP
    while (remainingSteps > 0 && currentSteps < this.DAILY_CAP) {
      const startSteps = currentSteps;
      let processAmount = 0;
      let multiplier = 0;

      if (startSteps < 5000) {
        processAmount = Math.min(remainingSteps, 5000 - startSteps);
        multiplier = 1.0;
      } else if (startSteps < 10000) {
        processAmount = Math.min(remainingSteps, 10000 - startSteps);
        multiplier = 0.5;
      } else if (startSteps < 25000) {
        processAmount = Math.min(remainingSteps, 25000 - startSteps);
        multiplier = 0.25;
      }

      xpEarned += processAmount * multiplier;
      currentSteps += processAmount;
      remainingSteps -= processAmount;

      // Geracao de Baus nas marcas especificas
      checkChest(startSteps, currentSteps, 2500, "common");
      checkChest(startSteps, currentSteps, 5000, "uncommon");
      checkChest(startSteps, currentSteps, 10000, "rare");
    }

    // Atualiza estado
    userDailyState[userId] = { currentSteps, lastUpdateMs: timestampMs };

    return {
      acceptedSteps: steps - remainingSteps,
      discardedSteps: remainingSteps,
      xpEarned,
      newTotalSteps: currentSteps
    };
  }

  static getDailyProgress(userId: string) {
    return userDailyState[userId]?.currentSteps || 0;
  }
}
