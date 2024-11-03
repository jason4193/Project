FROM node:14

RUN apt-get update && apt-get install -y netcat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x wait-for-it.sh

EXPOSE 3001

CMD ["/wait-for-it.sh", "db", "3306", "--", "node", "server.js"]