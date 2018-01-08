FROM node:9.3.0

RUN mkdir /src
WORKDIR /src

COPY ./config /src/config
COPY ./package.json /src/package.json

COPY ./app /src/app
COPY ./routes /src/routes

COPY ./server.js /src/server.js

RUN npm install

EXPOSE 8080

CMD node server.js
