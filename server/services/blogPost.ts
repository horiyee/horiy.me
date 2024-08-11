import { BlogPostRepository } from "../repositories/blogPost.ts";
import { BlogPost } from "../types/blogPost.ts";

export type BlogPostService = {
  fetchAll: () => Promise<BlogPost[]>;
  create: (blogPost: Omit<BlogPost, "id">) => Promise<string>;
};

export const BlogPostService = (kv: Deno.Kv) => {
  const blogPostRepository = BlogPostRepository(kv);

  const fetchAll = async () => {
    const blogPosts = await blogPostRepository.fetchAll();

    return blogPosts;
  };

  const create = async (blogPost: Omit<BlogPost, "id">) => {
    const id = crypto.randomUUID();

    return await blogPostRepository.create({ ...blogPost, id }).then(() => id);
  };

  return { fetchAll, create };
};
