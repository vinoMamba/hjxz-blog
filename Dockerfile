FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN node -v 
RUN npm -v
RUN npm install -g pnpm

RUN pnpm i

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start" ]
