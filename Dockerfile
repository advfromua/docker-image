FROM node:24

ENV MONGODB_CONNECTION_PROTOCOL mongodb+srv
ENV MONGODB_DB_NAME admin
ENV MONGODB_CLUSTER_ADDRESS cluster0.62f7gwd.mongodb.net
ENV MONGODB_USERNAME advfromua_db_user
ENV MONGODB_PASSWORD zZzv4No9CU7SyMdL

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]