# Etapa 1: building
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# devdependecies
RUN npm prune --production 

# Etapa 2: exec
FROM node:20

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts 
COPY --from=builder /app/public ./public

RUN npm install --only=production

EXPOSE 3030

CMD [ "npm", "start" ]