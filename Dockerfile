FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4000

CMD yarn run-prod