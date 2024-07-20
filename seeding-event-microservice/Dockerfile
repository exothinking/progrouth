FROM node:22-alpine

WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start:prod"]