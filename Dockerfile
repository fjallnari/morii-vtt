FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD yarn run-prod