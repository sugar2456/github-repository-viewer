FROM node:23-slim

WORKDIR /app

RUN adduser --disabled-password --gecos "" user
RUN chown -R user:user /app
USER user

COPY --chown=user:user package.json package-lock.json ./
RUN npm install

COPY --chown=user:user . .