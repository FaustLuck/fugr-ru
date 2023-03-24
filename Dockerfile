FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 8081

CMD ["yarn", "run", "dev"]