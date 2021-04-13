FROM node:12.16.2-alpine

WORKDIR /usr/src/app/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN cp ormconfig.dev.json ormconfig.json

RUN yarn build

CMD ["yarn", "start:prod"]
