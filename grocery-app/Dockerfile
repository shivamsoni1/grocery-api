FROM node:18.16.1-bullseye-slim

WORKDIR /grocery-app
COPY package.json .
RUN npm install
COPY . .
CMD npm run start