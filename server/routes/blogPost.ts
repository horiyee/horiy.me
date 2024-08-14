import {
  BlogPostAdminController,
  BlogPostController,
} from "../controllers/blogPost.ts";
import { Router } from "../deps.ts";
import { BlogPostRepository } from "../repositories/blogPost.ts";
import { BlogPostService } from "../services/blogPost.ts";

export const BlogPostRoutes = (router: Router, kv: Deno.Kv) => {
  const blogPostRepository = BlogPostRepository(kv);
  const blogPostService = BlogPostService(blogPostRepository);
  const blogPostController = BlogPostController(blogPostService);

  const v1r = router.prefix("/v1");

  v1r.get("/blog_posts", blogPostController.index);

  return v1r;
};

export const blogPostAdminRoutes = (router: Router, kv: Deno.Kv) => {
  const blogPostRepository = BlogPostRepository(kv);
  const blogPostService = BlogPostService(blogPostRepository);
  const blogPostAdminController = BlogPostAdminController(blogPostService);

  router.post("/blog_posts", blogPostAdminController.create);
  router.put("/blog_posts/:id", blogPostAdminController.update);

  return router;
};
