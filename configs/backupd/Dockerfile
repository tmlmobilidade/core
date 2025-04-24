###########################
# Define the base image
###########################
FROM node:20.16-alpine AS base

ENV PROJECT=backupd

RUN npm install -g turbo@^2
RUN npm install -g pnpm@9.12.3

# Install Mongo Tools
RUN apk update && apk add mongodb-tools

# Install PG Tools
RUN apk update && apk add postgresql-client

###########################
# Builder stage
###########################
FROM base AS pruner

WORKDIR /app

COPY . .

RUN turbo prune --scope=@tmlmobilidade/${PROJECT} --docker

###########################
# Installer stage
###########################
FROM base AS builder

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile


# Build the project
COPY --from=pruner /app/out/full/ .
RUN turbo build --filter=@tmlmobilidade/${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# ###########################
# # Runner stage
# ###########################
FROM base AS runner

WORKDIR /app

COPY --from=builder /app .

CMD node $PROJECT/dist/index.js
