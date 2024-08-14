import { BlogPost } from "../types/blogPost.ts";

export type BlogPostRepository = {
  fetch: (id: string) => Promise<BlogPost | null>;
  fetchAll: () => Promise<BlogPost[]>;
  put: (blogPost: BlogPost) => Promise<void>;
};

export const BlogPostRepository = (kv: Deno.Kv) => {
  const fetch = async (id: string) => {
    const blogPost = await kv.get<Omit<BlogPost, "id">>(["blogPosts", id]);

    if (blogPost.versionstamp !== null) {
      return {
        id,
        ...blogPost.value,
      };
    } else {
      return null;
    }
  };

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
        console.error(`Failed to fetch blog post: ${err}`);
      }
    }

    return results.blogPosts;
  };

  const put = async (blogPost: BlogPost) => {
    const { id, ...rest } = blogPost;

    await kv
      .set(["blogPosts", id], rest)
      .then(() => {
        console.log(`Blog post updated. id = ${id}`);
      })
      .catch((err) => {
        console.error(`Failed to update blog post: ${err}`);
      });
  };

  return { fetch, fetchAll, put };
};
