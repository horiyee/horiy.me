import { Hono } from "./deps.ts";

const app = new Hono();

app.get("/api", (c) => c.json({ message: "Hello!" }));

export default app;
