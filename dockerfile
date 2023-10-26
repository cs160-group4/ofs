FROM mysql
COPY custom.cnf /etc/mysql/conf.d/custom.cnf

FROM node:18

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
