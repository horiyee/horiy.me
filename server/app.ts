import { Hono } from "./deps.ts";

const app = new Hono();

app.get("/legacy/bookmarks", async (c) => {
  const kv = await Deno.openKv();

  await kv
    .get(["legacy", "bookmarks"])
    .then((result) => c.json({ bookmarks: result.value }))
    .catch(console.error);
});

app.post("/legacy/bookmarks", async (c) => {
  const json: {
    bookmarks: {
      url: string;
      createdAt: string;
      updatedAt: string;
    }[];
  } = await c.req.json();

  const { bookmarks } = json;

  const kv = await Deno.openKv();

  await kv.set(["legacy", "bookmarks"], bookmarks).then(() => {
    c.status(201);
    c.json({ bookmarks });
  });
});

export default app;
