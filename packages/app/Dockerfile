FROM --platform=linux/amd64  node:18 as react_build 

# Working dir
WORKDIR /usr/app

RUN npm install -g typescript

RUN apt-get update

# RUN apt-get install -y yarn

RUN echo "//registry.npmjs.org/:_authToken=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" > ~/.npmrc

COPY package*.json ./

RUN npm install

# Copy SRC
COPY . .

RUN npm run build

# prepare nginx
FROM --platform=linux/amd64  nginx:latest

COPY --from=react_build /usr/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf.d /etc/nginx/conf.d

# Open Port
EXPOSE 80

# Docker Command to Start Service
CMD ["nginx","-g","daemon off;"]





