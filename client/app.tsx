import { Hono } from "./deps.ts";

const app = new Hono();

app.get("/", (c) =>
  c.html(
    <html>
      <body>
        <h1>horiy.me</h1>
      </body>
    </html>,
  ),
);

export default app;
