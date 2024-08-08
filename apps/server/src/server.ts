import { Hono } from "hono";
import api from "./api";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(",") || "*",
  }),
);
app.route("", api);

export default {
  fetch: app.fetch,
  app,
  port: process.env.PORT || 3002,
};
