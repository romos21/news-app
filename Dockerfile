# ================================================================

FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# ================================================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app .
ENV NODE_ENV=${NODE_ENV}
RUN npm run build

# ================================================================

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=${NODE_ENV}

COPY --from=builder app/package*.json ./
COPY --from=builder /app/.dist ./.dist
COPY --from=builder /app/public ./public

# use --omit=dev to ignore devDependencies installing
# use --ignore-scripts to ignore prepare script running
#  - in my case prepare script runs husky witch is not needed for production
RUN npm ci --omit=dev --ignore-scripts

EXPOSE ${PORT}

CMD ["npm", "run", "start"]

# ================================================================
