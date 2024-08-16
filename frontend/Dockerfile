# Usar a imagem base do Node.js
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Declare um argumento de build
ARG NEXT_PUBLIC_API_URL

# Use o argumento para definir a variável de ambiente
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
