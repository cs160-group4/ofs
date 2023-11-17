#   Author: Aaron Low
#   Email: aaron.c.low@sjsu.edu
#   Copyright (c) 2023 Aaron Low. All rights reserved.

FROM node:18

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 8888

# RUN npm run build

CMD ["npm", "run", "dev"]
