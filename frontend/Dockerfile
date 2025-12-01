FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# We use npm start for development mode
CMD ["npm", "start"]