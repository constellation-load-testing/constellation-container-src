FROM node:alpine

LABEL maintainer="Andrew Thresher <thresher533@gmail.com>"

# install K6
WORKDIR /tmp
ADD https://github.com/grafana/k6/releases/download/v0.37.0/k6-v0.37.0-linux-amd64.tar.gz /tmp/k6-v0.37.0-linux-amd64.tar.gz
RUN tar -xzf k6-v0.37.0-linux-amd64.tar.gz
RUN mv k6-v0.37.0-linux-amd64/k6 /usr/bin/k6

COPY . /loader_prototype
WORKDIR /loader_prototype

RUN npm install

CMD [ "node", "src/index.js" ]
