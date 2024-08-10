import { Hono } from "./deps.ts";
import { Note } from "./types.ts";

const app = new Hono();

app.get("/notes/:uuid", async (c) => {
  const { uuid } = c.req.param();

  const kv = await Deno.openKv();

  await kv
    .get<Omit<Note, "uuid">>(["notes", uuid])
    .then((note) => {
      c.json({ note });
    })
    .catch(console.error);
});

app.get("/notes", async (c) => {
  const kv = await Deno.openKv();

  const entries = kv.list<Omit<Note, "uuid">>({ prefix: ["notes"] });

  const res: {
    notes: {
      uuid: string;
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    }[];
  } = { notes: [] };

  for await (const result of entries) {
    try {
      const { key, value } = result;

      const note = {
        uuid: key[1].toString(),
        ...value,
        createdAt: value.createdAt.toLocaleString(),
        updatedAt: value.updatedAt.toLocaleString(),
      };

      res.notes = [...res.notes, note];
    } catch (err) {
      console.error(err);
    }
  }

  c.json(res);
});

export default app;
