import { Application, Router } from "./deps.ts";
import { authMiddleware } from "./middlewares/auth.ts";
import { blogPostAdminRoutes, BlogPostRoutes } from "./routes/blogPost.ts";

const app = new Application();

const router = new Router();
const adminRouter = router.prefix("/admin").use(authMiddleware);

const kv = await Deno.openKv();

const blogPost = BlogPostRoutes(router, kv);
const blogPostAdmin = blogPostAdminRoutes(adminRouter, kv);

app.use(blogPost.routes());
app.use(blogPostAdmin.routes());

await app.listen({ port: 8080 });
