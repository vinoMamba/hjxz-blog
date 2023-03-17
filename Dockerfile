FROM node:18 as development

WORKDIR /usr/src/app

COPY package.json ./
COPY prisma ./prisma/

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install prisma -g 
RUN npm install pnpm -g
RUN pnpm i
RUN npx prisma generate
COPY . .
RUN pnpm build 

FROM node:18 as production

WORKDIR /usr/src/app
COPY package.json ./
COPY prisma ./prisma/

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install prisma -g 
RUN npm install pnpm -g
RUN npx prisma generate
RUN pnpm i

COPY --from=development /usr/src/app/.next ./.next
CMD ["pnpm", "start"]
