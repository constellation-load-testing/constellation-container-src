FROM node:alpine

LABEL maintainer="Andrew Thresher <thresher533@gmail.com>"

COPY . /constellation-load-generator
WORKDIR /constellation-load-generator

RUN npm install

CMD [ "npm", "start" ]
