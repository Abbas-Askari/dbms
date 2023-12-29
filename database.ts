import pg from "pg";

const DBClientSingleton = () => {
  return new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "dbms",
    password: "123",
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
    port: 5432,
  });
};

declare global {
  var DB: undefined | ReturnType<typeof DBClientSingleton>;
}

const DB = globalThis.DB ?? DBClientSingleton();

export default DB;

if (process.env.NODE_ENV !== "production") globalThis.DB = DB;
