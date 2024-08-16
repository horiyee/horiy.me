import { Hono } from "npm:hono@4.5.5";

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
