FROM node:12.16.2-alpine

WORKDIR /usr/src/app/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn --production

COPY . .

RUN cp sample.env .env

CMD ["yarn", "start"]
