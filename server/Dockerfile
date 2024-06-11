FROM alpine:latest

RUN apk add --no-cache nodejs npm curl 

WORKDIR /app

COPY . /app/

RUN npm install

ENTRYPOINT node app.js