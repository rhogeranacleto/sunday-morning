FROM node:12.16.2-alpine

WORKDIR /usr/src/app/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]
