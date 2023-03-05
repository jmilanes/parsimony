FROM --platform=linux/amd64  node:18

ARG NODE_ENV
ARG ACCESS_TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET
ARG MONGO_PW

ENV NODE_ENV=$NODE_ENV
ENV ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET
ENV MONGO_PW=$MONGO_PW

RUN echo "'ENV NODE_ENV=$NODE_ENV\n\
ENV ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET\n\
ENV REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET\n\
ENV MONGO_PW=$MONGO_PW'" > ./.env

# Working dir
WORKDIR /usr/app

RUN npm install -g typescript nodemon

RUN apt-get update

RUN apt-get install -y yarn

RUN echo "//registry.npmjs.org/:_authToken=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" > ~/.npmrc

COPY package*.json ./

RUN yarn

# Copy SRC
COPY . .

# COPY .env.production ./.env

RUN yarn build

# Open Port TODO: Breakbroadcast into its own service 
EXPOSE 4000

# Docker Command to Start Service
CMD [ "yarn", "start:prd"]





