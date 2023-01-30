FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

# Expose port 8080 for the svelte dev and 35729 for rollup's live reload
EXPOSE 35729
EXPOSE 8080

CMD yarn dev