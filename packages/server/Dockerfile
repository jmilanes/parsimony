FROM --platform=linux/amd64  node:18

ARG ACCESS_TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET
ARG MONGO_PW

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

RUN echo "NODE_ENV=production\n\
ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET\n\
REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET\n\
EMAIL_SERVICE_PASSWORD=$EMAIL_SERVICE_PASSWORD\n\
MONGO_PW=$MONGO_PW" > ./.env

# Open Port TODO: Breakbroadcast into its own service
# Folding parsimony web and API service into one
EXPOSE 4000

# Docker Command to Start Service
CMD [ "yarn", "start:prd"]





