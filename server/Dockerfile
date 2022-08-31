FROM node:16-alpine

ENV TOKEN_SECRET=super_secret
RUN apk add -U --no-cache --allow-untrusted udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser
WORKDIR /usr/src/app



COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD yarn migrate:up && yarn start