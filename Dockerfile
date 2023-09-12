FROM node:16.15.0-alpine3.15

WORKDIR /app

COPY . /app/

RUN npm ci

EXPOSE 80

CMD [ "npm", "start" ]