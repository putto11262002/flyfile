import {hc} from "hono/client"
import {Api} from "@flyfile/server"

// TODO: use environment variable
const client = hc<Api>("http://localhost:3000")

export default client

