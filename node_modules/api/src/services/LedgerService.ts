import { Currency } from "@fitness-rpg/shared";

// Representação de uma linha no banco (append-only)
export interface LedgerEntry {
  id: number;
  userId: string;
  currency: Currency;
  amount: number;
  sourceType: string;
  sourceId?: string;
  balanceAfter: number;
  createdAt: number;
}

// Mock DB de transações para o MVP
const ledgerDB: LedgerEntry[] = [];
let nextId = 1;

export class LedgerService {
  /**
   * Retorna o saldo mais recente de uma moeda para um usuário específico
   */
  static getBalance(userId: string, currency: Currency): number {
    // No SQL real: SELECT balance_after FROM wallet_ledger WHERE user_id = ? AND currency = ? ORDER BY id DESC LIMIT 1;
    const userEntries = ledgerDB.filter(e => e.userId === userId && e.currency === currency);
    if (userEntries.length === 0) return 0;
    
    // O último registro inserido
    return userEntries[userEntries.length - 1].balanceAfter;
  }

  /**
   * Retorna toda a carteira (Grey Coin e Blue Coin)
   */
  static getWallet(userId: string) {
    return {
      greyCoin: this.getBalance(userId, Currency.GREY_COIN),
      blueCoin: this.getBalance(userId, Currency.BLUE_COIN)
    };
  }

  /**
   * Cria uma transação (crédito ou débito). 
   * Se for débito e não houver saldo, lança erro antes de inserir.
   */
  static recordTransaction(
    userId: string, 
    currency: Currency, 
    amount: number, 
    sourceType: string, 
    sourceId?: string
  ): LedgerEntry {
    if (amount === 0) {
      throw new Error("Transação não pode ter valor 0.");
    }

    // Em produção, isso seria executado dentro de uma Transaction SQL (BEGIN; ... COMMIT;)
    // com um bloqueio (FOR UPDATE) ou SERIALIZABLE para prevenir race conditions.
    
    const currentBalance = this.getBalance(userId, currency);
    const balanceAfter = currentBalance + amount;

    // Regra de Ouro: Nenhuma moeda pode ficar negativa
    if (balanceAfter < 0) {
      throw new Error(`Saldo insuficiente de ${currency}.`);
    }

    const entry: LedgerEntry = {
      id: nextId++,
      userId,
      currency,
      amount,
      sourceType,
      sourceId,
      balanceAfter,
      createdAt: Date.now()
    };

    ledgerDB.push(entry);
    
    console.log(`[LEDGER] Transação salva: ${amount > 0 ? '+' : ''}${amount} ${currency} | Motivo: ${sourceType} | Novo saldo: ${balanceAfter}`);

    return entry;
  }
}
