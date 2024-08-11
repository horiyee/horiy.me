import { Status } from "../deps.ts";
import { RouterContext } from "../deps.ts";
import { BlogPostService } from "../services/blogPost.ts";

export const BlogPostController = (blogPostService: BlogPostService) => {
  const index = async (ctx: RouterContext<"/blog_posts">) => {
    const blogPosts = await blogPostService.fetchAll();

    ctx.response.status = Status.OK;
    ctx.response.type = "json";

    ctx.response.body = {
      blogPosts: blogPosts.map((blogPost) => ({
        ...blogPost,
        createdAt: blogPost.createdAt.toISOString(),
        updatedAt: blogPost.updatedAt.toISOString(),
      })),
    };
  };

  const create = async (ctx: RouterContext<"/blog_posts">) => {
    const json: {
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    } = await ctx.request.body.json().catch((err) => {
      console.error(err);

      ctx.response.status = Status.BadRequest;
      ctx.response.type = "json";

      ctx.response.body = { error: "Invalid request body" };
    });

    const { title, body } = json;
    const createdAt = new Date(json.createdAt);
    const updatedAt = new Date(json.updatedAt);

    const id = await blogPostService.create({
      title,
      body,
      createdAt,
      updatedAt,
    });

    ctx.response.status = Status.Created;
    ctx.response.type = "json";

    ctx.response.body = { id };
  };

  return { index, create };
};
