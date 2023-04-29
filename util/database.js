import { MongoClient } from "mongodb";

const url = `${process.env.NEXT_PUBLIC_MONGODB_URI}`;
const options = { useNewUrlParser: true };
let connectDB;

if (!url) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
