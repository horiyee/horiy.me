import { Application } from "./deps.ts";
import healthCheck from "./routes/healthCheck.ts";
import blogPost from "./routes/blogPost.ts";

const app = new Application();

app.use(healthCheck.routes());

app.use(blogPost.routes());

await app.listen({ port: 8080 });
