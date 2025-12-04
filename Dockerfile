# Etapa 1: building
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}

RUN npm ci

COPY . .

RUN npm run build

# Etapa 2: exec
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts 
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
