FROM node:18-alpine
WORKDIR /src
COPY . .
RUN npm install --production
CMD ["npm", "run", "start"]
EXPOSE 4000