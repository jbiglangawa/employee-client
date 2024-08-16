FROM node:21-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 5173
ENV NODE_ENV=production
CMD ["npm", "start"]