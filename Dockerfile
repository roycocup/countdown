FROM node:alpine3.10

RUN mkdir /opt/project
WORKDIR /opt/project
COPY . .
CMD ["node", "server.py"]

