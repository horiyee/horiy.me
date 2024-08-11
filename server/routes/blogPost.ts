import { BlogPostController } from "../controllers/blogPost.ts";
import { Router } from "../deps.ts";
import { BlogPostRepository } from "../repositories/blogPost.ts";
import { BlogPostService } from "../services/blogPost.ts";

const router = new Router();

const kv = await Deno.openKv();
const blogPostRepository = BlogPostRepository(kv);
const blogPostService = BlogPostService(blogPostRepository);

const blogPostController = BlogPostController(blogPostService);

const v1r = router.prefix("/v1");

v1r.get("/blog_posts", blogPostController.index);

export default router;
