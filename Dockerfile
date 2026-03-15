# ==================================
# BUILD STAGE
# ==================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências (ignorar script postinstall que precisa de DATABASE_URL)
RUN npm ci --ignore-scripts

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# ==================================
# PRODUCTION STAGE
# ==================================
FROM node:20-alpine

WORKDIR /app

# Instalar apenas dependências de runtime
RUN apk add --no-cache dumb-init

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# Instalar apenas dependências de produção
RUN npm ci --only=production --ignore-scripts && \
    npx prisma generate && \
    npm cache clean --force

# Copiar build da stage anterior
COPY --from=builder /app/dist ./dist

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Mudar ownership
RUN chown -R nodejs:nodejs /app

# Usar usuário não-root
USER nodejs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init para melhor signal handling
ENTRYPOINT ["dumb-init", "--"]

# Comando para rodar a aplicação
CMD ["node", "dist/src/main.js"]
