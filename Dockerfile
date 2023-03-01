FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn run-prod