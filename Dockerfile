FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i

COPY . .

EXPOSE 3100

CMD [ "pnpm", "start" ]
