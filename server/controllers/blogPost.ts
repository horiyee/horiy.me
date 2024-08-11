import { Status } from "jsr:@oak/commons@0.11/status";
import { RouterContext } from "../deps.ts";
import { BlogPost } from "../types/blogPost.ts";

export const BlogPostController = () => {
  const index = async (ctx: RouterContext<"/blog_posts">) => {
    const kv = await Deno.openKv();

    const entries = kv.list<Omit<BlogPost, "uuid">>({ prefix: ["blogPosts"] });

    const body: {
      blogPosts: {
        id: string;
        title: string;
        body: string;
        createdAt: string;
        updatedAt: string;
      }[];
    } = { blogPosts: [] };

    for await (const entry of entries) {
      try {
        const { key, value } = entry;

        const blogPost = {
          id: key[1].toString(),
          ...value,
          createdAt: value.createdAt.toISOString(),
          updatedAt: value.updatedAt.toISOString(),
        };

        body.blogPosts = [...body.blogPosts, blogPost];
      } catch (err) {
        console.error(err);
      }
    }

    ctx.response.status = Status.OK;
    ctx.response.type = "json";

    ctx.response.body = body;
  };

  return { index };
};
