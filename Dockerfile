FROM node:16.14

WORKDIR /app

COPY package*.json ./

EXPOSE 3007

RUN ["npm", "i"] 

COPY . .

CMD ["npm", "run", "start"]