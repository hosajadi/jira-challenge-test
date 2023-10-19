FROM node:18.16.0-alpine AS builder

ARG PORT
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN yarn install
RUN npx prisma generate

COPY src ./src/
COPY .env .
COPY .eslintrc.js .
COPY init.sh .
COPY nest-cli.json .
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY tsconfig.eslint.json .

RUN yarn build

EXPOSE ${PORT}

CMD [ "sh", "init.sh"]

