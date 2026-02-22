import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // We throw this error only if we decide to enforce DB connection, 
  // currently we're keeping it unattached. 
  // throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  console.warn("MONGODB_URI is not set. Database integration is currently running in detached/mock mode.");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents a surge of database connections.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
      console.warn("Cannot connect: Missing MONGODB_URI.");
      return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB successfully!");
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
