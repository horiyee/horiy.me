import { BlogPost } from "../types/blogPost.ts";

export const BlogPostRepository = (kv: Deno.Kv) => {
  const fetchAll = async () => {
    const entries = kv.list<Omit<BlogPost, "id">>({ prefix: ["blogPosts"] });

    const results: { blogPosts: BlogPost[] } = { blogPosts: [] };

    for await (const entry of entries) {
      try {
        const { key, value } = entry;

        const blogPost = {
          id: key[1].toString(),
          ...value,
        };

        results.blogPosts = [...results.blogPosts, blogPost];
      } catch (err) {
        console.error(`Failed to fetch blog posts: ${err}`);
      }
    }

    return results.blogPosts;
  };

  const create = async (blogPost: BlogPost) => {
    const { id, ...rest } = blogPost;

    await kv
      .set(["blogPosts", id], rest)
      .then(() => {
        console.log(`Blog post created. id = ${id}`);
      })
      .catch((err) => {
        console.error(`Failed to create blog post: ${err}`);
      });
  };

  return { fetchAll, create };
};
