FROM node:16.15-alpine

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json

EXPOSE 3000

RUN npm install