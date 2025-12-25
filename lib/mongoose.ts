
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cache = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });

export async function connectDB() {
  if (cache.conn) {
    console.log("📌 Using cached mongoose connection");
    return cache.conn;
  }
  if (!cache.promise) {
    console.log("📌 Creating new mongoose connection...");
    cache.promise = mongoose.connect(MONGODB_URI, { dbName: "haldira_db" }).then((m) => {
      console.log("✅ Mongoose connected");
      return m;
    }).catch((err) => {
      console.error("❌ Mongoose connection error", err);
      throw err;
    });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
