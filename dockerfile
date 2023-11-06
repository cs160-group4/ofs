FROM node:18

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 8888

RUN npm run build

CMD ["npm", "run", "start"]
