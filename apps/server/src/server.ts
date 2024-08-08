import { Hono } from 'hono'
import api from './api'
import { cors } from 'hono/cors'


const app = new Hono()
app.use(cors({origin: process.env.CORS_ORIGIN?.split(",") ||  "*"}))
app.route("", api)

export default app