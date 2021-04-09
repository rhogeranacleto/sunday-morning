FROM node:12.16.2-alpine

WORKDIR /usr/src/app/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
