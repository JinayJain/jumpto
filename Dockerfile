FROM node:12

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080
CMD ["yarn", "start"]