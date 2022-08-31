FROM node:16-alpine

ENV TOKEN_SECRET=super_secret
ENV PUPPETEER_SKIP_DOWNLOAD=true
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]