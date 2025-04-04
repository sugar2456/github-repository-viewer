FROM node:23-slim

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm install

COPY --chown=node:node . .