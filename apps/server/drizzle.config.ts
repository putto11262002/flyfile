import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "flyfile"
  }
});