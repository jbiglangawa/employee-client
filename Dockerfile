FROM node:22.6.0-bookworm

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "-r", "dotenv/config", "build"]
