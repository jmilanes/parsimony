FROM --platform=linux/amd64  node:18

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

COPY .env.production ./.env

RUN yarn build

# Open Port TODO: Breakbroadcast into its own service 
EXPOSE 4000 8080

# Docker Command to Start Service
CMD [ "yarn", "start:prd"]





