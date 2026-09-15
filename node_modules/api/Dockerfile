FROM node:20-alpine AS builder

WORKDIR /app
# Instala pnpm (ou usa npm, como mudamos para npm workspaces)
RUN npm i -g npm@latest

# Copia configurações de workspace
COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

# Instala todas as dependências
RUN npm install

# Copia o código fonte
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

# Build do pacote shared e da api
WORKDIR /app/apps/api
RUN npm run build

# --- Estágio de Produção ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copia dependências de produção e o build final
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

WORKDIR /app/apps/api

EXPOSE 3000
CMD ["node", "dist/server.js"]
