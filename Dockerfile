FROM node:23-slim

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm install

USER root
RUN npx playwright install-deps

USER node
RUN npx playwright install

COPY --chown=node:node . .