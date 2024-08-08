import {Hono} from 'hono'
const api = new Hono().basePath("/api")
.get("/health", (c) => c.json({status: "ok"}))

export default api