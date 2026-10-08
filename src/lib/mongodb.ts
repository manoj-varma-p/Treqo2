import { MongoClient, Db } from "mongodb";

const dbName =
  (process.env.MONGODB_DB || process.env.MONGO_DB || process.env.MONGODB_DATABASE || "treqo")
    .replace(/^["']|["']$/g, "")
    .trim();

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getCleanUri(): string {
  const raw = process.env.MONGODB_URI || process.env.MONGO_URI || "";
  return raw.replace(/^["']|["']$/g, "").trim();
}

let lastConnectionError = "";

export async function getMongoClient(): Promise<MongoClient | null> {
  const cleanUri = getCleanUri();
  if (!cleanUri) {
    lastConnectionError = "MONGODB_URI (or MONGO_URI) is empty";
    return null;
  }

  try {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(cleanUri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 30000,
        maxPoolSize: 10,
        minPoolSize: 0,
      });

      global._mongoClientPromise = client
        .connect()
        .then((connectedClient) => {
          lastConnectionError = "";
          return connectedClient;
        })
        .catch((err) => {
          const msg = err?.message || String(err);
          lastConnectionError = msg;
          console.error("[MongoDB Connection Failed]:", msg);
          global._mongoClientPromise = undefined;
          return null as unknown as MongoClient;
        });
    }

    const c = await global._mongoClientPromise;
    if (!c) {
      // Allow retry on next request if connection failed
      global._mongoClientPromise = undefined;
      return null;
    }
    return c;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    lastConnectionError = msg;
    console.error("[MongoDB Connection Error]:", msg);
    global._mongoClientPromise = undefined;
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  const clientInstance = await getMongoClient();
  if (!clientInstance) return null;
  try {
    return clientInstance.db(dbName);
  } catch {
    return null;
  }
}

export async function checkMongoConnection(): Promise<{
  connected: boolean;
  uriSet: boolean;
  database?: string;
  error?: string;
}> {
  const cleanUri = getCleanUri();
  if (!cleanUri) {
    return {
      connected: false,
      uriSet: false,
      error: "MONGODB_URI (or MONGO_URI) is not set in environment variables.",
    };
  }

  try {
    const db = await getMongoDb();
    if (!db) {
      return {
        connected: false,
        uriSet: true,
        error: lastConnectionError || "Failed to establish client connection.",
      };
    }
    // Ping database
    await db.command({ ping: 1 });
    return {
      connected: true,
      uriSet: true,
      database: dbName,
    };
  } catch (err: unknown) {
    return {
      connected: false,
      uriSet: true,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
