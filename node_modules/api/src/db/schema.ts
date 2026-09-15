import { pgTable, uuid, integer, jsonb, timestamp, pgEnum, bigserial, bigint, varchar } from "drizzle-orm/pg-core";

export const combats = pgTable("combats", {
  id: uuid("id").primaryKey().defaultRandom(),
  attackerId: uuid("attacker_id").notNull(),
  defenderId: uuid("defender_id").notNull(),
  winnerId: uuid("winner_id"),
  attackerEloBefore: integer("attacker_elo_before").notNull(),
  defenderEloBefore: integer("defender_elo_before").notNull(),
  attackerEloAfter: integer("attacker_elo_after"),
  defenderEloAfter: integer("defender_elo_after"),
  combatLog: jsonb("combat_log").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const arenaQueue = pgTable("arena_queue", {
  userId: uuid("user_id").primaryKey(),
  elo: integer("elo").notNull(),
  queuedAt: timestamp("queued_at").defaultNow().notNull(),
});

export const currencyEnum = pgEnum("currency", ["grey_coin", "blue_coin"]);

export const walletLedger = pgTable("wallet_ledger", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: uuid("user_id").notNull(),
  currency: currencyEnum("currency").notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(),
  sourceType: varchar("source_type").notNull(),
  sourceId: uuid("source_id"), // Referência para batalha, id da compra, etc
  balanceAfter: bigint("balance_after", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
