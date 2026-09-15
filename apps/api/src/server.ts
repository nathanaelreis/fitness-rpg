import Fastify from "fastify";
import { arenaRoutes } from "./routes/arena";
import { stepsRoutes } from "./routes/steps";
import { inventoryRoutes } from "./routes/inventory";
import { walletRoutes } from "./routes/wallet";
import { ArenaService } from "./services/ArenaService";

const server = Fastify({ logger: true });

server.register(arenaRoutes);
server.register(stepsRoutes);
server.register(inventoryRoutes);
server.register(walletRoutes);

// Simulando o cronjob de matchmaking
setInterval(() => {
  ArenaService.matchmake();
}, 10000);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("Servidor API rodando em http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
