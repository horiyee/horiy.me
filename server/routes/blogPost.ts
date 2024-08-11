import { BlogPostController } from "../controllers/blogPost.ts";
import { Router } from "../deps.ts";

const router = new Router();
const blogPostController = BlogPostController();

const v1r = router.prefix("/v1");

v1r.get("/blog_posts", blogPostController.index);

export default router;
