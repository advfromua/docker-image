import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `${connectionProtocol}://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

console.log('Trying to connect to db');

const dbName = 'company';
const collectionName = 'users';
const mockUsers = [
        { name: "Alice", email: "alice@test.com", dept: "Engineering" },
        { name: "Bob", email: "bob@test.com", dept: "Marketing" },
        { name: "Charlie", email: "charlie@test.com", dept: "Sales" },
        { name: "Diana", email: "diana@test.com", dept: "Engineering" },
        { name: "Ethan", email: "ethan@test.com", dept: "HR" },
        { name: "Fiona", email: "fiona@test.com", dept: "IT" },
        { name: "George", email: "george@test.com", dept: "Sales" },
        { name: "Hannah", email: "hannah@test.com", dept: "Engineering" },
        { name: "Ian", email: "ian@test.com", dept: "Marketing" },
        { name: "Jenna", email: "jenna@test.com", dept: "Design" }
];


try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  await client.db(dbName).collection(collectionName).insertMany(mockUsers);
  console.log('Insert was successful');
  const users = await client.db(dbName).collection(collectionName).find({}).limit(10).toArray();
  console.log('Connected successfully to server');
  console.log(users);
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
  process.exit(1);
}

const database = client.db(dbName);

export default database;
