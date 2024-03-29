FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit-dev

COPY . .
RUN npm install

CMD ["npm", "start"]

EXPOSE 3001
