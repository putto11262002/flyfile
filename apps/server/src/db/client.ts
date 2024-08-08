import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const postgresClient = postgres({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "flyfile"
})

const db = drizzle(postgresClient)

export default db;

