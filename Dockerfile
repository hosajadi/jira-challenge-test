FROM node:18.16.0-alpine AS builder

ARG PORT
#ARG DB_URL

# Create app directory and cd to it
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install
# Required if not done in postinstall
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
RUN ls -a

EXPOSE ${PORT}

CMD [ "sh", "init.sh"]

