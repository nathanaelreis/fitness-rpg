import { Character } from "@fitness-rpg/shared";

export interface CombatAction {
  turn: number;
  attackerId: string;
  defenderId: string;
  damage: number;
  isCritical?: boolean;
  hpRemaining: number;
}

export interface CombatResult {
  winnerId: string;
  log: CombatAction[];
}

export class CombatSimulator {
  static readonly MAX_TURNS = 30;

  static calculateDamage(attack: number, defense: number): number {
    const rawDamage = attack;
    const mitigation = 100 / (100 + defense);
    return Math.max(1, Math.floor(rawDamage * mitigation));
  }

  static simulate(attacker: Character, defender: Character): CombatResult {
    let attackerHp = attacker.stats.health;
    let defenderHp = defender.stats.health;
    const log: CombatAction[] = [];
    let turn = 1;

    // Fast character goes first (simplified, we use attacker first as default if equal)
    let currentAttacker = attacker.stats.speed >= defender.stats.speed ? attacker : defender;
    let currentDefender = currentAttacker.id === attacker.id ? defender : attacker;

    while (turn <= this.MAX_TURNS && attackerHp > 0 && defenderHp > 0) {
      const damage = this.calculateDamage(
        currentAttacker.stats.attack,
        currentDefender.stats.defense
      );

      if (currentDefender.id === attacker.id) {
        attackerHp -= damage;
      } else {
        defenderHp -= damage;
      }

      const hpRemaining = currentDefender.id === attacker.id ? attackerHp : defenderHp;

      log.push({
        turn,
        attackerId: currentAttacker.id,
        defenderId: currentDefender.id,
        damage,
        hpRemaining: Math.max(0, hpRemaining),
      });

      if (attackerHp <= 0 || defenderHp <= 0) {
        break;
      }

      // Swap roles
      const temp = currentAttacker;
      currentAttacker = currentDefender;
      currentDefender = temp;
      turn++;
    }

    // Tie-breaker: Defender wins in case of timeout/draw
    let winnerId = defender.id;
    if (attackerHp > 0 && defenderHp <= 0) {
      winnerId = attacker.id;
    } else if (defenderHp > 0 && attackerHp <= 0) {
      winnerId = defender.id;
    }

    return { winnerId, log };
  }
}
