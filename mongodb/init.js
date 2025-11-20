const dbName = process.env.MONGODB_DB || "base";
const appUser = process.env.MONGODB_USER || "user";
const appPass = process.env.MONGODB_PASSWORD || "password";

// Switch to target DB
db = db.getSiblingDB(dbName);

// Create application user
db.createUser({
  user: appUser,
  pwd: appPass,
  roles: [{ role: "readWrite", db: dbName }],
});

// Create an initial collection & document so the DB appears
/*
db.getCollection("init_collection").insertOne({
  createdAt: new Date(),
  ok: true,
});
*/
