import { Application } from "./deps.ts";
import blogPost from "./routes/blogPost.ts";

const app = new Application();

app.use(blogPost.routes());

await app.listen({ port: 8080 });
