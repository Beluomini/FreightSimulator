FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001
CMD [  "npm", "run", "start:migrate:prod" ]