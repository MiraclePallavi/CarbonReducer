// dbConfig.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

// Create a global interface so that TypeScript knows about it
declare global {
  // This is intentionally declared once in the entire app
  var mongooseCached: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongooseCached) {
  global.mongooseCached = { conn: null, promise: null };
}

export async function connect() {
  if (global.mongooseCached.conn) {
    // reuse existing connection
    return global.mongooseCached.conn;
  }
  if (!global.mongooseCached.promise) {
    global.mongooseCached.promise = mongoose
      .connect(MONGO_URI)
      .then((m) => (global.mongooseCached.conn = m));
  }
  await global.mongooseCached.promise;
  return global.mongooseCached.conn;
}
