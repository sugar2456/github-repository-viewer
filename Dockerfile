FROM node:23-slim

WORKDIR /app

RUN adduser --disabled-password --gecos "" user
COPY package.json package-lock.json ./
RUN chown -R user:user /app

USER user

RUN npm install

COPY . .