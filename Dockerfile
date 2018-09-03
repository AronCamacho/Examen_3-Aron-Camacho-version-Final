FROM ubuntu:18.04
FROM node:8.11.2
RUN apt-get update
COPY package.json/app.
Run npm install
COPY . /src
CMD node app.js
EXPOSE 8080

