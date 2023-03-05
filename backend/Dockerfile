FROM node:19.6.1

WORKDIR /usr/src/app/

COPY package.json /usr/src/app

RUN apk add --nocache udev ttf-freefont chromium git

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ENV CHROMIUM_PATH /usr/bin/chromium-browser

COPY src/ /usr/src/app/

CMD ["node", "server.js"]