import { BlogPostRepository } from "../repositories/blogPost.ts";
import { BlogPost } from "../types/blogPost.ts";
import { NotFoundError } from "../types/index.ts";

export type BlogPostService = {
  fetchAll: () => Promise<BlogPost[]>;
  create: (blogPost: Omit<BlogPost, "id">) => Promise<string>;
  update: (blogPost: BlogPost) => Promise<void>;
};

export const BlogPostService = (blogPostRepository: BlogPostRepository) => {
  const fetchAll = async () => {
    const blogPosts = await blogPostRepository.fetchAll();

    return blogPosts;
  };

  const create = async (blogPost: Omit<BlogPost, "id">) => {
    const id = crypto.randomUUID();

    return await blogPostRepository.put({ ...blogPost, id }).then(() => id);
  };

  const update = async (blogPost: BlogPost) => {
    const current = await blogPostRepository.fetch(blogPost.id);

    if (current === null) {
      throw new NotFoundError(`Blog post not found. id = ${blogPost.id}`);
    }

    await blogPostRepository.put(blogPost);
  };

  return { fetchAll, create, update };
};
