import { Db, MongoClient } from "mongodb";

const DEFAULT_DB_NAME = "bazardor";

interface GlobalMongoCache {
  client: MongoClient | null;
  clientPromise: Promise<MongoClient> | null;
}

const globalForMongo = globalThis as typeof globalThis & {
  __bazardorMongoCache?: GlobalMongoCache;
};

const mongoCache: GlobalMongoCache = globalForMongo.__bazardorMongoCache ?? {
  client: null,
  clientPromise: null,
};

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__bazardorMongoCache = mongoCache;
}

function getValidatedMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error(
      "Missing required environment variable: MONGODB_URI. Please configure your MongoDB connection string in .env.local."
    );
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      "Invalid MONGODB_URI format. Expected connection string to start with 'mongodb://' or 'mongodb+srv://'."
    );
  }

  return uri;
}

export function getMongoDatabaseName(): string {
  const configuredName = process.env.MONGODB_DB_NAME?.trim();
  return configuredName && configuredName.length > 0
    ? configuredName
    : DEFAULT_DB_NAME;
}

export function isMongoReplicaSetConfigured(): boolean {
  const uri = process.env.MONGODB_URI?.trim() ?? "";
  return uri.startsWith("mongodb+srv://") || uri.includes("replicaSet=");
}

export function getMongoClient(): MongoClient {
  if (mongoCache.client) {
    return mongoCache.client;
  }

  const uri = getValidatedMongoUri();
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
  });

  mongoCache.client = client;
  return client;
}

export async function connectMongoClient(): Promise<MongoClient> {
  if (mongoCache.clientPromise) {
    return mongoCache.clientPromise;
  }

  const client = getMongoClient();
  mongoCache.clientPromise = client.connect().catch((error: unknown) => {
    mongoCache.clientPromise = null;
    mongoCache.client = null;
    const reason =
      error instanceof Error ? error.message : "Unknown database error";
    throw new Error(`Unable to connect to MongoDB database: ${reason}`);
  });

  return mongoCache.clientPromise;
}

export function getMongoDatabase(): Db {
  const client = getMongoClient();
  return client.db(getMongoDatabaseName());
}

export async function verifyMongoConnection(): Promise<{
  ok: boolean;
  dbName: string;
}> {
  const client = await connectMongoClient();
  const dbName = getMongoDatabaseName();
  await client.db(dbName).command({ ping: 1 });
  return { ok: true, dbName };
}

export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    const database = getMongoDatabase();
    const value = Reflect.get(database, prop, database);
    return typeof value === "function" ? value.bind(database) : value;
  },
});

export const mongoClientProxy: MongoClient = new Proxy({} as MongoClient, {
  get(_target, prop) {
    const client = getMongoClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

