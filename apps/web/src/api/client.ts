import { hc } from "hono/client";
import { Api } from "@flyfile/server";

const client = hc<Api>(
  import.meta.env.API_BASE_URL || "http://localhost:3002",
  {},
);

export default client;
