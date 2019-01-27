FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

RUN npm install -g nodemon

COPY . /usr/src/app

EXPOSE 4000

CMD [ "node", "app.js" ]