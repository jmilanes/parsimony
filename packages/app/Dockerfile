FROM node:18

# Working dir
WORKDIR /usr/app

RUN npm install -g typescript

RUN apt-get update

RUN apt-get install -y yarn

RUN echo "//registry.npmjs.org/:_authToken=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" > ~/.npmrc

COPY package*.json ./

RUN yarn

# Copy SRC
COPY . .

# RUN yarn build

# Open Port
EXPOSE 1234

# Docker Command to Start Service
CMD [ "yarn", "start"]





